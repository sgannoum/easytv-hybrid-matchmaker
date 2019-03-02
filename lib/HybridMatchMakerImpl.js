

const STMM_URL = "http://160.40.49.218:8077/match";
const RBMM_URL = "http://160.40.49.218:8080/EasyTV_RBMM_Restful_WS/RBMM/match";

const STMM_http_request = require('request');
const RBMM_http_request = require('request');
const weigths = [0.7, 0.3]


const lanuages = ["ENGLISH", "SPANISH", "CATALAN", "GREEK", "ITALIAN", "EN", "SP", "CA", "GR", "IT"];
const colorBlindness = [ "normal", "deuteranomaly" ,"deuteranopia","protanomaly","protanopia","tritanomaly","tritanopia"];

/**
 * ColorBlindess converter functions
 */
const colorBlindnessConverter = {
		toNum: function (cond) {			
			return colorBlindness.indexOf(cond.toLowerCase());
		},
		toStr: function(num){
			return colorBlindness[num];
		}
	}

/**
 * language converter functions
 */
const languageConverter = {
	toNum: function (lan) {	
		return lanuages.indexOf(lan.toUpperCase());
	},
	toStr: function(num){
		return lanuages[num];
	}
}

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
		    return "#" + colorConverter.componentToHex(parseInt(rgb[0], 10)) + colorConverter.componentToHex(parseInt(rgb[1], 10)) + colorConverter.componentToHex(parseInt(rgb[2], 10));
		}
}

/**
 * boolean converter functions
 */
const booleanConverter = {
		toNum: function (bool) {		
			return bool ? 1 : 0;
		},
		toStr: function(num){
			return num == 1 ? true : false;
		}
}

/**
 * mapping of perferences to converter function
 */
const numericConverters = {	
		//boolean preferences
		"https://easytvproject.eu/registry/application/cs/accessibility/textDetection": booleanConverter.toNum,
		"https://easytvproject.eu/registry/application/cs/accessibility/faceDetection": booleanConverter.toNum,
		"https://easytvproject.eu/registry/application/cs/audio/audioDescription": booleanConverter.toNum, 
		"https://easytvproject.eu/registry/application/cs/cc/audioSubtitles": booleanConverter.toNum, 				

		//language perferences
		"https://easytvproject.eu/registry/common/subtitles": languageConverter.toNum,
		"https://easytvproject.eu/registry/common/signLanguage": languageConverter.toNum, 
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/language": languageConverter.toNum, 
		"https://easytvproject.eu/registry/application/cs/audio/track": languageConverter.toNum, 
		"https://easytvproject.eu/registry/common/audioLanguage": languageConverter.toNum,
		"https://easytvproject.eu/registry/application/tts/language": languageConverter.toNum,
		
		//color perferences
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor": colorConverter.toNum,
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/backgroundColor": colorConverter.toNum,
		"https://easytvproject.eu/registry/common/fontColor": colorConverter.toNum, 
		"https://easytvproject.eu/registry/common/backgroundColor": colorConverter.toNum};

/**
 * mapping of perferences to converter function
 */
const numericToInitial = {	
		//boolean preferences
		"https://easytvproject.eu/registry/application/cs/accessibility/textDetection": booleanConverter.toStr,
		"https://easytvproject.eu/registry/application/cs/accessibility/faceDetection": booleanConverter.toStr,
		"https://easytvproject.eu/registry/application/cs/audio/audioDescription": booleanConverter.toStr, 
		"https://easytvproject.eu/registry/application/cs/cc/audioSubtitles": booleanConverter.toStr, 				

		//language perferences
		"https://easytvproject.eu/registry/common/subtitles": languageConverter.toStr,
		"https://easytvproject.eu/registry/common/signLanguage": languageConverter.toStr, 
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/language": languageConverter.toStr, 
		"https://easytvproject.eu/registry/application/cs/audio/track": languageConverter.toStr, 
		"https://easytvproject.eu/registry/common/audioLanguage": languageConverter.toStr,
		"https://easytvproject.eu/registry/application/tts/language": languageConverter.toStr,
		
		//color perferences
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor": colorConverter.toStr,
		"https://easytvproject.eu/registry/application/cs/cc/subtitles/backgroundColor": colorConverter.toStr,
		"https://easytvproject.eu/registry/common/fontColor": colorConverter.toStr, 
		"https://easytvproject.eu/registry/common/backgroundColor": colorConverter.toStr};



const HBMM_functions = {
	
	hybridPreferences : function (stmmRes, rbmmRes, user_profile) {
		var new_user_profile = JSON.parse(JSON.stringify(user_profile))
		var stmmPrefs = stmmRes.user_preferences.default.preferences
		var rbmmPrefs = rbmmRes.user_preferences.default.preferences
		
		var newPrefs = new_user_profile.user_preferences.default.preferences
		for(stmmPref in stmmPrefs)
			if(stmmPref in rbmmPrefs){
				newPrefs[stmmPref] = HBMM_functions.hybridPreference(stmmPref, stmmPrefs, rbmmPrefs)
			} else {
				newPrefs[stmmPref] = stmmPrefs[stmmPref]
			}
		
		for(rbmmPref in rbmmPrefs)
			if(!(rbmmPref in stmmPrefs)){
				newPrefs[rbmmPref] = rbmmPrefs[rbmmPref]
			}
		
		return JSON.stringify(new_user_profile);
	},
	/**
	 * 
	 */
	hybridPreference : function(pref, stmmPrefs, rbmmPrefs) {
			var points = []	
			var hybridPoints = undefined
			
			if(pref in numericConverters){
				//invoke converter function
				stmmPoints = points.concat(numericConverters[pref](stmmPrefs[pref]))
				rbmmPoints = points.concat(numericConverters[pref](rbmmPrefs[pref]))
				
				if(Array.isArray(stmmPoints)){
					hybridPoints = []
					for(i in stmmPoints){
						hybridPoints.push(stmmPoints[i]*weigths[0] + rbmmPoints[i]*weigths[1])
					}
				} else{
					hybridPoints = stmmPoints
				}
				
				//convert to initial format
				return numericToInitial[pref](hybridPoints)
			} else {
				hybridPoints = stmmPrefs[pref]*weigths[0] + rbmmPrefs[pref]*weigths[1]
			}
			
			//convert to string
			return hybridPoints

	},
	handlerCreator: function (request, responses, user_profile) {
		return (err, res, body) => {

			if(!("user_preferences" in body))
				return 
				
			responses.push(body)
			//when two responses are obtained...process the results
			if(responses.length == 2) {
				var hybridProfile = HBMM_functions.hybridPreferences(responses[0], responses[1], user_profile)
				request.events.onSuccess.fire(hybridProfile);
			}
		}
	},
	hybridInference: function (request, user_profile) {
		var responses = []

		STMM_http_request.post(STMM_URL, { json: user_profile }, HBMM_functions.handlerCreator(request, responses, user_profile));
		RBMM_http_request.post(RBMM_URL, { json: user_profile }, HBMM_functions.handlerCreator(request, responses, user_profile));
	}
}


//Export these functions
module.exports = HBMM_functions