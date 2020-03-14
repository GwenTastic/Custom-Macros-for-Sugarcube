/*###################################################*/
/*#		Macro Name: Cooldown Button ©GwenTastic		#*/
/*#		Version: 1.0.0								#*/
/*#		For Sugarcube Engine ver. 2.30.0			#*/
/*###################################################*/

Macro.add("cooldownButton", {
	skipArgs: false,
	tags: null,
	handler: function() {
		try {
			// If it has no arguments throw error
			if(this.args.length === 0)
				return this.error('Macro is missing arguments. Eg.: <<cooldownButton "Text">>');

			var macrocontenxt = this;

			/* Check the name if it's a variable */
			var content = {
				Text: this.args[0],//.replace(/"/g, ""),
				IsTextVariable: false
			};
			if(content.Text.startsWith("$") || content.Text.startsWith("$"))
			{ // The Content Text is Variable
				content.Text = State.getVar(this.args[0]).replace(/"/g, "");
				content.VarTextName = this.args[0];
				content.IsTextVariable = true;
			}
			else // Content Text doesn't change
				content.Text = this.args[0].replace(/"/g, "");

			/* Default Animation Settings */
			var animation = {
				Duration: 3000,
				Direction: "-=100%",
				WidthComplete: "100%",
				IsDurationVariable: false,
				IsDirectionVariable: false
			};

			if(this.args.length >= 2)
			{ /* Get Animation properties */
				for(var i = 1; i < this.args.length; i++)
				{
					if(Number.isInteger(this.args[i]))
						animation.Duration = this.args[i];
					else
					{
						var prop = this.args[i].trim();
						/* it's not a number so check if it's a String    */
						if(!(typeof prop === "string" || prop instanceof String))
								return this.error(this.args[1] + " is not a valid Argument, they have to be either a String or a Number.");

						/* Is it a variable ?  														*/
						prop = prop.trim();
						var isVariable = (prop.startsWith("$") || prop.startsWith("_")) ? true : false;

						var val = isVariable ? State.getVar(prop) : prop;
						/* Since it was a Variable check if the Variables */

						if(Number.isInteger(val))
						{ // Value is a number
								animation.Duration = val;
								if(isVariable)
								{
									animation.IsDurationVariable = true;
									animation.VarDurationName = prop;
								}
						}
						else
						{ // Value is a string
							val = val.toLowerCase();

							if(val === "fill" || val === "fillup")
							{ // Value is fill or fillup
								animation.Direction = "+=100%";
								animation.WidthComplete = "0%";
								if(isVariable)
								{
									animation.IsDirectionVariable = true;
									animation.VarDirectionName = prop;
								}
							}
							else if(val === "emtpy" || val === "")
							{ // Value is empty or ""
								animation.Direction = "-=100%";
								animation.WidthComplete = "100%";
								if(isVariable)
								{
									animation.IsDirectionVariable = true;
									animation.VarDirectionName = prop;
								}
							}
							else if(val.endsWith("ms"))
							{ // Value contains Micro Seconds
								animation.Duration = Number(prop.slice(0, -2));
								if(isVariable)
								{
									animation.IsDurationVariable = true;
									animation.VarDurationName = prop;
								}
							}
							else if(val.endsWith("s"))
							{ // value Contains Seconds
								animation.Duration = Number(prop.slice(0, -1)) * 1000;
								if(isVariable)
								{
									animation.IsDurationVariable = true;
									animation.VarDurationName = prop;
								}
							}
						}// end of is val a string
					}// end of if args is typeof string
				}// end of for loop
			}// end of args.length >= 2

			/* -------------------------------------------------------- */
			// Double check if the duration is a valid Number !
			if(!Number.isInteger(animation.Duration))
			{ // Something went wrong and duration ended up not a number!
				return this.error("Duration is not a valid Number. Eg.: Use 1000 for 1 Second, or 1s, or 1000ms.");
			}

			/* -------------------------------------------------------- */
			/* Build Button                                      */
			var obj_btn = {
				ID:	"macro-cooldownbutton-" +  this.args[0].replace(/ /g,"-").replace(/"/g, "").replace("$", "").replace("_", "") +  "-" + random(Number.MAX_SAFE_INTEGER).toString(), 
				Name: content,
				Class: "macro-cooldownbutton",// link-internal
				Payload: this.payload[0].contents,
				Output: this.output
			}

			/* -------------------------------------------------------- */
			/* create DOM elements */
			var $span = $(document.createElement("span"));
			$($span).attr("class", "macro-cooldownbutton-content");
			$($span).append(obj_btn.Name.Text);

			var $div = $(document.createElement("div"));
			$($div).attr("class", "macro-cooldownbutton-progressbar");

			var $btn = $(document.createElement("button"));
			$($btn).attr("class", obj_btn.Class);
			$($btn).attr("type", "button");
			$($btn).append($($span));
			$($btn).append($($div));


			/* -------------------------------------------------------- */
			/* Attach onlick to Button                   				        */
			$btn.ariaClick(function(){
				/* Is the Button on Cooldown?                			      	*/
				if(!$btn.hasClass("Disabled"))
				{ // No the Button wasn't on Cooldown											*/
					/* Get Duration, Direction and Width properties  				*/
					/* Add Cooldown Class to the Button.             				*/
					/* And to the Cooldown "Progressbar"             				*/
					var dur = animation.IsDurationVariable ? State.getVar(animation.VarDurationName) : animation.Duration;
					var dir = animation.IsDirectionVariable? State.getVar(animation.VarDirectionName) === "" ? "-=100%" : "+=100%" : animation.Direction;
					if(dir === "")
						dir = "-=100%";
					var widthComp = dir === "-=100%" ? "100%" : "0%";
					if(content.IsTextVariable)
						$($span).text(State.getVar(content.VarTextName));

					console.log("Text var: " +content.IsTextVariable);
					if(content.IsTextVariable)
						console.log("Text var: " + State.getVar(content.VarTextName));

					$btn.addClass("Disabled");
					$div.addClass("Disabled");
					$span.addClass("Disabled");
					$($div).css("width", widthComp);

					/* ---------------------------------------------------- */
					/* Macros Body Functionality goes here!          				*/

						if(obj_btn.Payload !== '')
							Wikifier.wikifyEval(obj_btn.Payload.trim());

					/* ---------------------------------------------------- */
					/* Start Cooldown animation                				      */
					$($div).animate({
						width: dir
  					}, {
						duration: dur,
    				specialEasing: {
      					width: "linear"
    				},
    				complete: function()
						{ // Cooldown has Finished           				          */
      				/* Remove the Disabled class from the       				*/
							/* Button and Cooldown Progressbar.        				  */
							$($div).removeClass("Disabled");
							$($span).removeClass("Disabled");
							$($btn).removeClass("Disabled");
							/* Add Engine.Play(Passage) ?												*/
    				}
  				}); // end of div animate()
				} // end of btn has class disabled

			}).appendTo(this.output); // end of ariaClick()


		}
        catch (ex) {
    	    return this.error("Something went wrong: " + ex.message);
        }
	}
});