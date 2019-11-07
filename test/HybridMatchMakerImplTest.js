/**
 * 
 */
const assert = require('assert');

var RBMM_user_profile = JSON.parse("{\r\n" + 
		"\"user_preferences\": {\r\n" + 
		"        \"default\": {\"preferences\": {\"http://registry.easytv.eu/application/tts/audio/volume\": 50}},\r\n" + 
		"        \"recommendations\": {\"preferences\": {}}\r\n" + 
		"    }\r\n" + 
		"}");

var STMM_user_profile = JSON.parse("{\r\n" + 
		"        \"user_preferences\": {\r\n" + 
		"            \"default\": {\r\n" + 
		"                \"preferences\": {\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/audio/track\": \"EN\",\r\n" + 
		"                    \"http://registry.easytv.eu/common/contrast\": 52,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/bass\": 2,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/ui/language\": \"IT\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/tts/audio/speed\": 25,\r\n" + 
		"                    \"http://registry.easytv.eu/application/tts/audio/voice\": \"female\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/control/voice\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/cc/audio/subtitle\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/ui/audioAssistanceBasedOnTTS\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/detection/character\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/magnification/scale\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/common/content/audio/language\": \"ES\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/detection/text\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/tts/audio/language\": \"EN\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiLanguage\": \"ES\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/audio/volume\": 8,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/enhancement/image/type\": \"face-detection\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/size\": 54,\r\n" + 
		"                    \"http://registry.easytv.eu/common/display/screen/enhancement/cursor/Size\": 1,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/font/color\": \"#2170BB\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/tts/audio/volume\": 1,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/language\": \"IT\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/control/csGazeAndGestureControlType\": \"gesture_control\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/ui/vibration/touch\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/tts/audio/quality\": 7,\r\n" + 
		"                    \"http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiTextSize\": 2,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/cc/subtitles/background/color\": \"#86B7EB\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/highs\": -7,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/sign/language\": \"ES\",\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/detection/sound\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/audio/description\": false,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/audio/eq/mids\": -15,\r\n" + 
		"                    \"http://registry.easytv.eu/common/display/screen/enhancement/cursor/color\": \"#66CE66\",\r\n" + 
		"                    \"http://registry.easytv.eu/common/volume\": 49,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/accessibility/magnification/scale\": 2.5,\r\n" + 
		"                    \"http://registry.easytv.eu/application/cs/ui/text/size\": \"24\"\r\n" + 
		"                }\r\n" + 
		"            },\r\n" + 
		"            \"conditional\": [\r\n" + 
		"                {\r\n" + 
		"                    \"name\": \"Morning subtitles color contrast\",\r\n" + 
		"                    \"preferences\": {\r\n" + 
		"                        \"http://registry.easytv.eu/application/tts/audio/volume\": 50\r\n" + 
		"                    },\r\n" + 
		"                    \"conditions\": [\r\n" + 
		"                        {\r\n" + 
		"                            \"operands\": [\r\n" + 
		"                                {\r\n" + 
		"                                    \"operands\": [\r\n" + 
		"                                        \"http://registry.easytv.eu/context/time\",\r\n" + 
		"                                        \"08:00:00\"\r\n" + 
		"                                    ],\r\n" + 
		"                                    \"type\": \"gt\"\r\n" + 
		"                                },\r\n" + 
		"                                {\r\n" + 
		"                                    \"operands\": [\r\n" + 
		"                                        \"http://registry.easytv.eu/context/time\",\r\n" + 
		"                                        \"15:00:00\"\r\n" + 
		"                                    ],\r\n" + 
		"                                    \"type\": \"lt\"\r\n" + 
		"                                }\r\n" + 
		"                            ],\r\n" + 
		"                            \"type\": \"and\"\r\n" + 
		"                        }\r\n" + 
		"                    ]\r\n" + 
		"                }\r\n" + 
		"            ]\r\n" + 
		"        }\r\n" + 
		"}");

var user_profile = JSON.parse("{\r\n" + 
		"		\"user_preferences\": {\r\n" + 
		"			\"default\": {\"preferences\": {\r\n" + 
		"                        \"http://registry.easytv.eu/common/volume\": 90,\r\n" + 
		"                        \"http://registry.easytv.eu/common/contrast\": 100,\r\n" + 
		"                        \"http://registry.easytv.eu/application/control/voice\": true,\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/audio/track\": \"ca\",\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/ui/language\": \"en\",\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/audio/volume\": 33,\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/ui/text/size\": \"20\",\r\n" + 
		"                        \"http://registry.easytv.eu/application/tts/audio/speed\": 0,\r\n" + 
		"                        \"http://registry.easytv.eu/application/tts/audio/voice\": \"male\",\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/audio/eq/bass\": -4,\r\n" + 
		"                        \"http://registry.easytv.eu/application/cs/audio/eq/mids\": 5,\r\n" + 
		"                        \"http://registry.easytv.eu/application/tts/audio/volume\": 90\r\n" + 
		"			}},\r\n" + 
		"			\"conditional\": [{\r\n" + 
		"				\"name\": \"Morning subtitles color contrast\",\r\n" + 
		"				\"preferences\": {				 	\r\n" + 
		"					    \"http://registry.easytv.eu/application/tts/audio/volume\": 50\r\n" + 
		"				},	\r\n" + 
		"				\"conditions\": [{\r\n" + 
		"					\"operands\": [\r\n" + 
		"						{\r\n" + 
		"							\"operands\": [\r\n" + 
		"								\"http://registry.easytv.eu/context/time\",\r\n" + 
		"								\"08:00:00\"\r\n" + 
		"							],\r\n" + 
		"							\"type\": \"gt\"\r\n" + 
		"						},\r\n" + 
		"						{\r\n" + 
		"							\"operands\": [\r\n" + 
		"								\"http://registry.easytv.eu/context/time\",\r\n" + 
		"								\"15:00:00\"\r\n" + 
		"							],\r\n" + 
		"							\"type\": \"lt\"\r\n" + 
		"						}\r\n" + 
		"					],\r\n" + 
		"					\"type\": \"and\"\r\n" + 
		"				}]\r\n" + 
		"			}]\r\n" + 
		"		}\r\n" + 
		"}");

var HBMMImpl = require('../lib/HybridMatchMakerImpl').HBMMImpl
var hybridMM = require('../lib/HybridMatchMakerImpl').hbmmImpl

function test_hybridPreferences(){
	var user_id = 1
	var hybridProfile = hybridMM.personalize_profile(user_id , user_profile, STMM_user_profile, RBMM_user_profile)
	console.log(JSON.stringify(hybridProfile, null, 4))
	
	var prefs1 = user_profile.user_preferences.default.preferences	
	var prefs2 = hybridProfile.user_preferences.default.preferences
	
	//check hybrid preference
	assert (prefs2["http://registry.easytv.eu/common/volume"] == 9, "hybrid preference must be " + 9);

	//update weights
	var new_weigths = hybridMM.update_user_weights(user_id , user_profile, STMM_user_profile, RBMM_user_profile, [0.5, 0.5])
}

//test_hybridPreference();
test_hybridPreferences();