var farbaUtils = {

	addListener: function ( element, eventName, handler ) {
		if ( element.addEventListener ) {
			element.addEventListener( eventName, handler, false );
		}else if ( element.attachEvent ) {
			var bound = function() {
				return handler.apply( element, arguments );
			};
			element.attachEvent( "on" + eventName, bound );
		}else {
			element[ "on" + eventName ] = handler;
		}
	},

	removeListener: function ( element, eventName, handler ) {
		if ( element.addEventListener ) {
			element.removeEventListener( eventName, handler, false );
		}else if ( element.detachEvent ) {
			element.detachEvent( "on" + eventName, handler );
		}else {
			element[ "on" + eventName ] = null;
		}
	},

	fixEvent: function ( event ) {//by John Resig
		if ( !event || !event.stopPropagation ) {
			var old = event || window.event;
			event = {};
			for ( var prop in old ) {
				event[ prop ] = old[ prop ];
			}
			if ( !event.target ) {
				event.target = event.srcElement || document;
			}
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
			event.preventDefault = function() {
				event.returnValue = false;
				event.isDefaultPrevented = returnTrue;
			};
			event.isDefaultPrevented = returnFalse;
			event.stopPropagation = function() {
				event.cancelBubble = true;
				event.isPropagationStopped = returnTrue;
			};
			event.isPropagationStopped = returnFalse;
			event.stopImmediatePropagation = function() {
				this.isImmediatePropagationStopped = returnTrue;
				this.stopPropagation();
			};
			event.isImmediatePropagationStopped = returnFalse;
			if ( event.clientX !== null ) {
				var doc = document.documentElement, body = document.body;
				event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
				event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
			}
			event.which = event.charCode || event.keyCode;
			if ( event.button !== null ) {
				event.button = (event.button & 1 ? 0 : (event.button & 4 ? 1 : (event.button & 2 ? 2 : 0)));
			}
		}
		return event;
		function returnTrue() { return true; }
		function returnFalse() { return false; }
	},

	setLeftTop: function ( elem ) {
		var bcr = elem.getBoundingClientRect(), obj = {};
		obj.left = bcr.left + document.body.scrollLeft;
		obj.top = bcr.top + document.body.scrollTop;
		return obj;
	},

	hexFromRGB: function ( r, g, b ) {
		var hex = [r.toString( 16 ), g.toString( 16 ), b.toString( 16 )],
			i = 0;
		for ( ; i<3; i++ ) {
			if( hex[i].length === 1) { hex[i] = "0" + hex[i]; }
		}
		return hex.join( "" ).toUpperCase();
	},

	rgbFromHex: function ( hex ) {
		var red = parseInt( hex.substring(0, 2), 16 ),
			green = parseInt( hex.substring(2, 4), 16 ),
			blue = parseInt( hex.substring(4, 6), 16 );
		return [ red, green, blue ];
	},

	getPercent: function ( val ) {
		return Math.round( val/2.55 );
	},

	hslFromRGB: function ( r, g, b ) {
		var red = r/255, green = g/255, blue = b/255,
			max = Math.max( red, green, blue ),
			min = Math.min( red, green, blue ),
			arr = [], d, h, s, l = (max + min) / 2;
		if( max === min ){
			h = s = 0;
		}else{
			d = max - min;
			s = ( l > 0.5 ) ? d / (2 - max - min) : d / (max + min);
			switch( max ){
				case red: h = ( green - blue ) / d; break;
				case green: h = ( blue - red ) / d + 2; break;
				case blue: h = ( red - green ) / d + 4; break;
			}
		}
		arr[0] = Math.round( ( h>0 ) ? h*60 : ( h*60 + 360 ) );
		arr[1] = Math.round( s*100 );
		arr[2] = Math.round( l*100 );
		return arr;
	},

	colorLim: function ( val ) {
		return ( val>255 ) ? 255 : ( ( val<0 ) ? 0 : val );
	},

	isNotEmpty: function ( o ) {
		for( var key in o ) {
			if ( o.hasOwnProperty( key ) ) { return true; }
		}
		return false;
	},

	isArray: function ( o ) {
		return ( Object.prototype.toString.call( o ) === "[object Array]" );
	},

	isFunction: function ( o ) {
		return ( Object.prototype.toString.call( o ) === "[object Function]" );
	},

	isObject: function ( o ) {
		return ( Object.prototype.toString.call( o ) === "[object Object]" );
	},

	isNumber: function ( o ) {
		return ( Object.prototype.toString.call( o ) === "[object Number]" );
	},

	isString: function ( o ) {
		return ( Object.prototype.toString.call( o ) === "[object String]" );
	},

	isInt: function ( o ) {
		return SeptembruaryUtils.isNumber( o ) && o%1 === 0;
	},

	copyObject: function ( o ) {
		var attr, copy = {};
		for ( attr in o ) {
			if ( o.hasOwnProperty( attr ) ) { copy[attr] = o[attr]; }
		}
		return copy;
	}
};

function Farba ( eid, foptions ) {

	var canvas, ctx, circles,
		itexts, box, clock = false,
		u = farbaUtils,
		speed = 5,
		red = 255,
		green = 255,
		blue = 255,
		hex = function () { return u.hexFromRGB( red, green, blue ); },
		hue = function () { return u.hslFromRGB( red, green, blue )[0]; },
		saturation  = function () { return u.hslFromRGB( red, green, blue )[1]; },
		lightness  = function () { return u.hslFromRGB( red, green, blue )[2]; },
		percRed = function () { return u.getPercent( red ); },
		percGreen = function () { return u.getPercent( green ); },
		percBlue = function () { return u.getPercent( blue ); },
		options = {
			getSizeByElement: true,
			width: 500,
			height: 477.67,
			mouseInvert: false,
			colorChangeDelay: 20,
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 0,
			fontFamily: "sans-serif",
			circleStrokeWidth: 2,
			rgbRelFontSize: 0.15,
			colorBg: true,
			rgbText: true,
			rgbTextPosition: 0.1,
			hexText: true,
			hslText: false,
			hexHslRelFontSize: 0.08,
			hexHslTextShiftX: 0,
			hexHslTextShiftY: 0
		};

	this.init = function () {
		var elId = eid || "farba";
		box = document.querySelector( "#" + elId );
		if ( box ) {
			setOptions( box );
			canvas = buildCanvas( options );
			ctx = canvas.getContext( "2d" );
			circles = new oCircles( canvas.width );
			itexts = new infTexts( circles );
			updateCanvas( ctx, circles, itexts  );
			setEventListeners();
		}
	};

	this.getRed = function () { return red; };
	this.getGreen = function () { return green; };
	this.getBlue = function () { return blue; };
	this.getHue = function () { return hue(); };
	this.getSaturation = function () { return saturation(); };
	this.getLightness = function () { return lightness(); };
	this.getRGB = function () { return "rgb("+red+","+green+","+blue+")"; };
	this.getPercentRGB = function () { return "rgb("+percRed()+"%,"+percGreen()+"%,"+percBlue()+"%)"; };
	this.getHex = function ( withHash ) {
		return ( withHash ) ? "#" + hex() : hex();
	};
	this.getHSL = function () { return "hsl("+hue()+","+saturation()+"%,"+lightness()+"%)"; };

	function getFont( r, rgb ) {
		var factor = ( rgb ) ? options.rgbRelFontSize : options.hexHslRelFontSize,
			size = factor*r;
		return size + "px " + options.fontFamily;
	}

	function setOptions( elem ) {
		var dataOpts, jsonOpts = elem.getAttribute("data-farba-options");
		if ( jsonOpts ) {
			try {
				dataOpts = JSON.parse( unescape( jsonOpts ) );
			}catch (e) {
				dataOpts = false;
			}
		}
		if ( dataOpts && u.isObject( dataOpts ) && u.isNotEmpty( dataOpts ) ) {
			checkSetOptions( dataOpts );
		}
		if ( foptions && u.isObject( foptions ) && u.isNotEmpty( foptions ) ) {
			checkSetOptions( foptions );
		}
		if ( options.getSizeByElement && box.clientHeight ) {//height to width >>>> 2.866 to 3
				options.width = box.clientWidth;
				options.height = box.clientHeight;
		}
	}

	function checkSetOptions( opts ) {
		for ( var key in opts ) {
			if ( options.hasOwnProperty( key ) ) {
				if ( typeof options[key] === typeof opts[key] ) {
					options[key] = opts[key];
				}
			}
		}
	}

	function buildCanvas( opts ) {
		var cnv = document.createElement( "canvas" );
			cnv.height = opts.height;
			cnv.width = opts.width;
			box.appendChild( cnv );
			return cnv;
	}

	function drawCircle( ctx, x, y, r, st, sst ) {
		ctx.beginPath();
		ctx.arc( x, y, r, 0*Math.PI, 2*Math.PI );
		ctx.fillStyle = st;
		ctx.fill();
		if ( sst && options.circleStrokeWidth ) { ctx.strokeStyle = sst; ctx.stroke(); }
	}

	function oCircles( w ) {
		var ptop = w*options.paddingTop/100,
			pleft = w*options.paddingLeft/100,
			pright = w*options.paddingRight/100,
			r = ( w - pleft - pright )/3,
			topleft = u.setLeftTop( canvas ),
			b = r*Math.sqrt( 3 )/2;
		this.red = { x: r+pleft, y: r+b+ptop, color: "rgb(255,0,0)" };
		this.blue = { x: 2*r+pleft, y: r+b+ptop, color: "rgb(0,0,255)" };
		this.green = { x: r+r/2+pleft, y: r+ptop, color: "rgb(0,255,0)" };
		this.left = topleft.left;
		this.top = topleft.top;
		this.radius = r;
		this.stokeWidth = Math.round( r*options.circleStrokeWidth/100 );
		this.center = { x: r+r/2+pleft, y: r+2*b/3+ptop },
		this.radiuses = { r1: b/2, r2: 2*b/3, r3: b/3+b, r4: 2*b/3+r  };
	}

	function infTexts( c ) {
		var r = c.radius,
			l = options.rgbTextPosition*r,
			rCenter = c.red,
			gCenter = c.green,
			bCenter = c.blue;
		this.rStart = { x: rCenter.x-l, y: rCenter.y+l  };
		this.gStart = { x: gCenter.x, y: gCenter.y-2*l  };
		this.bStart = { x: bCenter.x+l, y: bCenter.y+l  };
		this.rgbFont = getFont( r, true );
		this.hexFont = getFont( r );
		this.underlay = getUnderlay( this.hexFont, c.center, r );
	}

	function updateCanvas ( contx, o, t ) {
		contx.globalCompositeOperation="lighter";
		contx.lineWidth = o.stokeWidth;
		var r = o.radius;
		contx.clearRect( 0, 0, canvas.width, canvas.height );
		drawCircle( contx, o.red.x, o.red.y, r, o.red.color, "#FFFFFF" );
		drawCircle( contx, o.blue.x, o.blue.y, r, o.blue.color, "#FFFFFF" );
		drawCircle( contx, o.green.x, o.green.y, r, o.green.color, "#FFFFFF" );
		drawInform( contx, o, t );
		contx.globalCompositeOperation="destination-over";
		if ( options.colorBg ) { drawBg( contx ); }
		contx.globalCompositeOperation="source-over";
	}

	function getUnderlay ( font, center, r ) {
		ctx.font = font;
		var obj = {},
			ops = options,
			l = ( !ops.hslText ) ? ( ctx.measureText( "#888888" ).width ) : ( ctx.measureText( "Saturation: 100%" ).width ),
			h = parseInt( font, 10 );
		obj.centX = center.x + ( ops.hexHslTextShiftX*r );
		obj.centY = center.y + ( ops.hexHslTextShiftY*r );
		if ( !ops.hexText && !ops.hslText ) {
			return false;
		}else if ( ops.hexText && ops.hslText ) {
			obj.h = h*5.6;
			obj.hexY = obj.centY - h*1.8;
			obj.huY = obj.centY - h*0.6;
			obj.saY = obj.centY + h*0.6;
			obj.ltY = obj.centY + h*1.8;
		}else if ( ops.hexText && !ops.hslText ) {
			obj.h = h*1.4;
			obj.hexY = obj.centY;
		}else {
			obj.h = h*4.2;
			obj.huY = obj.centY - h*1.2;
			obj.saY = obj.centY;
			obj.ltY = obj.centY + h*1.2;
		}
		obj.l = 1.2*l;
		obj.y = obj.centY - obj.h/2;
		obj.x = obj.centX - obj.l/2;
		return obj;
	}

	function drawInform( ctx, o, t ) {
		var hcolor, und, hu, sa ,lt,
			invRd = 255 - red,
			invGr= 255 - green,
			invBl = 255 - blue;
		if ( !drawInform.rgbFont ) { drawInform.rgbFont = ctx.font; }
		if ( options.rgbText ) {
			ctx.font = t.rgbFont;
			ctx.textBaseline = "top";
			ctx.textAlign = "start";
			ctx.fillStyle = ( blue<125 ) ? "rgb(0,0,"+invBl+")" : "#FFF";
			ctx.fillText( "Blue: " + blue, t.bStart.x, t.bStart.y );
			ctx.textAlign = "end";
			ctx.fillStyle = ( red<125 ) ? "rgb("+invRd+",0,0)" : "#FFF";
			ctx.fillText( "Red: " + red, t.rStart.x, t.rStart.y );
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			ctx.fillStyle = ( green<125 ) ? "rgb(0,"+invGr+",0)" : "#FFF";
			ctx.fillText( "Green: " + green, t.gStart.x, t.gStart.y );
		}
		if ( options.hexText || options.hslText ) {
			und = t.underlay;
			ctx.globalCompositeOperation = "source-over";
			ctx.font = t.hexFont;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "#FFF";
			ctx.fillRect( und.x, und.y, und.l, und.h );
			ctx.fillStyle = "#000";
			if ( options.hexText ) {
				hcolor = hex();
				ctx.fillText( "#" + hcolor, und.centX, und.hexY );//set line y );
			}
			if ( options.hslText ) {
				if ( !drawInform.degreeSign ) {
					drawInform.degreeSign = String.fromCharCode( parseInt( "00B0", 16 ) );
				}
				hu = hue();
				sa = saturation();
				lt = lightness();
				ctx.fillText( "Hue: " + hu + drawInform.degreeSign, und.centX, und.huY );
				ctx.fillText( "Saturation: " + sa + "%", und.centX, und.saY );
				ctx.fillText( "Lightness: " + lt + "%", und.centX, und.ltY );
			}
		}
	}

	function drawBg( ctx ) {
		ctx.fillStyle = "rgb("+red+","+green+","+blue+")";
		ctx.fillRect( 0, 0, options.width, options.height );
	}

	function setEventListeners() {
		resetLeftTop();
		u.addListener( window, "resize", resizeHandler );
		u.addListener( canvas, "mousedown", mDHandler );
		u.addListener( canvas, "mouseup", mUHandler );
		u.addListener( canvas, "contextmenu", mCMHandler );
	}

	function removeAllListeners() {
		u.removeListener( window, "resize", resizeHandler );
		u.removeListener( canvas, "mousedown", mDHandler );
		u.removeListener( canvas, "mouseup", mUHandler );
		u.removeListener( canvas, "contextmenu", mCMHandler );
	}

	function resizeHandler(event) {
			removeAllListeners();
			setEventListeners();
	}

	function resetLeftTop() {
		var topleft = u.setLeftTop( canvas );
		circles.left = topleft.left;
		circles.top = topleft.top;
	}

	function mCMHandler(event) {
		var e = u.fixEvent( event );
		e.preventDefault();
	}

	function mDHandler(event) {
		var e = u.fixEvent( event ),
			x = e.pageX,
			y = e.pageY,
			x1 = x - circles.left,
			y1 = y - circles.top;
			whatRGB = checkColor( x1, y1 ),
			cspeed = ( e.button ) ? 1 : -1;
			if ( options.mouseInvert ) { cspeed *= -1; }
		clock = true;
			changeColor( whatRGB, cspeed, false );
			updateCanvas( ctx, circles, itexts  );
		setTimeout( function(){
			if ( clock ) {
				changeColor( whatRGB, cspeed, options.colorChangeDelay );
			}
		}, 500 );
	}

	function checkColor( x, y ) {
		var c = circles, r = c.radius, arr = [ false, false, false ],
			inRadius = function( pivX, pivY ) {
				var deltaX = pivX - x,
					deltaY = pivY - y,
					hyp = Math.sqrt( Math.pow( deltaX, 2 ) + Math.pow( deltaY, 2 ) );
				return  hyp < r;
			};
		if ( inRadius( c.red.x, c.red.y ) ) { arr[0] = true; }
		if ( inRadius( c.green.x, c.green.y ) ) { arr[1] = true; }
		if ( inRadius( c.blue.x, c.blue.y ) ) { arr[2] = true; }
		return arr;
	}

	function mUHandler(event) {
		clock = false;
	}

	function changeColor( tests, cs, d ) {
		var r, g, b;
		if ( tests[0] ) {
			r = red + cs;
			red = u.colorLim( r );
			circles.red.color = "rgb(" + red + ",0,0)";
		}
		if ( tests[1] ) {
			g = green + cs;
			green = u.colorLim( g );
			circles.green.color = "rgb(0," + green + ",0)";
		}
		if ( tests[2] ) {
			b = blue + cs;
			blue = u.colorLim( b );
			circles.blue.color = "rgb(0,0," + blue + ")";
		}
		if ( clock && d ) {
			setTimeout( function(){
				updateCanvas( ctx, circles, itexts  );
				changeColor( tests, cs, d );
			}, d );
		}
	}

}