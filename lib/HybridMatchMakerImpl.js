const DELTA_WEIGHT = 0.1

class HBMMImpl {
	
	constructor(preference_dimensions,  context_dimensions, content_dimensions, usersInfoHandler) {
		
		//preference dimensions handler
		this.preference_dimensions = preference_dimensions
		
		//preference similarity
		this.similarityDistance = new similarityDistance(this.preference_dimensions)
		
 		//Get accessibility preferences dimensions 
 		this.context_dimensions = context_dimensions
 		
 		//Get accessibility preferences dimensions 
 		this.content_dimensions = content_dimensions
		
 		//get user handler
		this.usersInfoHandler = usersInfoHandler
		
		
 		//Print dimensions
		console.log("Preference dimensions")
		for (let key of this.preference_dimensions.keys()) 
			  console.log(key); 
		
		console.log()	
		console.log("Context dimensions")
		for (let key of this.context_dimensions.keys()) 
			  console.log(key); 
		
		console.log()
		console.log("Content dimensions")
		for (let key of this.content_dimensions.keys()) 
			  console.log(key); 
	}
	
	/**
	 * Combine both preferences
	 */
	personalize_profile(user_id, user_profile, stmmRes, rbmmRes) {
		
		//Get user associated weights
		var user_entry = this.usersInfoHandler.get_user(user_id)
		var user_weigths = [user_entry.rbmm_weight, user_entry.stmm_weight]
		var new_user_weigths = user_weigths
		
		//Copy user profile
		var new_user_profile = JSON.parse(JSON.stringify(user_profile))
				
		//delete conditional preferences
		delete new_user_profile.user_preferences.conditional
		
		//Get user preferences
		var stmmPrefs = stmmRes.user_preferences.default.preferences
		var stmmRecPrefs = stmmRes.user_preferences.recommendations.preferences		//stmm recommandations
		var rbmmPrefs = rbmmRes.user_preferences.default.preferences	
		var rbmmRecPrefs = rbmmRes.user_preferences.recommendations.preferences		//rbmm recommandations
		var user_profilePrefs = user_profile.user_preferences.default.preferences
		var previouse_user_profilePrefs = user_entry.user_profile.user_preferences.default.preferences

		var newPrefs = {}
		
		var flag = false
		for(var key in previouse_user_profilePrefs)
			if(user_profilePrefs[key] != previouse_user_profilePrefs[key] )
				flag = true
				
		//Update weights only when profile has changed
		if(flag)
			new_user_weigths = this.update_user_weights(user_id, user_profile, user_entry.stmm_profile, user_entry._rbmm_profile, user_weigths)
		
		//combine preferences
		for(var [key, value] of this.preference_dimensions) {
			
		   //priority is for recommanded preferences
			if(key in stmmRecPrefs && key in rbmmRecPrefs) {
				newPrefs[key] = value.combine(stmmRecPrefs[key], rbmmRecPrefs[key], new_user_weigths)
			}
			else if(key in stmmRecPrefs && (user_profilePrefs[key] == undefined || user_profilePrefs[key] != stmmRecPrefs[key])) {
				newPrefs[key] = stmmRecPrefs[key]
			}
			else if(key in rbmmRecPrefs && (user_profilePrefs[key] == undefined || user_profilePrefs[key] != rbmmRecPrefs[key])){
				newPrefs[key] = rbmmRecPrefs[key]
			}		
		}

		//new preferences
		new_user_profile.user_preferences.default.preferences = rbmmPrefs
		new_user_profile.user_preferences.recommendations = {preferences : newPrefs}
		
		//update entry
		user_entry.stmm_weight = new_user_weigths[0]
		user_entry.rbmm_weight = new_user_weigths[1]
		user_entry.stmm_profile = stmmRes 
		user_entry.rbmm_profile = rbmmRes
		user_entry.user_profile = user_profile
		this.usersInfoHandler.update_user(user_id, user_entry)

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
		var rbmmRecPrefs = rbmm_profile.user_preferences.recommendations.preferences
		var prefs = user_profile.user_preferences.default.preferences


		//calculate similarity with the current profile
		var stmm_similarity = this.similarityDistance.compute(stmmPrefs, prefs)
		var rbmm_similarity = this.similarityDistance.compute(rbmmRecPrefs, prefs)

		console.log('[INFO]['+user_id+']: stmm_similarity ',stmm_similarity, ' rbmm_similarity: ', rbmm_similarity)

		//update weights
		if(stmm_similarity > rbmm_similarity && new_user_weigths[0] + DELTA_WEIGHT <= 1){
			new_user_weigths[0] += DELTA_WEIGHT
			new_user_weigths[1] -= DELTA_WEIGHT

		} else if(stmm_similarity < rbmm_similarity && new_user_weigths[1] + DELTA_WEIGHT <= 1){
			new_user_weigths[1] += DELTA_WEIGHT
			new_user_weigths[0] -= DELTA_WEIGHT
		}
		
		console.log('[INFO]['+user_id+']: weigths ',user_weigths, ' updated weigths: ', new_user_weigths)
		
		//update entry
		return new_user_weigths
	}
	
	/**
	 * Hybrid inference for context adaptation
	 */
	personalize_context (user_id, user_profile, stmm_profile, rbmm_profile, user_context) {
		return hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
	}
	
}

var usersInfoHandler = require("./UsersInfoHandler.js").instance;
var hybrid = require('../lib/GENERATED_dimensions_handlers.js');
var similarityDistance = require("../lib/SimilarityDistance.js");

var hbmmImpl = new HBMMImpl(hybrid.preferenceHandlers, hybrid.contextHandlers, hybrid.contentHandlers, usersInfoHandler)

//Export singltone
module.exports.hbmmImpl = hbmmImpl

//Export these functions
module.exports.HBMMImpl = HBMMImpl

