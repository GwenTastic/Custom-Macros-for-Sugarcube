Macro.add("cooldownButton",{skipArgs:false,tags:null,handler:function(){try{if(this.args.length===0){return this.error('Macro is missing arguments. Eg.: <<cooldownButton "Text">>')}var macrocontenxt=this;var content={Text:this.args[0],IsTextVariable:false};if(content.Text.startsWith("$")||content.Text.startsWith("$")){content.Text=State.getVar(this.args[0]).replace(/"/g,"");content.VarTextName=this.args[0];content.IsTextVariable=true}else{content.Text=this.args[0].replace(/"/g,"")}var animation={Duration:3000,Direction:"-=100%",WidthComplete:"100%",IsDurationVariable:false,IsDirectionVariable:false};if(this.args.length>=2){for(var i=1;i<this.args.length;i+=1){if(Number.isInteger(this.args[i])){animation.Duration=this.args[i]}else{var prop=this.args[i].trim();if(!(typeof prop==="string"||prop instanceof String)){return this.error(this.args[1]+" is not a valid Argument, they have to be either a String or a Number.")}prop=prop.trim();var isVariable=(prop.startsWith("$")||prop.startsWith("_"))?true:false;var val=isVariable?State.getVar(prop):prop;if(Number.isInteger(val)){animation.Duration=val;if(isVariable){animation.IsDurationVariable=true;animation.VarDurationName=prop}}else{val=val.toLowerCase();if(val==="fill"||val==="fillup"){animation.Direction="+=100%";animation.WidthComplete="0%";if(isVariable){animation.IsDirectionVariable=true;animation.VarDirectionName=prop}}else if(val==="emtpy"||val===""){animation.Direction="-=100%";animation.WidthComplete="100%";if(isVariable){animation.IsDirectionVariable=true;animation.VarDirectionName=prop}}else if(val.endsWith("ms")){animation.Duration=Number(prop.slice(0,-2));if(isVariable){animation.IsDurationVariable=true;animation.VarDurationName=prop}}else if(val.endsWith("s")){animation.Duration=Number(prop.slice(0,-1))*1000;if(isVariable){animation.IsDurationVariable=true;animation.VarDurationName=prop}}}}}}if(!Number.isInteger(animation.Duration)){return this.error("Duration is not a valid Number. Eg.: Use 1000 for 1 Second, or 1s, or 1000ms.")}var obj_btn={ID:"macro-cooldownbutton-"+this.args[0].replace(/ /g,"-").replace(/"/g,"").replace("$","").replace("_","")+"-"+random(Number.MAX_SAFE_INTEGER).toString(),Name:content,Class:"macro-cooldownbutton",Payload:this.payload[0].contents,Output:this.output};var $span=$(document.createElement("span"));$($span).attr("class","macro-cooldownbutton-content");$($span).append(obj_btn.Name.Text);var $div=$(document.createElement("div"));$($div).attr("class","macro-cooldownbutton-progressbar");var $btn=$(document.createElement("button"));$($btn).attr("class",obj_btn.Class);$($btn).attr("type","button");$($btn).append($($span));$($btn).append($($div));$btn.ariaClick(function(){if(!$btn.hasClass("Disabled")){var dur=animation.IsDurationVariable?State.getVar(animation.VarDurationName):animation.Duration;var dir=animation.IsDirectionVariable?State.getVar(animation.VarDirectionName)===""?"-=100%":"+=100%":animation.Direction;if(dir===""){dir="-=100%"}var widthComp=dir==="-=100%"?"100%":"0%";if(content.IsTextVariable){$($span).text(State.getVar(content.VarTextName))}console.log("Text var: "+content.IsTextVariable);if(content.IsTextVariable){console.log("Text var: "+State.getVar(content.VarTextName))}$btn.addClass("Disabled");$div.addClass("Disabled");$span.addClass("Disabled");$($div).css("width",widthComp);if(obj_btn.Payload!==''){Wikifier.wikifyEval(obj_btn.Payload.trim())}$($div).animate({width:dir},{duration:dur,specialEasing:{width:"linear"},complete:function(){$($div).removeClass("Disabled");$($span).removeClass("Disabled");$($btn).removeClass("Disabled");}});}}).appendTo(this.output);}catch(ex){return this.error("Something went wrong: "+ex.message)}}});