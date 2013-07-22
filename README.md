# farba

#### Description

Yet another color picker. But  this one is originally designed, highly customizable, somewhat educational and named after Ukrainian word which means color or paint.

Farba consists of background and three intersecting circles. Background optionally may be transparent or colored in the resulting color. Intersection of the circles forms seven section: red, green, blue, cyan, magenta, yellow and  resulting color areas.

By clicking or holding down  your right or left mouse button in pure color areas, you will increase or decrease  contribution of that color to result. By doing so in mixed color areas, you will change contribution of several colors simultaneously.

There is possibility to quickly set the component value (or values) to extreme range. By clicking while holding `Ctrl` button you will change value to `255` and holding `Alt` button you will change value to `0`. If you hold `Shift`, then a click will set all colors to average value.


### Setup
Load *farba.js* on your page and create new instance of the Farba constructor.
```javascript
var novafarba = new Farba ();
var peinture = new Farba ( "peinture" );
var options = { width: 1000, height: 867, mouseInvert: true };
var kraska = new Farba ( "kraska", options );
```
You can pass two arguments to the constructor function: id of the container `div` element and object containing options which will override the default ones. If you provide falsy value or omit the first argument, constructor will search for the element with id `farba`.
```javascript
var options = { width: 1000, height: 867, mouseInvert: true };
var neuefarbe = new Farba ( false, options );
```
Also you can override default options by using the `data-farba-options` attribute of the container element. Value of the attribute has to be JSON string representing option object. Note: the option object passed in constructor function overrides this one.
```html
<div id='farba' data-farba-options='{"width":1000,"height":867,"mouseInvert":true}'></div>
```
Finally you can change any options dynamically by instance method `options`.

### Options
The table below describes options that you can override.

Name | Type | Default | Description
--- | --- | --- | ---
*hidden* | *boolean*  | *false* | If *true*, it will set the display property of the container `div` element  to *"none"*.
*insertBefore* | *boolean*  | *false* | If *true*, it will insert the color picker canvas before the first child node of the container element. Otherwise the canvas will be appended after the  last child node of the container element..
*getSizeByElement* | *boolean*  | *false* | If *true*, it will fill the whole container element. In that case the width has to be, at least, slightly (3 to 2.87) bigger than the height. This feature doesn't work if the container element is hidden. Use option "hidden" instead.
*width* | *number*  | *250* | The width of the color picker canvas in pixels.
*height* | *number*  | *238.8* | The height of the color picker canvas in pixels.
*colorBg* | *boolean*  | *true* | If *true*, it will set background color of the canvas to the current color. Otherwise the background will be transparent.
*mouseInvert* | *boolean*  | *false* | It swaps actions of the mouse buttons.
*colorChangeDelay* | *number*  | *30* | This is delay in milliseconds before the next change when user is holding her mouse down.
*paddingLeft* | *number*  | *0* | This is space between the left edge of the canvas and the leftmost edge of the red circle in percent of the canvas width.
*paddingRight* | *number*  | *0* | This is space between the right edge of the canvas and the rightmost edge of the blue circle in percent of the canvas width.
*paddingTop* | *number*  | *0* | This is space between the upper edge of the canvas and the topmost edge of the green circle in percent of the canvas width.
*fontFamily* | *string*  | *"sans-serif"* | The font used on the canvas.
*circleStrokeWidth* | *number*  | *2* | The width of the stroke line of the circles in percent of the radius.
*circleStrokeColor* | *string*  | *"#FFF"* | The color of the stroke line of the circles.
*rgbText* | *boolean*  | *true* | This defines whether or not to display RGB information.
*rgbRelFontSize* | *number*  | *0.2* | This sets the font size of the RGB text in fractions of the radius.
*rgbTextPosition* | *number*  | *0.1* | This sets the shift of the corresponding line of the RGB text from the center of the circle. The shift is measured in fractions of the radius. 
*hexText* | *boolean*  | *false* | This defines whether or not to display hexadecimal representation of the color.
*hslText* | *boolean*  | *false* | This defines whether or not to display hue, saturation and lightness of the color.
*hexHslRelFontSize* | *number*  | *0.15* | This sets the font size of the HEX and HSL information  in fractions of the radius.
*hexHslTextShiftX* | *number*  | *0* | This sets the horizontal shift of the HEX and HSL information from the common center of the circles. The shift is measured in fractions of the radius.
*hexHslTextShiftY* | *number*  | *0* | This sets the vertical shift of the HEX and HSL information from the common center of the circles. The shift is measured in fractions of the radius.
*redTitle* | *string*  | *"Red: "* | The text inserted before the corresponding value.
*greenTitle* | *string*  | *"Green: "* | The text inserted before the corresponding value.
*blueTitle* | *string*  | *"Blue: "* | The text inserted before the corresponding value.
*hueTitle* | *string*  | *"Hue: "* | The text inserted before the corresponding value.
*saturationTitle* | *string*  | *"Saturation: "* | The text inserted before the corresponding value.
*lightnessTitle* | *string*  | *"Lightness: "* | The text inserted before the corresponding value.


### Methods

An instance of the Farba constructor has the following methods:

**_options_** - method dynamically overrides current options. It takes one argument - an object containing options to override.
```javascript
novafarba.options( { width: 1000, height: 867, mouseInvert: true } );
```

**_hide_** - method hides the container `div` element.

**_show_** - method shows the container `div` element.

**_exterminate_** - if no truthy argument provided,  method removes the container div element. Otherwise it removes the color picker canvas.
```javascript
novafarba.exterminate( true ); // removes the canvas
```
**_reset_** - if no truthy argument provided,  method sets the values of all colors to `255`, i.e. sets the resulting color to white. Otherwise it sets the resulting color to black.
```javascript
novafarba.reset( true ); // this will set black color
```
**_getRed_** - method returns the red component of the current color. Data type: number.

**_getGreen_** - method returns the green component of the current color. Data type: number.

**_getBlue_** - method returns the blue component of the current color. Data type: number.

**_getHue_** - method returns the hue of the current color. Data type: number.

**_getSaturation_** - method returns the saturation of the current color. Data type: number.

**_getLightness_** - method returns the lightness of the current color. Data type: number.

**_getRGB_** - method returns a string representing CSS RGB value for the current color. RGB components as integer.

**_getPercentRGB_** - method returns a string representing CSS RGB value for the current color. RGB components as percentage value.

**_getHex_** - method returns a hexadecimal representation of the current color. if truthy argument provided, hash sign will be inserted at the beginning. Data type: string.
```javascript
novafarba.getHex( true ); // this will return "#FFFFFF"
```
**_getHSL_** - method returns a string representing CSS HSL value for the current color.

### Licence
This project is licensed under the Apache License, Version 2.0. For more information, please, read the LICENSE.md.
