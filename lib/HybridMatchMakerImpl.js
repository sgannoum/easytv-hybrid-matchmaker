
/**
 * 
 */
class HBMMImpl {
	
	constructor(dimensions, weigths) {
		this._dimensions = dimensions
		this._weigths = weigths
	}
	
	/**
	 * Combine both preferences
	 */
	hybridInference (stmmRes, rbmmRes, user_profile) {
		var new_user_profile = JSON.parse(JSON.stringify(user_profile))
		var stmmPrefs = stmmRes.user_preferences.default.preferences
		var rbmmPrefs = rbmmRes.user_preferences.default.preferences	
		var newPrefs = new_user_profile.user_preferences.default.preferences
		
		
		for(var [key, value] of this._dimensions) {
			console.log(key)

			if(key in stmmPrefs && key in rbmmPrefs) {
				//combine both preferences based on these weights
				newPrefs[key] = value.combine(stmmPrefs[key], rbmmPrefs[key], this._weigths)
			}
			else if(key in stmmPrefs) {
				newPrefs[key] = stmmPrefs[key]
			}
			else {
				newPrefs[key] = rbmmPrefs[key]
			}
		}
		
		//add RBMM recommanded preferences
		if("recommanded_preferences" in rbmmRes){
			new_user_profile["recommanded_preferences"] = rbmmRes["recommanded_preferences"]
			
		}
		
		return new_user_profile;
	}
	
	/**
	 * Hybrid inference for content adaptation
	 */
	hybridContentAdaptation (stmmRes, rbmmRes, user_profile) {

		//get MPD file content
		//MPD_http_request.get(user_profile.content,  this.MPD_RequestHandlerCreator(hbmm_req, hbmm_res, user_profile));
	}
	
	/**
	 * Handle MPD file content
	 */
	mpdParser (mpd_content) {	
	
		//parse the MPD file content
		var contentAccessibilityServices = {};
		var parser = require('xml2json');
		var json = parser.toJson(mpd_content)
		var mpdObj = JSON.parse(json);
		var periods = mpdObj['MPD']['Period'];

		//convert to array
		if(!Array.isArray(periods)) 
				periods = [periods]

		//check for audio and language subtitles
		for(var i = 0; i < periods.length; i++) {
			var period = periods[i]
			var periodId = period["duration"] + ' ' + period["start"]
			
			if(!contentServices[periodId])
				contentServices[periodId] = {'audioLanguage': [], 
											 'subtitilesLanguage': []}
			
			var adaptationSets = period['AdaptationSet'];
			if(!Array.isArray(adaptationSets)) 
					adaptationSets = [adaptationSets]
			
			for(var j = 0; j < adaptationSets.length; j++) {
				var adaptationSet = adaptationSets[j]
				var lang =  adaptationSet['lang'];
				
				if(lang) {
					var type =  adaptationSet['mimType'];
					if(type.startsWith('audio/')) 
						contentServices[periodId]['audioLanguage'].push(lang);
					else 
						contentServices[periodId]['subtitilesLanguage'].push(lang);
				}
			}
		}

		//check accessibility services
		var access_services = mpdObj['MPD']['access_services'];
		if(access_services) {
			if(access_services['face_detection'])
				contentAccessibilityServices['face_detection'] = true
				
			if(access_services['text_detection'])
				contentAccessibilityServices['text_detection'] = true
				
			if(access_services['sound_detection'])
				contentAccessibilityServices['sound_detection'] = true
				
			if(access_services['character_recognition'])
				contentAccessibilityServices['character_recognition'] = true
		}
		
		return contentAccessibilityServices
	}
}


//Export these functions
module.exports.HBMMImpl = HBMMImpl