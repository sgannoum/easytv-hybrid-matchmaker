
/**
 * 
 */

const DELTA_WEIGHT = 0.1

class HBMMImpl {
	
	constructor(dimensions, similarityDistance, usersInfoHandler) {
		this._dimensions = dimensions
		this.similarityDistance = similarityDistance
		this.usersInfoHandler = usersInfoHandler
	}
	
	/**
	 * Combine both preferences
	 */
	personalize_profile(user_id, user_profile, stmmRes, rbmmRes) {
		
		//Get user associated weights
		var user_entry = this.usersInfoHandler.get_entry(user_id)
		var user_weigths = user_entry.get_user_weights()
		
		//Copy user profile
		var new_user_profile = JSON.parse(JSON.stringify(user_profile))
				
		//Get user preferences
		var stmmPrefs = stmmRes.user_preferences.default.preferences
		var rbmmPrefs = rbmmRes.user_preferences.default.preferences	
		var newPrefs = new_user_profile.user_preferences.default.preferences
		var rbmmRecPrefs = {}
		
		//get RBMM recommanded preferences
		if("recommanded_preferences" in rbmmRes){
			rbmmRecPrefs= rbmmRes["recommanded_preferences"]
		}
		
		//update weights in relation to the old suggestions
		var new_user_weigths = this.update_user_weights(user_id, user_profile, user_entry.get_stmm_profile(), user_entry.get_rbmm_profile(), user_weigths)
		
		//combine preferences
		for(var [key, value] of this._dimensions) {

			//priority is for recommanded preferences
			if(key in stmmPrefs && key in rbmmRecPrefs) {
				newPrefs[key] = value.combine(stmmPrefs[key], rbmmPrefs[key], new_user_weigths)
			}
			else if(key in stmmPrefs && key in rbmmPrefs) {
				newPrefs[key] = value.combine(stmmPrefs[key], rbmmPrefs[key], new_user_weigths)
			}
			else if(key in stmmPrefs) {
				newPrefs[key] = stmmPrefs[key]
			}
			else if(key in rbmmRecPrefs){
				newPrefs[key] = rbmmRecPrefs[key]
			}
			else if(key in rbmmPrefs){
				newPrefs[key] = rbmmPrefs[key]
			}
		}

		
		//update entry
		user_entry.set_user_weights(new_user_weigths)
		user_entry.set_stmm_profile(stmmRes)
		user_entry.set_rbmm_profile(rbmmRes)
		this.usersInfoHandler.update_entry(user_id, user_entry)

		return new_user_profile;
	}
	
	
	/**
	 * Given the user current profile update the user associated weights
	 */
	update_user_weights(user_id, user_profile, stmm_profile, rbmm_profile, user_weigths) {
		
		//first time suggestion case
		if(stmm_profile == undefined || rbmm_profile == undefined)
			return user_weigths
		
		//copy
		var new_user_weigths = user_weigths.slice()
		
		//Get user preferences
		var stmmPrefs = stmm_profile.user_preferences.default.preferences
		var rbmmPrefs = rbmm_profile.user_preferences.default.preferences	
		var prefs = user_profile.user_preferences.default.preferences
		
		//Merge RBMM recommanded preferences with default ones
		if("recommanded_preferences" in rbmm_profile){
			var rbmmRecPrefs = rbmm_profile["recommanded_preferences"]
			
			//Copy rbmm user preferences
			rbmmPrefs = JSON.parse(JSON.stringify(rbmmPrefs))
			for(var pref in rbmmRecPrefs)
				rbmmPrefs[pref] = rbmmRecPrefs[pref]
		}


		//calculate similarity with the current profile
		var stmm_similarity = this.similarityDistance.compute(stmmPrefs, prefs)
		var rbmm_similarity = this.similarityDistance.compute(rbmmPrefs, prefs)

		//update weights
		if(stmm_similarity > rbmm_similarity && new_user_weigths[0] + DELTA_WEIGHT <= 1){
			new_user_weigths[0] += DELTA_WEIGHT
			new_user_weigths[1] -= DELTA_WEIGHT

		} else if(stmm_similarity < rbmm_similarity && new_user_weigths[1] + DELTA_WEIGHT <= 1){
			new_user_weigths[1] += DELTA_WEIGHT
			new_user_weigths[0] -= DELTA_WEIGHT
		}
		
		console.log('user['+user_id+']: weigths ',user_weigths, ' updated weigths: ', new_user_weigths)
		
		//update entry
		return new_user_weigths

	}
	
	/**
	 * Hybrid inference for context adaptation
	 */
	personalize_context (user_id, user_profile, user_context, stmm_profile, rbmm_profile) {
		return hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
	}
	
	/**
	 * Hybrid inference for content adaptation
	 */
	personalize_content (user_id, user_profile, user_context, user_content, stmm_profile, rbmm_profile) {
		return hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
	}
	
	/**
	 * Handle MPD file content
	 */
	__mpdParser (mpd_content) {

		//parse the MPD file content
		var contentServices = {};
		var parser = require('xml2json');
		var json = parser.toJson(body)
		var mpdObj = JSON.parse(json);
		var periods = mpdObj['MPD']['Period'];

		//convert to array
		if(!Array.isArray(periods)) 
				periods = [periods]

		for(var i = 0; i < periods.length; i++) {
			var period = periods[i]
			var periodId = 1
			
			if(period["start"] != undefined)
				periodId = period["start"]

			if(period["end"] != undefined)
				periodId = period["end"]
			
			if(period["duration"] != undefined)
				periodId = period["duration"]
			
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
					var type =  adaptationSet['mimeType'] == undefined ? adaptationSet['mimType'] : adaptationSet['mimeType'];
					if(type.startsWith('audio/')) 
						contentServices[periodId]['audioLanguage'].push(lang);
					else 
						contentServices[periodId]['subtitilesLanguage'].push(lang);
				}
			}
		}

		var access_services = mpdObj['MPD']['access_services'];
		if(access_services) {
			if(access_services['face_detection'])
				contentServices['face_detection'] = true
				
			if(access_services['text_detection'])
				contentServices['text_detection'] = true
				
			if(access_services['sound_detection'])
				contentServices['sound_detection'] = true
				
			if(access_services['character_recognition'])
				contentServices['character_recognition'] = true
		}
		
		return contentServices;
	}
	
	/**
	 * Convert the user context into a json.
	 */
	__convert_to_json(mpd_content){
		
		var user_content = {
				"http://registry.easytv.eu/application/cs/accessibility/faceDetection": false,
				"http://registry.easytv.eu/application/cs/accessibility/textDetection": false,
				"http://registry.easytv.eu/application/cs/accessibility/soundDetection": false,
				"http://registry.easytv.eu/application/cs/accessibility/characterRecognition": false,
				"http://registry.easytv.eu/application/cs/audio/track": [],
				"http://registry.easytv.eu/application/cs/cc/subtitles/language": [],
		}
		
		var content_map = new Map()
		content_map.put("face_detection", "http://registry.easytv.eu/application/cs/accessibility/faceDetection")
		content_map.put("text_detection", "http://registry.easytv.eu/application/cs/accessibility/textDetection")
		content_map.put("sound_detection", "http://registry.easytv.eu/application/cs/accessibility/soundDetection")
		content_map.put("character_recognition", "http://registry.easytv.eu/application/cs/accessibility/characterRecognition")
		content_map.put("audioLanguage", "http://registry.easytv.eu/application/cs/audio/track")
		content_map.put("subtitilesLanguage", "http://registry.easytv.eu/application/cs/cc/subtitles/language")
		
		for(var key in mpd_content){
			var url = content_map.get(key) 
			user_content[url] = mpd_content[key]
		}
		
	}
	
	/**
	 * Parse mpd file content
	 */
	mp_to_json(mpd_content){
		var json_content = this.__convert_to_json (this.__mpdParser (mpd_content))
		return JSON.parse("{ user_context: {"+json_content+"} }")
	}
}

var UsersInfoHandler = require("./UsersInfoHandler.js");
var hybrid = require("../lib/HybridMatchMakerData.js");
var similarityDistance = require("../lib/SimilarityDistance.js");

var hbmmImpl = new HBMMImpl(hybrid.dimensionsHandlers, new similarityDistance(hybrid.dimensionsHandlers), UsersInfoHandler.instance)

//Export singltone
module.exports.hbmmImpl = hbmmImpl

//Export these functions
module.exports.HBMMImpl = HBMMImpl

