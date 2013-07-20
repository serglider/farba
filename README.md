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
You can pass two arguments to the constructor function: id of the container element and object containing options which will override the default ones. If you provide falsy value or omit the first argument, constructor will search for the element with id `farba`.
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
To be continued.

Name | Type | Default | Description
--- | --- | --- | ---
*hidden* | *boolean*  | *false* | Finally you can change any options dynamically by instance method `options`.
*insertBefore* | *boolean*  | *false* | Finally you can change any options dynamihod `options`.
*getSizeByElement* | *boolean*  | *false* | Finally you can change any options.
1 | 2 | 3 | 4


### Methods
To be continued.

### Licence
To be continued.
