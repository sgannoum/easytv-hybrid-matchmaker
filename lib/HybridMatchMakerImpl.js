

const STMM_URL = "http://160.40.49.218:8077/STMM/runtime/match";
const RBMM_URL = "http://160.40.49.218:8080/EasyTV_RBMM_Restful_WS/RBMM/match";

const STMM_http_request = require('request');
const RBMM_http_request = require('request');

class HBMMImpl {
	
	constructor(dimensions, weigths) {
		this._dimensions = dimensions
		this._weigths = weigths
	}
	
	hybridPreferences (stmmRes, rbmmRes, user_profile) {
		var new_user_profile = JSON.parse(JSON.stringify(user_profile))
		var stmmPrefs = stmmRes.user_preferences.default.preferences
		var rbmmPrefs = rbmmRes.user_preferences.default.preferences	
		var newPrefs = new_user_profile.user_preferences.default.preferences
		
		for(var [key, value] in this._dimensions) {
			if(key in stmmPrefs && key in rbmmPrefs) {
				//combine both preferences based on these weights
				newPrefs[key] = value.combine(stmmPrefs[key], rbmmPrefs[key], weights)
			}
			else if(key in stmmPrefs) {
				newPrefs[key] = stmmPrefs[key]
			}
			else {
				newPrefs[key] = rbmmPrefs[key]
			}
		}
		
		return JSON.stringify(new_user_profile, null, 4);
	}
	
	/**
	 * A method that return a request handler function
	 */
	RequestHandlerCreator (request, responses, user_profile) {
		var instance = this
		return (err, res, body) => {

			if(!("user_preferences" in body))
					return 
			
			//store the body of the first request
			responses.push(body)
			
			//when two responses are obtained...process the results
			if(responses.length == 2) {
				var hybridProfile = instance.hybridPreferences(responses[0], responses[1], user_profile)
				request.events.onSuccess.fire(hybridProfile);
			}
		}
	}
	
	/**
	 * Hybrid inference
	 */
	hybridInference (request, user_profile) {
		var responses = []

		STMM_http_request.post(STMM_URL, { json: user_profile }, this.RequestHandlerCreator(request, responses, user_profile));
		RBMM_http_request.post(RBMM_URL, { json: user_profile }, this.RequestHandlerCreator(request, responses, user_profile));
	}
}


//Export these functions
module.exports.HBMMImpl = HBMMImpl