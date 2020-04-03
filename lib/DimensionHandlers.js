/**
 * Color converter functions
 */
const colorConverter = {
		toNum: function (hexString){
			var points = [];
			var index = (index = hexString.indexOf("0x")) == -1 ? hexString.indexOf("#") + 1 : index + 2;
			//red
			points.push(parseInt(hexString.substr(index, 2), 16));
			//green
			points.push(parseInt(hexString.substr(index + 2, 2), 16));
			//blue
			points.push(parseInt(hexString.substr(index + 4, 2), 16));
			
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
	
	 combine(a, b, weigths) {
		  
    	if(a == undefined || b == undefined) 
    		throw "Can't combine undefined values"
		  
		if(weigths[0] < weigths[1])
			return b;
		else 	
			return a;
	 }
}

/**
 * Handler of SymmetricBinary attribute
 */
class SymmetricBinary extends Dimension {
	
	  constructor(missingValue = -1) {
		super(missingValue);
	  }

	  dissimilarity(a, b) {
			
		if(a == undefined) return [[0.0, 0.0]];
    	if(b == undefined) return [[0.0, 0.0]];
				
		if(a != b)
			return [[1.0, 1.0]];
		if(a == this._missingValue)
			return [[1.0, 0.0]];
		else 
			return [[0.0, 0.0]];
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
		var ar = (a != undefined && a != this._missingValue) ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
		var br = (b != undefined && b != this._missingValue) ? this._states.indexOf(b.toLowerCase()) : this._missingValue;

		if(ar != br) 
			return [[1.0, 1.0]];
		else if(ar != this._missingValue) 
			return [[1.0, 0.0]];
		
		return [[0.0, 0.0]];
			
	  }
}

/**
 * Handler of MultiNominal attribute, which actually consists of multiple values
 */
class MultiNominal extends Nominal {
	  
	  constructor(length, missingValue = 0) {
			super(missingValue);
			this._length = length;
	  }
	  
	  dissimilarity(a, b) {
		  
			//handle missing value situation
			if(a == this._missingValue && a == b) 
				return [[0.0, 0.0]];
			
			var la = a, lb =  b
			var or = la | lb
			var common = la & lb
			var cindex = 0, dindex = 0

			//no commons
			if(common == 0)
				if (a == b)
					return[[0.0, 0.0]];
				else 
					return[[1.0, 1.0]];

			
			for(var i = 0; i < this._length && common != 0; common /= 2, i++) {
				if((common & 1) == 1) 
					cindex++;
			}
			
			for(var i = 0; i < this._length && or != 0; or /= 2, i++) {
				if((or & 1) == 1) 
					dindex++;
			}
	
			var value = cindex/dindex;		
			return [[1.0, 1 - value]];
	  }
}

/**
 * Handler of numeric attribute
 */
class Numeric extends Dimension {
	
	  constructor(max, min, missingValue = -1) {
		super(missingValue);
		
		if(max == min)
			throw "Unleagal range value for Numeric dimension: [" + min + "..." + max+"]"
			
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
		  
    	if(a == undefined || b == undefined) 
    		throw "Can't combine undefined values"; 
		  
		return a * weigths[0] + b * weigths[1]
	  }	
}

/**
 * Handler of numeric attribute
 */
class DoubleNumeric extends Numeric {
	
	  constructor(max, min, missingValue = -1) {
		super(max, min, missingValue);
	  }
	  
	  combine(a, b, weigths) {
		var val = super.combine(a, b, weigths) * 1.0;
		return val
	  }	
}

/**
 * Handler of numeric attribute
 */
class IntegerNumeric extends Numeric {
	
	  constructor(max, min, missingValue = -1) {
		super(max, min, missingValue);
	  }
	  
	  combine(a, b, weigths) {
		var val = super.combine(a, b, weigths);
		return parseInt(val, 10)
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
     	var na = (a != undefined && a != this._missingValue) ? this._states.indexOf(a.toLowerCase()) : this._missingValue;
		var nb = (b != undefined && b != this._missingValue)  ? this._states.indexOf(b.toLowerCase()) : this._missingValue;
  
		  
		//convert to numeric	  
		var m = this._states.length
		var za = (na - 1) / (m - 1);
		var zb = (nb - 1) / (m - 1);
		
		return super.dissimilarity(za, zb);
	  }
	  
	  combine(a, b, weigths) {
		  
	    	if(a == undefined || b == undefined) 
	    		throw "Can't combine undefined values"; 
			  
			if(weigths[0] < weigths[1])
				return b;
			else 	
				return a;
	  }
}

/**
 * Handler of color attribute
 */
class MultiNumeric extends Numeric {
	
	  constructor(subDimensionsHandler, dimensionBitLength, missingValue = 0) {
		super(missingValue);
		this._subDimensionsHandler = subDimensionsHandler
		this._dimensionBitLength = dimensionBitLength
	  }

	  dissimilarity(a, b) {
		  
		// handle missing value situation
		if(a == this._missingValue && a == b) 
			return [[0.0, 0.0]];
		
		var la = a, lb = b;
		
		// calculate mask
		var mask = Math.pow(2, this._dimensionBitLength) - 1;
		
		// set up dissimilarities result table
		var dissimilarites = [];
		
		for(var i = 0; i < this._subDimensionsHandler.length; i++) {
			// get dimension value
			var tmpa = la & mask;
			var tmpb = lb & mask;

			// shift bits
			la >>= this._dimensionBitLength;
			lb >>= this._dimensionBitLength;
			
			// calculate dissimilarity
			var res = this._subDimensionsHandler[i].dissimilarity(tmpa, tmpb);
			
			// add to results
			dissimilarites.push(res[0]);
		}

		return dissimilarites;
	  }
	  
	  combine(a, b, weigths) {
		  
	    	if(a == undefined || b == undefined) 
	    		throw "Can't combine undefined values"; 
	    	
			var la = a, lb = b;
			
			// calculate mask
			var mask = Math.pow(2, this._dimensionBitLength) - 1;
			
			// set up dissimilarities result table
			var combination = 0;
			
			for(var i = 0; i < this._subDimensionsHandler.length; i++) {
				// get dimension value
				var tmpa = la & mask;
				var tmpb = lb & mask;

				// shift bits
				la >>= this._dimensionBitLength;
				lb >>= this._dimensionBitLength;
				
				// calculate dissimilarity
				var res = this._subDimensionsHandler[i].combine(tmpa, tmpb, weigths);
				
				//shift left
				combination |= res << (this._dimensionBitLength * i)
			}

			return combination;
	  }
}

/**
 * Handler of color attribute
 */
class Color extends Dimension {
	
	  constructor(red, green, blue, missingValue = "0x0") {
		super(missingValue);
		this._red = red
		this._green = green
		this._blue = blue
	  }

	  dissimilarity(a, b) {
		  
		if(a == undefined || a == this._missingValue)
			return [[0.0, 0.0], [0.0, 0.0], [0.0, 0.0]]
		
		if(b == undefined || b == this._missingValue)
			return [[0.0, 0.0], [0.0, 0.0], [0.0, 0.0]]
		  
		//convert to numeric
     	var na = colorConverter.toNum(a) 
		var nb = colorConverter.toNum(b)
		
		var delta_r = this._red.dissimilarity(na[0], nb[0]);
		var delta_g = this._green.dissimilarity(na[1], nb[1]);
		var delta_b = this._blue.dissimilarity(na[2], nb[2]);
				
		return [delta_r[0], delta_g[0], delta_b[0]];
	  }
	  
	  combine(a, b, weigths) {

    	if(a == undefined || b == undefined) 
    		throw "Can't combine undefined values"
		
		//convert to numeric
     	var na = colorConverter.toNum(a) 
		var nb = colorConverter.toNum(b)
			
		//return HEX color
		return colorConverter.toStr([this._red.combine(na[0], nb[0], weigths), 
								 	 this._green.combine(na[1], nb[1], weigths),
								 	 this._blue.combine(na[2], nb[2], weigths),
								 	]);
	  }
}

//Export classes
module.exports.Numeric = Numeric
module.exports.DoubleNumeric = DoubleNumeric
module.exports.IntegerNumeric = IntegerNumeric
module.exports.Nominal = Nominal
module.exports.Ordinal = Ordinal
module.exports.Color = Color
module.exports.SymmetricBinary = SymmetricBinary
module.exports.MultiNominal = MultiNominal
module.exports.MultiNumeric = MultiNumeric