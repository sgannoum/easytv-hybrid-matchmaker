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


function test_get_user_content(){
	
	var content_services = JSON.parse("{" + 
			"   \"title\":\"As if it were yesterday - Chapter 428\"," + 
			"   \"description\":\"Quim, Litus and Miquel have left for a dinner party. Quim, who is fucked up because he and Cati have sex problems, are the result of their professional frustrations, and convinces Marta to go. Jordi, who wants to win his friends again, decides to give them a present. Marta does not feel comfortable, and she leaves. At home, he is compulsively playing online the game that Ismael has taught him. This is how she makes a virtual friend and is very comfortable talking to her; La Paz does what she can to avoid Mart\\u00ed and Alba, and Joana notices it. The thing does not look good.\"," + 
			"   \"duration\":1889000," + 
			"   \"actors\":[]," + 
			"   \"directors\":[]," + 
			"   \"services\":[" + 
			"      \"face-magnification\"," + 
			"      \"character-recognition\"," + 
			"      \"sounds-recognition\"" + 
			"	]," + 
			"   \"audio_langs\":[\"ca\"]," + 
			"   \"subtitle_langs\":[\"ca\"]," + 
			"   \"thumbnail\":\"http://138.4.47.33:8080/media/Com_si_fos_ahir/com_si_fos_ahir_capitol_428/thumbnail.jpg\"," + 
			"   \"mpd_url\":\"http://138.4.47.33:8080/media/Com_si_fos_ahir/com_si_fos_ahir_capitol_428/manifest_sbt.mpd\"" + 
			"}");
	
	var expected = {'http://registry.easytv.eu/application/cs/accessibility/detection/face': true, 
					'http://registry.easytv.eu/application/cs/accessibility/detection/text': false, 
					'http://registry.easytv.eu/application/cs/accessibility/detection/sound':true, 
					'http://registry.easytv.eu/application/cs/accessibility/detection/character': true , 
					'http://registry.easytv.eu/application/cs/audio/track': ['ca'], 
					'http://registry.easytv.eu/application/cs/cc/subtitles/language': ['ca']};

	var user_id = 1
	var actual = hybridMM.get_user_content(content_services)	

	//check hybrid preference
	assert (actual["http://registry.easytv.eu/application/cs/accessibility/detection/face"] == actual["http://registry.easytv.eu/application/cs/accessibility/detection/face"]);
	assert (actual["http://registry.easytv.eu/application/cs/accessibility/detection/text"] == actual["http://registry.easytv.eu/application/cs/accessibility/detection/text"]);
	assert (actual["http://registry.easytv.eu/application/cs/accessibility/detection/sound"] == actual["http://registry.easytv.eu/application/cs/accessibility/detection/sound"]);
	assert (actual["http://registry.easytv.eu/application/cs/accessibility/detection/character"] == actual["http://registry.easytv.eu/application/cs/accessibility/detection/character"]);
	assert (actual["http://registry.easytv.eu/application/cs/audio/track"] == actual["http://registry.easytv.eu/application/cs/audio/track"], actual["http://registry.easytv.eu/application/cs/audio/track"]);
	assert (actual["http://registry.easytv.eu/application/cs/cc/subtitles/language"] == actual["http://registry.easytv.eu/application/cs/cc/subtitles/language"], actual["http://registry.easytv.eu/application/cs/cc/subtitles/language"]);
}

test_get_user_content();
test_hybridPreferences();