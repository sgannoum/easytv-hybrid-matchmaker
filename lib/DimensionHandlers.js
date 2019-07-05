/**
 * Color converter functions
 */
const colorConverter = {
		toNum: function (hexString){
			var points = [];
			//red
			points.push(parseInt(hexString.substring(1, 3), 16));
			//green
			points.push(parseInt(hexString.substring(3, 5), 16));
			//blue
			points.push(parseInt(hexString.substring(5, 7), 16));

			return points;
		},
		componentToHex: function (c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		},
		toStr: function (rgb) {
		    return "#" + colorConverter.componentToHex(rgb[0]) + colorConverter.componentToHex(rgb[1]) + colorConverter.componentToHex(rgb[2]);
		}
}

/**
 * A dimension representation
 */
class Dimension {
	
	 constructor(missingValue = -1){
		this._missingValue = missingValue;
	 }
	 
	 get missingValue() {
		return this._missingValue;
	 } 
}

/**
 * 
 */
class SymmetricBinary extends Dimension {
	
	  constructor(missingValue = -1) {
		super(missingValue);
	  }
	  
	  combine(a, b, weigths) {
		if(a != b && weigths[0] < weigths[1])
			return b;
		else 	
			return a;
	  }
}

/**
 * Handler of Nominal attribute
 */
class Nominal extends Dimension {
	  constructor(states, missingValue = -1) {
		super(missingValue);
	    this._states = states;
	  }
	  
	  combine(a, b, weigths) {

		if(a != b && weigths[0] < weigths[1])
			return b;
		else 	
			return a;
		
	  }
}

/**
 * Handler of numeric attribute
 */
class Numeric extends Dimension {
	
	  constructor(max, min, missingValue = -1) {
		super(missingValue);
	    this._max = max;
	    this._min = min;
	  }
	  
	  combine(a, b, weigths) {
		return a * weigths[0] + b * weigths[1];
	  }	
}

/**
 * Handler of ordinal attribute
 */
class Ordinal extends Numeric {
	
	  constructor(states, max, min, missingValue = -1) {
		super(max, min, missingValue);
		this._states = states;
	  }
	  
	  combine(a, b, weigths) {

		if(a != b && weigths[0] < weigths[1])
			return b;
		else 	
			return a;
	  }
}

/**
 * Handler of color attribute
 */
class Color extends Dimension {
	
	  constructor(red, green, blue) {
		super(0, 0);
		this._red = red
		this._green = green
		this._blue = blue
	  }
	  
	  combine(a, b, weigths) {
		  
		//convert to numeric
		var na = colorConverter.toNum(a);
		var nb = colorConverter.toNum(b);
		
		//return HEX color
		return colorConverter.toStr([ this._red.combine(na[0], nb[0], weigths),
									  this._green.combine(na[1], nb[1], weigths),
									  this._blue.combine(na[2], nb[2], weigths)
									]);
	  }
}

//Export classes
module.exports.Numeric = Numeric
module.exports.Nominal = Nominal
module.exports.Ordinal = Ordinal
module.exports.Color = Color
module.exports.SymmetricBinary = SymmetricBinary
