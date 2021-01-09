# <li>Radarchart ver. 1.0.0</li>
# Installation
To install this Macro, simply copy the contents of __either__ the [Pretty](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/blob/master/Scripts/Radarchart.js "Pretty") or [Minified](https://github.com/GwenTastic/Custom-Macros-for-Sugarcube/blob/master/Scripts/minified/Radarchart.minified.js "Minified") Radarchart JavaScript into your Story's JavaScript page.

<hr>
<br>

## *Description:*
The Radarchart Macro takes in values or a collection to visualise it as a SVG Radarchart which can be further customized via CSS.

~~~js
<<radarchart Collection/Name [, Min=value] [, Max=value] [, Size=value] [, Useimage] [, Decorsize=value] [, TxtLimit=value]>> 
    [<<addstat "name" value>>]
    [<<newgroup "groupname" [groupcolor]>>]
    [<<addcollection collection>>]
    [<<setlabels collection>>]
<</radarchart>>
~~~

Each stat will be it's own axis on the Radarchart going clockwise starting at the upper left corner or middle.

When providing a single stat to the macro it will render a circle.
When two stats are provided it will display two half circles.
Everything more then two will result in a Poligon of various shapes.
<br>
<br>

> ## Macro Parameters:
> - **Collection/Name**: *Sting / Object* \
   It's always required as the first Argument. Can be either a name for the first group eg.: "Player", or the variable name that holds a collection eg.: `"$Player"` or `"$Player.Propertyname"`, or a object collection itself. <small>See [Supported Strucutres](###supported-collections)</small>. 
>  
> - **Min=Number**: Optional, Default 0;\
    Is used to create a helper circle at the position of the provided number ex.: `Min=50 Max=100` would be a cirlce on the half way mark.
>
> - **Max=Number**: Optional, Default 100;\
    It's used to set the maximum range that the chart can have.
>
> - **Size=Number**: Optional, Default 200;\
    Sets the Size of the SVG element containing the Radarchart.
>
> - **Useimage**: Optional Keyword;\
    Used to hide the generated decor text around the radarchart, and to enable the possibility to set image icons instead.
>
> - **Decorsize=Number**: Optional, Default 32;\
    Sets the font/Icon -size which are around the Radarchart.
>
> - **TxtLimit=Number**: Optional, Default 3;\
    Sets the Limit of Characters of the Decor Text (the Text around the Radarchart), 0 means all Characters will be displayed.
>> **Note:** Keywords spelling does not matter it could be all upper/lower -case and the `=` can be replaced by any other character eg.: `max=20 MIN!5` \
>> ~~**Note:** It mgiht be changed to `min 5 Max 50`~~

> ## Child Macros:
> - **<<addstat  "name" value>>** : Optional;\
>   Adds an Attribute to the current Group. 
> - **<<newgroup "groupname" [color]>>** : Optional; \
>   Creates a new Group to be overlayed onto the prior Group, optionally a color in hex can be provided.
> - **<\<addcollection collection>>** : Optional;\
>   Adds an entire collection.
> - **<\<setlabels collection>>** : Optional;\
>   Sets the Decor Text, which are by default the stat names. 

<br>


> ### Supported Collections
> | Done  | Description    | Structure                                |
> | ----: | ---------------| ---------------------------------------- |
> | - [x] | Arrays:        | `` ["name1", value1, "name2", value2] `` |
> | - [x] | Objects:       | `` {name1: value1, name2: value2} ``     |

<br>
<br>

## Examples:
<table><tr><td> <h4><b>Sugarcube Code </B></h4> </td> <td> <h4><b>Output </B></h4> </td> </tr>
<tr><td>
<p align="center">Minimal example using an Object.</p>

```js
<<set $player = {
    health: 70,
    mana: 30,
    stamina: 50
 }>>
<<radarchart "$player">><</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/4zA5Om6.png)
</td></tr>
<tr><td>
<p align="center">Simple example with single variable Values.</p>

```js
<<set $pHealth = 70>>
<<set $pMana = 30>>
<<set $pStamina = 50>>
<<radarchart "Player">>
    <<addstat "Health" $pHealth>>
    <<addstat "Mana" $pMana>>
    <<addstat "Stamina" $pStamina>>
<</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/jclNgn4.png)
</td></tr>
<tr><td>
<p align="center">Simple example with Arrays.</p>

```js
<<set $player = ["Health", 70, "Mana", 30, "Stamina", 50]>>
<<radarchart "$player">><</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/ynma3KF.png)
</td></tr>
<tr><td>
<p align="center">Comparing Two Groups.</p>

```js
<<set $player = {Health: 70, Mana: 30, Stamina: 50}>>
<<set $enemy = {Health: 30, Mana: 45, Stamina: 70}>>
<<radarchart "$player">>
    <<newgroup "Enemy" #FF0033>>
    <<addcollection $enemy>>
<</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/8AYHAzw.png)
</td></tr>
<tr><td>
<p align="center">Comparing Two Groups with set labels.</p>

```js
<<radarchart "Player">>
    <<setlabels "HP" "MP" "SP">>
    <<addstat "Health" 70>>
    <<addstat "Mana" 30>>
    <<addstat "Stamina" 50>>
    <<newgroup "Enemy" #FF0033>>
    <<addstat "Health" 30>>
    <<addstat "Mana" 50>>
    <<addstat "Stamina" 70>>
<</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/gZU8cXW.png)
</td></tr>
<tr><td>
<p align="center">Using Icons instead.</p>

```js
<<radarchart "Player" useimages>>
    <<addstat "Health" 70>>
    <<addstat "Mana" 30>>
    <<addstat "Stamina" 50>>
    <<newgroup "Enemy" #FF0033>>
    <<addstat "Health" 30>>
    <<addstat "Mana" 50>>
    <<addstat "Stamina" 70>>
<</radarchart>>
```
</td>
<td>

![](https://i.imgur.com/a7DtjTl.png)
</td></tr>
</table>

<hr>

## Styling:
The Radarchart Macro creates a SVG with multiple elements each can be targeted by their css ID and/or css Class.\
All ID's and Classes start with `radarchart-` followed by their type (id's are singular where as classes are plural) 
> - `circle/circles` for the helper/progression Circles;
> - `line/lines` for the axis Lines of an Attribute/Stat;
> - `decor/decors` for the Text/Images;
> - `stat/stats` for the Attributes.

Classes have no further specification but ID's do get the Stats/Attributes or collections name tagged on after it.
So an id for the "health" axis would look like this: "`radarchart-line-health`",\
where as a class for the axis looks like this: "`radarchart-lines`". 
> > **Note:** That providing only 2 Stats/Attributes results in two half circles in which the id's get an added `-top` and `-bottom` at the end eg.: "`radarchart-stat-player-top`".
 
 <br>

 ### Styling Examples
Provided the `<<radarchart>>` gets an object like this: `Player{ Health: 70, Mana: 30, Stamina: 50}`
 <table><tr><td> <h4><b>CSS Code </B></h4> </td> <td> <h4><b>Output </B></h4> </td> </tr>
<tr><td>
<p align="center">Changing the default color of the player object.</p>

```css
#radarchart-stats-Player {
  stroke: rgba(253, 102, 0, .9);
  fill: rgba(253, 102, 0, .2);
}
```
</td>
<td>

![](https://i.imgur.com/uJT0vDU.png)
</td></tr>
<tr><td>
<p align="center">Changing the helper circles.</p>

```css
#radarchart-circle-0 {
  stroke: none;
}
#radarchart-circle-25 {
  stroke: white;
}
#radarchart-circle-50 {
  stroke: lime;
  stroke-dasharray: 2, 10;
}
#radarchart-circle-75 {
  stroke: deepskyblue;
  stroke-dasharray: 15, 5;
}
#radarchart-circle-100 {
  stroke: rebeccapurple;
  stroke-width: 3;
}
```
</td>
<td>

![](https://i.imgur.com/F6DIo0b.png)
</td></tr>
<tr><td>
<p align="center">Changing axis lines.</p>

```css
.radarchart-lines {
  stroke: lime;
}
#radarchart-line-Health{
  stroke: #FF0011;
  stroke-dasharray: 17, 8;
}
```
</td>
<td>

![](https://i.imgur.com/n9rRefX.png)
</td></tr>
<tr><td>
<p align="center">Mouse hover over player stat.</p>

```css
#radarchart-stat-Player{
  transform-origin: center;
  transform-box: fill-box;
}
#radarchart-stat-Player:hover{
  stroke: rgba(253, 102, 0, .9);
  fill: rgba(253, 102, 0, .2);
  stroke-width: 3;
  transform: scale(1.2);
  filter: drop-shadow(5px 5px 4px deepskyblue);
}
```
</td>
<td>

![](https://i.imgur.com/TiHmLm4.gif)
</td></tr>
<tr><td>
<p align="center">Changing label colors.</p>

```css
.radarchart-decors{
  stroke: white;
  stroke-width: 0.2;
  fill: red;
}
#radarchart-decor-Mana{
  stroke: white;
  stroke-width: 0.4;
  fill: rebeccapurple;
}
```
</td>
<td>

![](https://i.imgur.com/jG0neXE.png)
</td></tr>
<tr><td>
<p align="center">Assinging images.</p>

```css
#radarchart-decor-Health {
  background-image: url(Images/Heart3.png);
}
#radarchart-decor-Stamina {
  background-image: url(Images/Stamina2.png);
}
#radarchart-decor-Magic {
  background-image: url(Images/Magic2.png);
}
```
</td>
<td>

![](https://i.imgur.com/TBRCMYF.png)
</td></tr>
</table>
<br><br>
<hr>

## Possible future features (undecided):
- [ ] Editmode: a keyword to generate sliders along with the Radarchart. eg.:
![](https://i.imgur.com/sJIdM6P.gif)
- [ ] Possibility to use Pentagonal shape instead of Circles.
- [ ] Possibility to automatically register a Sugarcubes Templates for quick and easy display. (`?MyRadarchartName`)