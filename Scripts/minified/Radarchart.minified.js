Macro.add(["radarchart"],{tags:["addstat","newgroup","addcollection","setlabels"],handler:function(){if(0===this.args.length)return this.error("Not enough Arguments.");const t=function(t){let r=[];const e="string"==typeof t?State.getVar(t):t;if(null==e)return null;if(Array.isArray(e))for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))r.push({Name:e[t][0],Value:e[t][1]});else if("object"==typeof e[t])if(Object.keys(e[t]).length>1){var a={};for(const[s,l]of Object.entries(e[t]))$.isNumeric(l)?a.Value=l:a.Name=l,Object.keys(a).length>1&&(r.push(a),a={})}else for(const[a,s]of Object.entries(e[t]))r.push({Name:a,Value:s});else r.push({Name:e[t],Value:e[++t]});else r=Object.keys(e).map(function(t){return{Name:t,Value:e[t]}});return r},r=function(t,r){let e=t/180*Math.PI;return{X:Math.cos(e)*r+r,Y:Math.sin(e)*r+r}},e=function(t,r,e){let a=t.findIndex(t=>"string"==typeof t&&t.toLowerCase().startsWith(r));return a>-1?t[a].substring(r.length+1):e},a=function(t){let r=[];return t.forEach(t=>{r.push(function(t,r,e){return((t=Math.clamp(t,r,e))-r)/(e-r)}(t.Value,0,d))}),r},s=function(t,e,s){h=h||t.length,c=c||t.map(t=>t.Name),e=e||"player",s=s||"#AF69FF",o=o||function(t){let r=[],e=null;switch(t){case 1:e=-90;break;case 3:e=210;break;case 4:e=-135;break;case 5:e=-90;break;default:e=-90}for(let a=0;a<t;a++)r.push(e+360/t*a);return r}(h),g=g||function(t){let e=[],a=m-x;for(let s=0;s<t;s++){let t=r(o[s],x);e.push({X:t.X+a,Y:t.Y+a})}return e}(h);let l=a(t),$=function(t,e){let a=[];for(let s=0;s<t.length;s++){let t=r(o[s],x*e[s]);a.push({X:t.X+x*(1-e[s]),Y:t.Y+x*(1-e[s])})}return a}(t,l);n=n||function(t,r){let e=`<svg id="radarchart-${i}" height="${u}px" width="${u}px" margin="auto" stroke="gray" stroke-width="1" fill="transparent" bgcolor="radial-gradient(transparent, rgba(64, 12, 32, 1), transparent, transparent)" border-radius="1%">`;e+="<g render-order='0'>",[0,25,50,75,100].forEach(t=>{e+=`<circle id="radarchart-circle-${t}" class="radarchart-circles" cx="${m}" cy="${m}" r="${0===t?x/(d/f):100===t?x:x/(100/t)}" ${'stroke="'+(0===t?'red"':'gray"')} ${'fill="'+(0===t?'rgba(255, 0, 0, .25)"':'transparent"')}/>`}),e+="</g>",e+="<g render-order='-1'>";for(let a=0;a<t;a++)e+=`<line id="radarchart-line-${c[a]}" class="radarchart-lines" x1="${m}" y1="${m}" x2="${r[a].X}" y2="${r[a].Y} "/>`;return e+="</g>"}(h,g),function(t,r,e,a,s){let l="radarchart-stat-"+s,i=a||"rgba(175, 105, 255)",c=a+"28";if(n+="<g render-order='1'>",1===t)n+=`<circle id="${l}" class="radarchart-stats" cx="${m}" cy="${m}" r="${x*r[0]}"`;else if(2===t)n+=`<path id="${l}-top" class="radarchart-stats" d="M ${m+x*r[0]} ${m} a ${x*r[0]} ${x*r[0]} ${m*r[0]} 0 0 ${k*(-1*r[0])} 0 Z"`,n+=`' stroke="${i}" fill="${c}" stroke-width="1"/>`,n+=`<path id="${l}-bottom" class="radarchart-stats" d="M ${m-x*r[1]} ${m} a ${x*r[1]} ${x*r[1]} ${x*r[1]} 1 0 ${k*r[1]} 0 Z "`;else{n+=`<polygon id='${l}' class="radarchart-stats" points='`;let t=m-x;e.forEach(r=>{n+=`${r.X+t} ${r.Y+t} `})}n+=`' stroke="${i}" fill="${c}" stroke-width="1" />`,n+="</g>"}(t.length,l,$,s,e)},l=function(r,e){w=[];let a=null;for(let l=0;l<e.length;l++){let n=e[l];switch(n.name){case"addstat":w.push({Name:n.args[0],Value:n.args[1]}),(l+1>=e.length||"newgroup"===e[l+1].name)&&s(w,r,a);break;case"newgroup":w=[],r=n.args[0],a=n.args.length>1?n.args[1]:null;break;case"addcollection":w=t(n.args[0]),s(w,r,a);break;case"setlabels":c=[],n.args.length>1&&!Array.isArray(n.args[0])?n.args.forEach(t=>{c.push(t)}):Array.isArray(n.args[0])&&(c=n.args[0])}}};var n=null,i=this.args[0],c=null,h=null,o=null,g=null,u=e(this.args,"size",200),d=e(this.args,"max",100),f=e(this.args,"min",0),p=-1!==e(this.args,"useimage",-1),y=e(this.args,"decorsize",p?32:16),b=e(this.args,"txtlimit",3),m=u/2,k=u-2*y-32,x=k/2,w=t(this.args[0]);null==w?l(this.args[0],this.payload):(s(w,null),this.payload.length>1&&l(this.args[0],this.payload));for(let t=0;t<c.length;t++){let e=`id="radarchart-decor-${c[t].replace(" ","_")}"`,a=r(o[t],m-y/2);if(p)n+=`<foreignObject x="${a.X}" y="${a.Y}" height="${y}px" width="${y}px"><div ${e} class="radarchart-decors" style="height:100%; width:100%;"></div></foreignObject>`;else{let r=b>0?c[t].slice(0,b):c[t];n+=`<text ${e} class="radarchart-decors" x="${Math.clamp(a.X-y/1.5-(c[t].length>3?.5*c[t].length:0),0,u-8)}" y="${Math.clamp(a.Y+16/1.5,0,u-8)}" fill="white" text-align="center" Font-size="${y}px"> ${r}</text>`}}n+="</svg>",$(this.output).wiki(n)}});