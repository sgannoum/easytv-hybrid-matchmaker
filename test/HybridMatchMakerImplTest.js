/**
 * 
 */
const assert = require('assert');

var user_profile = JSON.parse(		"{\n" + 
		"  \"general\": {\n" + 
		"    \"age\": 40,\n" + 
		"    \"gender\": \"male\"\n" + 
		"  },\n" + 
		"  \"visual\": {\n" + 
		"    \"visual_acuity\": 7,\n" + 
		"    \"contrast_sensitivity\": 57,\n" + 
		"    \"color_blindness\": \"normal\"\n" + 
		"  },\n" + 
		"  \"auditory\": {\n" + 
		"    \"quarterK\": 35,\n" + 
		"    \"halfK\": 61,\n" + 
		"    \"oneK\": 28,\n" + 
		"    \"twoK\": 82,\n" + 
		"    \"fourK\": 41,\n" + 
		"    \"eightK\": 51\n" + 
		"  },\n" + 
		"  \"user_preferences\": {\n" + 
		"    \"default\": {\n" + 
		"      \"preferences\": {\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/audioDescription\": true,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/track\": \"es\",\n" + 
		"        \"https://easytvproject.eu/registry/common/audioVolume\": 77,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor\": \"#ffffff\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontSize\": 17,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/language\": \"en\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/volume\": 30\n" + 
		"      }\n" + 
		"    }\n" + 
		"  }\n" + 
		"}");

var RBMM_user_profile = JSON.parse("{\n" + 
		"  \"general\": {\n" + 
		"    \"gender\": \"male\",\n" + 
		"    \"age\": 40\n" + 
		"  },\n" + 
		"  \"auditory\": {\n" + 
		"    \"oneK\": 28,\n" + 
		"    \"fourK\": 41,\n" + 
		"    \"twoK\": 82,\n" + 
		"    \"eightK\": 51,\n" + 
		"    \"quarterK\": 35,\n" + 
		"    \"halfK\": 61\n" + 
		"  },\n" + 
		"  \"visual\": {\n" + 
		"    \"visual_acuity\": 7,\n" + 
		"    \"color_blindness\": \"normal\",\n" + 
		"    \"contrast_sensitivity\": 57\n" + 
		"  },\n" + 
		"  \"user_preferences\": {\n" + 
		"    \"default\": {\n" + 
		"      \"preferences\": {\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/audioDescription\": true,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontSize\": 17,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/language\": \"en\",\n" + 
		"        \"https://easytvproject.eu/registry/common/audioVolume\": 77,\n" + 
		"        \"https://easytvproject.eu/registry/common/fontSize\": 25,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor\": \"#ffffff\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/track\": \"es\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/volume\": 30\n" + 
		"      }\n" + 
		"    }\n" + 
		"  }\n" + 
		"}");

var STMM_user_profile = JSON.parse("{\n" + 
		"  \"general\": {\n" + 
		"    \"age\": 40,\n" + 
		"    \"gender\": \"male\"\n" + 
		"  },\n" + 
		"  \"visual\": {\n" + 
		"    \"visual_acuity\": 7,\n" + 
		"    \"contrast_sensitivity\": 57,\n" + 
		"    \"color_blindness\": \"normal\"\n" + 
		"  },\n" + 
		"  \"auditory\": {\n" + 
		"    \"quarterK\": 35,\n" + 
		"    \"halfK\": 61,\n" + 
		"    \"oneK\": 28,\n" + 
		"    \"twoK\": 82,\n" + 
		"    \"fourK\": 41,\n" + 
		"    \"eightK\": 51\n" + 
		"  },\n" + 
		"  \"user_preferences\": {\n" + 
		"    \"default\": {\n" + 
		"      \"preferences\": {\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/audioDescription\": true,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/track\": \"es\",\n" + 
		"        \"https://easytvproject.eu/registry/common/audioVolume\": 77,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor\": \"#f0ffff\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/fontSize\": 17,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/language\": \"en\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/audio/volume\": 30,\n" + 
		"        \"https://easytvproject.eu/registry/common/backgroundColor\": \"#9ee2e0\",\n" + 
		"        \"https://easytvproject.eu/registry/common/signLanguage\": \"SPANISH\",\n" + 
		"        \"https://easytvproject.eu/registry/application/tts/audioQuality\": 4,\n" + 
		"        \"https://easytvproject.eu/registry/application/tts/language\": \"CATALAN\",\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/subtitles/backgroundColor\": \"#45ef1\",\n" + 
		"        \"https://easytvproject.eu/registry/application/tts/speed\": -4,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/cc/audioSubtitles\": true,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/accessibility/textDetection\": false,\n" + 
		"        \"https://easytvproject.eu/registry/common/subtitles\": \"GREEK\",\n" + 
		"        \"https://easytvproject.eu/registry/common/audioLanguage\": \"ENGLISH\",\n" + 
		"        \"https://easytvproject.eu/registry/common/displayContrast\": 54,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/accessibility/faceDetection\": true,\n" + 
		"        \"https://easytvproject.eu/registry/common/fontSize\": 5,\n" + 
		"        \"https://easytvproject.eu/registry/application/tts/volume\": 3,\n" + 
		"        \"https://easytvproject.eu/registry/application/cs/accessibility/imageMagnification/scale\": 11,\n" + 
		"        \"https://easytvproject.eu/registry/common/fontColor\": \"#6599f\",\n" + 
		"        \"https://easytvproject.eu/registry/common/font\": \"monospace\"\n" + 
		"      }\n" + 
		"    }\n" + 
		"  }\n" + 
		"}");

var handler = require('../lib/HybridMatchMakerImpl')

function test_hybridPreferences(){
	var hybridProfile = handler.hybridPreferences(STMM_user_profile, RBMM_user_profile, user_profile)
	console.log(hybridProfile)
}

function test_hybridPreference(){
	//language
	actualValue = handler.hybridPreference("https://easytvproject.eu/registry/application/cs/cc/subtitles/language", STMM_user_profile.user_preferences.default.preferences, RBMM_user_profile.user_preferences.default.preferences)
	expectvalue = "EN"
	assert (actualValue == expectvalue, "preference are not equals expected" + expectvalue+ " but found "+ actualValue);
	
	//Numeric array
	var actualValue = handler.hybridPreference("https://easytvproject.eu/registry/application/cs/cc/subtitles/fontColor", STMM_user_profile.user_preferences.default.preferences, RBMM_user_profile.user_preferences.default.preferences)
	var expectvalue = "#f4ffff"
	assert (actualValue == expectvalue, "preference are not equals expected" + expectvalue+ " but found "+ actualValue);

	//Numeric
	actualValue = handler.hybridPreference("https://easytvproject.eu/registry/common/fontSize", STMM_user_profile.user_preferences.default.preferences, RBMM_user_profile.user_preferences.default.preferences)
	expectvalue = 11
	assert (actualValue == expectvalue, "preference are not equals expected" + expectvalue+ " but found "+ actualValue);
	
	//boolean
	actualValue = handler.hybridPreference("https://easytvproject.eu/registry/application/cs/audio/audioDescription", STMM_user_profile.user_preferences.default.preferences, RBMM_user_profile.user_preferences.default.preferences)
	expectvalue = true
	assert (actualValue == expectvalue, "preference are not equals expected" + expectvalue+ " but found "+ actualValue);
}

test_hybridPreference();
test_hybridPreferences();