* # Cooldown Button
## Installation:
 To install this addon, simply copy the contents of __either__ the [Pretty](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/blob/master/Scripts/CooldownButton.js "Pretty") or [Minified](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/blob/master/Scripts/minified/CooldownButton.minified.js "Minified") CooldownButton JavaScript into your Story's JavaScript page, __and__ the contents of the [Stylesheet](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/blob/master/Scripts/CooldownButton.css "Stylesheet") into your Story's Stylesheet.

<br>

## Description:
 For an easy to use Button with a build in Progressbar and cooldown.
> [Demo File](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/tree/master/Demos "Demo File")

![Button Preview](https://i.imgur.com/EvAkmbr.gif "Button Preview")

## Usage:
```js
<<cooldownButton "My Button">>
    /* Your Code */
<</cooldownButton>>
```
## Syntax:
> `<<cooldownButton Text [Duration] [Direction]>>`
 * Text: *String* \
    The text that will be displayed on the Button. \
    > The Content's Text of the Button _**has**_ to be the first argument.
 * [Optional] Duration: (*Number/String*) \
    How long the Button will be deactivated after being clicked.
    >  This Argument is optional, and can be a Number or a String. \
        The following are valid examples for a 1 second cooldown duration: 1000, 1000ms, 1s
        A 3 Second cooldown is the Default.

 * [Optional] Direction: (*String*)  \
    Does determaine the direction of the Progressbar, fill and fillup will let the bar fill the button from left to right, emtpy will start with a full bar and reduce it from right to left.
    > This Argument is optional, valid values are: fill, fillup, empty \
     Empty is the Default Property value.
> All of the above Properties can be a variable's name to dynamically alter any of those Properties.
    > Example:
    >> `<<cooldownButton "$MyVar" fill 1s>>` \
    >> Alternatively: \
    >>  `<<cooldownButton "$Name" "$Cooldown" "_Direction">>`