/**
 * 
 */
const assert = require('assert');

var RBMM_user_profile = JSON.parse("{" + 
		"			\"user_preferences\": {" + 
		"                \"default\": {" + 
		"                    \"preferences\": {" + 
		"                        \"http://registry.easytv.eu/common/volume\": 10," + 
		"                        \"http://registry.easytv.eu/common/contrast\": 100," + 
		"                        \"http://registry.easytv.eu/application/control/voice\": false," + 
		"                        \"http://registry.easytv.eu/application/cs/audio/track\": \"ca\"," + 
		"                        \"http://registry.easytv.eu/application/tts/audio/voice\": \"female\"," + 
		"                        \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#ffffff\"" + 
		"                    }" + 
		"                }" + 
		"            }" + 
		"}");

var STMM_user_profile = JSON.parse("{        " + 
		"            \"user_preferences\": {" + 
		"                \"default\": {" + 
		"                    \"preferences\": {" + 
		"                        \"http://registry.easytv.eu/common/volume\": 8," + 
		"                        \"http://registry.easytv.eu/common/contrast\": 100," + 
		"                        \"http://registry.easytv.eu/application/control/voice\": true," + 
		"                        \"http://registry.easytv.eu/application/cs/audio/track\": \"en\"," + 
		"                        \"http://registry.easytv.eu/application/tts/audio/voice\": \"male\"," + 
		"                        \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#ffffff\"" + 
		"                    }" + 
		"                }" + 
		"            }" + 
		"}");

var user_profile = JSON.parse("{        " + 
		"            \"user_preferences\": {" + 
		"                \"default\": {" + 
		"                    \"preferences\": {" + 
		"                        \"http://registry.easytv.eu/common/volume\": 20," + 
		"                        \"http://registry.easytv.eu/common/contrast\": 100," + 
		"                        \"http://registry.easytv.eu/application/control/voice\": true," + 
		"                        \"http://registry.easytv.eu/application/cs/audio/track\": \"en\"," + 
		"                        \"http://registry.easytv.eu/application/tts/audio/voice\": \"male\"," + 
		"                        \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#ffffff\"" + 
		"                    }" + 
		"                }" + 
		"            }" + 
		"}");

var HBMMImpl = require('../lib/HybridMatchMakerImpl').HBMMImpl
var hybridMM = require('../lib/HybridMatchMakerImpl').hbmmImpl

function test_hybridPreferences(){
	var user_id = 1
	var hybridProfile = hybridMM.personalize_profile(user_id , user_profile, STMM_user_profile, RBMM_user_profile)
	
	var prefs1 = user_profile.user_preferences.default.preferences	
	var prefs2 = hybridProfile.user_preferences.default.preferences
	
	//check hybrid preference
	assert (prefs2["http://registry.easytv.eu/common/volume"] == 9, "hybrid preference must be " + 9);

	
	//update weights
	hybridMM.update_user_weights(user_id , user_profile)
	
}

//test_hybridPreference();
test_hybridPreferences();