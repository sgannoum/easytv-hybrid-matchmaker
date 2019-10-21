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
	 
	 
	dissimilarity(a, b) {
		
		if(a == undefined) a = this._missingValue;
    	if(b == undefined) b = this._missingValue;
				
		if(a == this._missingValue && a == b) 
			return [[0.0, 0.0]];
		
		return [[1.0, 0.0]];
	}
}

/**
 * 
 */
class SymmetricBinary extends Dimension {
	
	  constructor(missingValue = -1) {
		super(missingValue);
	  }

	  
	  dissimilarity(a, b) {
			
			if(a == undefined) a = this._missingValue;
	    	if(b == undefined) b = this._missingValue;
					
			if(a == this._missingValue && a == b) 
				return [[0.0, 0.0]];
			
			if(a == b)
				return [[1.0, 1.0]];
			else 
				return [[1.0, 0.0]];
	  }
	  
	  
	  combine(a, b, weigths) {
		  
		if(a == undefined) a = this._missingValue;
    	if(b == undefined) b = this._missingValue;
		  
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

	  
	  dissimilarity(a, b) {
		  
			//convert to numeric
			var ar = a != undefined ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
			var br = b != undefined ? this._states.indexOf(b.toLowerCase()) : this._missingValue;

			if(ar != br) 
				return [[1.0, 1.0]];
			else if(ar != this._missingValue) 
				return [[1.0, 0.0]];
			
			return [[0.0, 0.0]];
			
	  }
	  
	  combine(a, b, weigths) {
		  
	   //convert to numeric
		var ar = a != undefined ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
		var br = b != undefined ? this._states.indexOf(b.toLowerCase()) : this._missingValue;

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

	  dissimilarity(a, b) {
		  
	    	if(a == undefined) a = this._missingValue;
	    	if(b == undefined) b = this._missingValue;
			 		  
			if(a == this._missingValue && a == b) 
				return [[0.0, 0.0]];
			
			return [[1.0, Math.abs(a - b)/ (this._max - this._min)]];
	  }	  
	  
	  combine(a, b, weigths) {
		  
    	if(a == undefined) a = this._missingValue;
    	if(b == undefined) b = this._missingValue;  
		  
		return a * weigths[0] + b * weigths[1]
	  }	
}

/**
 * Handler of numeric attribute
 */
class IntegerNumeric extends Numeric {
	
	  constructor(max, min, missingValue = -1) {
		super(missingValue);
		
		if(max == min)
			throw "Unleagal range value for integer dimension: [" + min + "..." + max+"]"
		
	    this._max = max;
	    this._min = min;
	  }
	  
	  combine(a, b, weigths) {
		return parseInt(a * weigths[0] + b * weigths[1], 10)
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

	  dissimilarity(a, b) {
			
			//convert to numeric
	     	var na = a != undefined ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
			var nb = b != undefined ? this._states.indexOf(b.toLowerCase()) : this._missingValue;
	  
			  
			//convert to numeric	  
			var m = this._states.length
			var za = (na - 1) / (m - 1);
			var zb = (nb - 1) / (m - 1);
			
			return super.dissimilarity(za, zb);
	  }
	  
	  combine(a, b, weigths) {

		//convert to numeric
     	var na = a != undefined ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
		var nb = b != undefined ? this._states.indexOf(b.toLowerCase()) : this._missingValue;
    	  
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

	  dissimilarity(a, b) {
		  
			//convert to numeric
	     	var na = a != undefined ? colorConverter.toNum(a) : [this._missingValue, this._missingValue, this._missingValue];
			var nb = b != undefined ? colorConverter.toNum(b) : [this._missingValue, this._missingValue, this._missingValue];
			
			var delta_r = this._red.dissimilarity(na[0], nb[0]);
			var delta_g = this._green.dissimilarity(na[1], nb[1]);
			var delta_b = this._blue.dissimilarity(na[2], nb[2]);
			
			return [ delta_r[0], delta_g[0], delta_b[0]];
	  }
	  
	  combine(a, b, weigths) {
		
		//convert to numeric
	    var na = a != undefined ? colorConverter.toNum(a) : [this._missingValue, this._missingValue, this._missingValue];
		var nb = b != undefined ? colorConverter.toNum(b) : [this._missingValue, this._missingValue, this._missingValue];
			
		//return HEX color
		return colorConverter.toStr([this._red.combine(na[0], nb[0], weigths), 
								 	 this._green.combine(na[1], nb[1], weigths),
								 	 this._blue.combine(na[2], nb[2], weigths),
								 	]);
	  }
}

//Export classes
module.exports.Numeric = Numeric
module.exports.IntegerNumeric = IntegerNumeric
module.exports.Nominal = Nominal
module.exports.Ordinal = Ordinal
module.exports.Color = Color
module.exports.SymmetricBinary = SymmetricBinary
