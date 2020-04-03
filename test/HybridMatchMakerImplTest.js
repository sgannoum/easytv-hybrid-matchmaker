/**
 * 
 */
const assert = require('assert');

var RBMM_user_profile = JSON.parse("{" + 
		"\"user_preferences\": {" + 
		"        \"default\": {\"preferences\": {}}," + 
		"        \"recommendations\": {\"preferences\": {" +
		"                    \"http://registry.easytv.eu/common/volume\": 50," + 
		"                    \"http://registry.easytv.eu/common/contrast\": 20," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/low/pass/qFactor\": 0.9," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/high/pass/qFactor\": 1.1," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#2170BB\"," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles\": true," + 
		"                    \"http://registry.easytv.eu/application/tts/audio/language\": \"IT\"," + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/size\": \"15\"" + 
		"		}}}}");

var STMM_user_profile = JSON.parse("{" + 
		"        \"user_preferences\": {" + 
		"        \"default\": {\"preferences\": {}}," + 
		"        \"recommendations\": {\"preferences\": {" +
		"                    \"http://registry.easytv.eu/common/volume\": 20," + 
		"                    \"http://registry.easytv.eu/common/contrast\": 20," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/low/pass/qFactor\": 0.9," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/high/pass/qFactor\": 1.1," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#2170BB\"," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles\": true," + 
		"                    \"http://registry.easytv.eu/application/tts/audio/language\": \"IT\"," + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/size\": \"15\"" + 
		"       }}}}");

var user_profile = JSON.parse("{" + 
		"		\"user_preferences\": {" + 
		"			\"default\": {\"preferences\": {" + 
		"                    \"http://registry.easytv.eu/common/volume\": 20," + 
		"                    \"http://registry.easytv.eu/common/contrast\": 20," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/low/pass/qFactor\": 0.9," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/high/pass/qFactor\": 1.1," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#2170BB\"," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles\": true," + 
		"                    \"http://registry.easytv.eu/application/tts/audio/language\": \"IT\"," + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/size\": \"15\"" + 
		"		}}}}");

var expected = JSON.parse("{" + 
		"		\"user_preferences\": {" + 
		"			\"default\": {\"preferences\": {" + 
		"                    \"http://registry.easytv.eu/common/volume\": 20," + 
		"                    \"http://registry.easytv.eu/common/contrast\": 20," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/low/pass/qFactor\": 0.9," + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/high/pass/qFactor\": 1.1," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#2170BB\"," + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles\": true," + 
		"                    \"http://registry.easytv.eu/application/tts/audio/language\": \"IT\"," + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/size\": \"15\"" + 
		"		}}}}");

var HBMMImpl = require('../lib/HybridMatchMakerImpl').HBMMImpl
var hybridMM = require('../lib/HybridMatchMakerImpl').hbmmImpl

function test_hybridPreferences(){
	var user_id = 1
	var hybridProfile = hybridMM.personalize_profile(user_id , user_profile, STMM_user_profile, RBMM_user_profile)	

	var hybrid_prefs = hybridProfile.user_preferences.recommendations.preferences

	//check hybrid preference
	assert (hybrid_prefs["http://registry.easytv.eu/common/volume"] == 35, hybrid_prefs["http://registry.easytv.eu/common/volume"] + " != " + 35);

	//update weights
	var new_weigths = hybridMM.update_user_weights(user_id , user_profile, STMM_user_profile, RBMM_user_profile, [0.5, 0.5])
}

test_hybridPreferences();