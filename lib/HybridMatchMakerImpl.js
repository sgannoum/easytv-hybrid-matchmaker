
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
		
		//combine preferences
		for(var [key, value] of this._dimensions) {

			if(key in stmmPrefs && key in rbmmPrefs) {
				//combine both preferences based on these weights
				newPrefs[key] = value.combine(stmmPrefs[key], rbmmPrefs[key], user_weigths)
			}
			else if(key in stmmPrefs) {
				newPrefs[key] = stmmPrefs[key]
			}
			else if(key in rbmmPrefs){
				newPrefs[key] = rbmmPrefs[key]
			}
		}
		
		//add RBMM recommanded preferences
		if("recommanded_preferences" in rbmmRes){
			new_user_profile["recommanded_preferences"] = rbmmRes["recommanded_preferences"]
		}
		
		//update entry
		user_entry.set_stmm_profile(stmmRes)
		user_entry.set_rbmm_profile(rbmmRes)
		this.usersInfoHandler.update_entry(user_id, user_entry)

		console.log('user['+user_id+']: ',' personalize profile')

		return new_user_profile;
	}
	
	
/*	*//**
	 * Given the user current profile update the user associated weights
	 *//*
	update_user_weights(user_id, user_profile) {
		
		//Get user associated weights
		var user_entry = this.usersInfoHandler.get_entry(user_id)
		var user_weigths = user_entry.get_user_weights()
		
		
		//Get user preferences
		var stmmPrefs = user_entry.get_stmm_profile().user_preferences.default.preferences
		var rbmmPrefs = user_entry.get_rbmm_profile().user_preferences.default.preferences	
		var prefs = user_profile.user_preferences.default.preferences
		
		//calculate similarity with the current profile
		var stmm_similarity = this.similarityDistance.compute(stmmPrefs, prefs)
		var rbmm_similarity = this.similarityDistance.compute(rbmmPrefs, prefs)

		//update weights
		if(stmm_similarity > rbmm_similarity && user_weigths[0] + DELTA_WEIGHT <= 1){
			user_weigths[0] += DELTA_WEIGHT
			user_weigths[1] -= DELTA_WEIGHT

		} else if(stmm_similarity < rbmm_similarity && user_weigths[1] + DELTA_WEIGHT <= 1){
			user_weigths[1] += DELTA_WEIGHT
			user_weigths[0] -= DELTA_WEIGHT
		}
		
		//console.log('user['+user_id+']: ','Similarity to STMM & RBMM profiles: ', stmm_similarity,  rbmm_similarity, ' new Weigths: ', user_weigths)

		console.log('user['+user_id+']: ',' update weigths: ', user_weigths)
		
		//update entry
		user_entry.set_user_weights(user_weigths)
		this.usersInfoHandler.update_entry(user_id, user_entry)

	}*/
	
	/**
	 * Given a set of default preferences calculate the similarites
	 */
	update_user_weights(user_id, user_preferences) {
		
		//Get user associated weights
		var user_entry = this.usersInfoHandler.get_entry(user_id)
		var user_weigths = user_entry.get_user_weights()
		
		//Get user preferences
		var stmmPrefs = user_entry.get_stmm_profile().user_preferences.default.preferences
		var rbmmPrefs = user_entry.get_rbmm_profile().user_preferences.default.preferences	

		//calculate similarity with the current profile
		var stmm_similarity = this.similarityDistance.compute(stmmPrefs, user_preferences)
		var rbmm_similarity = this.similarityDistance.compute(rbmmPrefs, user_preferences)

		//update weights
		if(stmm_similarity > rbmm_similarity && user_weigths[0] + DELTA_WEIGHT <= 1){
			user_weigths[0] += DELTA_WEIGHT
			user_weigths[1] -= DELTA_WEIGHT

		} else if(stmm_similarity < rbmm_similarity && user_weigths[1] + DELTA_WEIGHT <= 1){
			user_weigths[1] += DELTA_WEIGHT
			user_weigths[0] -= DELTA_WEIGHT
		}
		
		//console.log('user['+user_id+']: ','Similarity to STMM & RBMM profiles: ', stmm_similarity,  rbmm_similarity, ' new Weigths: ', user_weigths)

		console.log('user['+user_id+']: ',' update weigths: ', user_weigths)
		
		//update entry
		user_entry.set_user_weights(user_weigths)
		this.usersInfoHandler.update_entry(user_id, user_entry)
	}
	
	/**
	 * Hybrid inference for context adaptation
	 */
	personalize_context (user_id, user_profile, user_context, stmmRes, rbmmRes) {
		
		console.log('user['+user_id+']: ',' personalize context: ')

		return hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
	}
	
	/**
	 * Hybrid inference for content adaptation
	 */
	personalize_content (user_id, user_profile, user_context, user_content, stmmRes, rbmmRes) {
		
		console.log('user['+user_id+']: ',' personalize content: ')

		return hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
	}
	
	/**
	 * Handle MPD file content
	 */
	__mpdParser (mpd_content) {	
	
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

var UsersInfoHandler = require("./UsersInfoHandler.js");
var hybrid = require("../lib/HybridMatchMakerData.js");
var similarityDistance = require("../lib/SimilarityDistance.js");

var hbmmImpl = new HBMMImpl(hybrid.dimensionsHandlers, new similarityDistance(hybrid.dimensionsHandlers), UsersInfoHandler.instance)

//Export singltone
module.exports.hbmmImpl = hbmmImpl

//Export these functions
module.exports.HBMMImpl = HBMMImpl

