Macro.add(["radarchart"], {
    tags: ["addstat", "newgroup", "addcollection", "setlabels"],
    handler: function () {
        if (this.args.length === 0)
            return this.error("Not enough Arguments.");

        /* Setting up functions */
        const InterpretAttributes = function (args) {
            let _attributes = [];
            const arg = typeof args === "string" ? State.getVar(args) : args;
            if (arg == null)
                return null;
            if (Array.isArray(arg)) {
                for (let i = 0; i < arg.length; i++) {
                    // [name1, val1, name2, val2]
                    if (Array.isArray(arg[i]))
                        _attributes.push({ Name: arg[i][0], Value: arg[i][1] });
                    else if (typeof arg[i] === "object") {
                        if (Object.keys(arg[i]).length > 1) {
                            // [{prop1: val1, prop2: val2}, {prop1: val1, prop2: val2}]
                            var entry = {};
                            for (const [key, val] of Object.entries(arg[i])) {
                                if ($.isNumeric(val))
                                    entry.Value = val;
                                else
                                    entry.Name = val;
                                if (Object.keys(entry).length > 1) {
                                    _attributes.push(entry);
                                    entry = {};
                                }
                            };
                        } else {
                            // [{prop1: val1}, {prop2: val2}]
                            for (const [key, val] of Object.entries(arg[i])) {
                                _attributes.push({ Name: key, Value: val });
                            }
                        }
                    }
                    else // [[val1, val2], [val1, val2]]
                        _attributes.push({ Name: arg[i], Value: arg[++i] });
                }
            }
            else {
                _attributes = Object.keys(arg).map(function (key) {
                    return { Name: key, Value: arg[key] }
                });
            }
            return _attributes;
        }
        const GetCircleCor = function (angle, r) {
            let radius = angle / 180 * Math.PI;
            let x = (Math.cos(radius) * r) + r;
            let y = (Math.sin(radius) * r) + r;
            return { X: x, Y: y };
        };
        const Normalize = function (val, min, max) {
            val = Math.clamp(val, min, max);
            let result = (val - min) / (max - min);
            return result;
        };
        const FindKeywordValue = function (array, keyword, defaultValue) {
            let _index = array.findIndex(e => typeof e === "string" && e.toLowerCase().startsWith(keyword));
            return _index > -1 ? array[_index].substring(keyword.length + 1) : defaultValue;
        }
        const DrawAttributeGroup = function (count, normalized, allPoints, inputColor, name) {
            let id = "radarchart-stat-" + name;
            let color = inputColor || "rgba(175, 105, 255)";
            let fill = inputColor + "28";
            SVG += "<g render-order='1'>";
            if (count === 1) {
                // full circle
                SVG += `<circle id="${id}" class="radarchart-stats" cx="${ChartMiddle}" cy="${ChartMiddle}" r="${Radius * normalized[0]}"`;
            }
            else if (count === 2) {
                //half circle
                SVG += `<path id="${id}-top" class="radarchart-stats"
                d="M ${ChartMiddle + Radius * normalized[0]} ${ChartMiddle} 
                a ${Radius * normalized[0]} ${Radius * normalized[0]} 
                ${ChartMiddle * (normalized[0])} 0
                0 ${ChartSize * (normalized[0] * -1)} 
                0 Z "`
                SVG += `' stroke="${color}" fill="${fill}" stroke-width="1" />`;

                SVG += `<path id="${id}-bottom" class="radarchart-stats"
                d="M ${ChartMiddle - Radius * normalized[1]} ${ChartMiddle} 
                a ${Radius * normalized[1]} ${Radius * normalized[1]} 
                ${Radius * (normalized[1])} 1
                0 ${ChartSize * normalized[1]} 
                0 Z "`
            }
            else {// poligon for the attributes
                SVG += `<polygon id='${id}' class="radarchart-stats" points=' `;
                let offset = ChartMiddle - Radius   // (UseImage? 1.55 : 1.6);
                allPoints.forEach((p) => { SVG += `${p.X + offset} ${p.Y + offset} ` });
            }
            SVG += `' stroke="${color}" fill="${fill}" stroke-width="1" />`;
            SVG += "</g>";
        };
        const InitLines = function (count) {
            let lines = [];
            // svg size is bigger then the chart size to place the decor around it
            let offset = ChartMiddle - Radius;
            for (let i = 0; i < count; i++) {
                let p = GetCircleCor(Angles[i], Radius);
                lines.push({ X: p.X + offset, Y: p.Y + offset });
            }
            return lines;
        };
        const InitAngles = function (count) {
            let angles = [];
            let startAngle = null;
            switch (count) {
                case 1: startAngle = -90; break;
                case 3: startAngle = 210; break;
                case 4: startAngle = -135; break;
                case 5: startAngle = -90; break;
                default: startAngle = -90;
            }
            for (let i = 0; i < count; i++) {
                angles.push(startAngle + 360 / count * i)
            }
            return angles;
        };
        const CreateNormals = function (attributes) {
            let normilized = [];
            attributes.forEach(attr => { normilized.push(Normalize(attr.Value, 0, Max)) });
            return normilized;
        };
        const CreatePoints = function (attributes, normals) {
            let points = [];
            for (let i = 0; i < attributes.length; i++) {
                let p = GetCircleCor(Angles[i], Radius * normals[i]);
                points.push({
                    X: p.X + (Radius) * (1 - normals[i]),
                    Y: p.Y + (Radius) * (1 - normals[i])
                });
            };
            return points;
        };
        const InitSVG = function (count, lines) {
            let svg = `<svg id="radarchart-${ChartName}" height="${Size}px" width="${Size}px" margin="auto" stroke="gray" stroke-width="1" fill="transparent" bgcolor="radial-gradient(transparent, rgba(64, 12, 32, 1), transparent, transparent)" border-radius="1%">`;
            // 0% 25% 50% 75% and 100% circles
            svg += "<g render-order='0'>";
            [0, 25, 50, 75, 100].forEach((n) => {
                let circleR = n === 0 ? Radius / (Max / Min) : n === 100 ? Radius : Radius / (100 / n);
                let stroke = 'stroke="' + (n === 0 ? 'red"' : 'gray"');
                let fill = 'fill="' + (n === 0 ? 'rgba(255, 0, 0, .25)"' : 'transparent"');
                svg += `<circle id="radarchart-circle-${n}" class="radarchart-circles" cx="${ChartMiddle}" cy="${ChartMiddle}" r="${circleR}" ${stroke} ${fill}/>`
            });
            svg += "</g>";

            // axis lines
            svg += "<g render-order='-1'>";
            for (let i = 0; i < count; i++) {
                svg += `<line id="radarchart-line-${StatNames[i]}" class="radarchart-lines"
            x1="${ChartMiddle}" y1="${ChartMiddle}" 
            x2="${lines[i].X}" y2="${lines[i].Y} "/>`;
            };
            svg += "</g>";
            return svg;
        };
        const ProcessGroup = function (attributes, name, color) {
            Count = Count || attributes.length;
            StatNames = StatNames || attributes.map(attr => { return attr.Name });
            name = name || "player";
            color = color || "#AF69FF";
            Angles = Angles || InitAngles(Count);
            Lines = Lines || InitLines(Count);
            let normalized = CreateNormals(attributes);
            let points = CreatePoints(attributes, normalized);
            SVG = SVG || InitSVG(Count, Lines);
            DrawAttributeGroup(attributes.length, normalized, points, color, name);
        };
        const ProcessChildMacros = function (name, payload) {
            Attributes = [];
            let color = null;
            for (let i = 0; i < payload.length; i++) {
                let pay = payload[i];
                switch (pay.name) {
                    case "addstat":
                        Attributes.push({ Name: pay.args[0], Value: pay.args[1] });
                        if (i + 1 >= payload.length || payload[i + 1].name === "newgroup") {
                            ProcessGroup(Attributes, name, color);
                        }
                        break;
                    case "newgroup":
                        Attributes = [];
                        name = pay.args[0];
                        color = pay.args.length > 1 ? pay.args[1] : null;
                        break;
                    case "addcollection":
                        Attributes = InterpretAttributes(pay.args[0]);
                        ProcessGroup(Attributes, name, color);
                        break;
                    case "setlabels":
                        StatNames = [];
                        if (pay.args.length > 1 && !Array.isArray(pay.args[0])) {
                            pay.args.forEach(n => { StatNames.push(n) });
                        }
                        else if (Array.isArray(pay.args[0]))
                            StatNames = pay.args[0];
                        break;
                }
            }
        };

        /* Setting up arguments and default Values */
        var SVG = null;
        var Name = null;
        var ChartName = this.args[0];
        var StatNames = null;
        var Count = null;
        var Angles = null;
        var Lines = null;
        var PufferSpace = 16;
        var Size = FindKeywordValue(this.args, "size", 200);
        var Max = FindKeywordValue(this.args, "max", 100);
        var Min = FindKeywordValue(this.args, "min", 0);
        var UseImage = FindKeywordValue(this.args, "useimage", -1) === -1 ? false : true;
        var DecorSize = UseImage ? FindKeywordValue(this.args, "decorsize", 32) : FindKeywordValue(this.args, "decorsize", 16);
        var TextLimit = FindKeywordValue(this.args, "txtlimit", 3);
        var ChartMiddle = Size / 2;
        var ChartSize = Size - DecorSize * 2 - PufferSpace * 2;
        var Radius = ChartSize / 2;
        var Attributes = InterpretAttributes(this.args[0]);

        // Process Macro
        if (Attributes == null) {
            ProcessChildMacros(this.args[0], this.payload);
        } else {
            ProcessGroup(Attributes, Name);
            if (this.payload.length > 1)
                ProcessChildMacros(this.args[0], this.payload);
        }

        /* Create Text / Image */
        for (let i = 0; i < StatNames.length; i++) {
            // Go through all Names create cordinated and adjust them
            let id = `id="radarchart-decor-${StatNames[i].replace(" ", "_")}"`;
            let p = GetCircleCor(Angles[i], ChartMiddle - DecorSize / 2);
            if (!UseImage) {
                let text = TextLimit > 0 ? StatNames[i].slice(0, TextLimit) : StatNames[i];
                SVG += `<text ${id} class="radarchart-decors" x="${Math.clamp(p.X - DecorSize / 1.5 - (StatNames[i].length > 3 ? StatNames[i].length * 0.5 : 0), 0, Size - PufferSpace / 2)}" y="${Math.clamp(p.Y + PufferSpace / 1.5, 0, Size - PufferSpace / 2)}" fill="white" text-align="center" Font-size="${DecorSize}px"> ${text}</text>`;
            }
            else { // Create Image placeholders
                SVG += `<foreignObject x="${p.X}" y="${p.Y}" height="${DecorSize}px" width="${DecorSize}px"><div ${id} class="radarchart-decors" style="height:100%; width:100%;"></div></foreignObject>`;
            }
        }

        SVG += "</svg>";
        $(this.output).wiki(SVG);
    }
});