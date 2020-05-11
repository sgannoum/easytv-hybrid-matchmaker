/**
 * 
 */

const STMM_HOST = process.env.STMM_HOST || 'localhost';
const RBMM_HOST = process.env.RBMM_HOST || 'localhost';

const STMM_PORT = process.env.STMM_PORT || "8077";
const RBMM_PORT = process.env.RBMM_PORT || "8080";

const STMM_URL = 'http://' + STMM_HOST + ":" + STMM_PORT + "/EasyTV_STMM_Restful_WS";
const RBMM_URL = 'http://' + RBMM_HOST + ":" + RBMM_PORT + "/EasyTV_RBMM_Restful_WS";

const STMM_PERSONALIZE_PROFILE = STMM_URL + "/personalize/profile";
const RBMM_PERSONALIZE_PROFILE = RBMM_URL + "/personalize/profile";
const STMM_PERSONALIZE_CONTEXT = STMM_URL + "/personalize/context";
const RBMM_PERSONALIZE_CONTEXT = RBMM_URL + "/personalize/context";
const STMM_PERSONALIZE_CONTENT = STMM_URL + "/personalize/content";
const RBMM_PERSONALIZE_CONTENT = RBMM_URL + "/personalize/content";

const RBMM_RULES = RBMM_URL + "/personalize/rules";
const STMM_PROFILES = STMM_URL + "/analysis/clusters";

module.exports.STMM_URL = STMM_URL
module.exports.RBMM_URL = RBMM_URL

module.exports.STMM_PERSONALIZE_PROFILE = STMM_PERSONALIZE_PROFILE
module.exports.RBMM_PERSONALIZE_PROFILE = RBMM_PERSONALIZE_PROFILE

module.exports.STMM_PERSONALIZE_CONTEXT = STMM_PERSONALIZE_CONTEXT
module.exports.RBMM_PERSONALIZE_CONTEXT = RBMM_PERSONALIZE_CONTEXT

module.exports.STMM_PERSONALIZE_CONTENT = STMM_PERSONALIZE_CONTENT
module.exports.RBMM_PERSONALIZE_CONTENT = RBMM_PERSONALIZE_CONTENT

module.exports.RBMM_RULES = RBMM_RULES
module.exports.STMM_PROFILES = STMM_PROFILES

//UPM accessibility API
const ACCESSBILITY_HOST = process.env.ACCESSBILITY_HOST || '138.4.47.33';
const ACCESSBILITY_PORT = process.env.ACCESSBILITY_PORT || "8080";
const ACCESSBILITY_PATH = process.env.ACCESSBILITY_PATH || "/media/services";

const CONTENT_ACCESSIBILITY_URL = 'http://' + ACCESSBILITY_HOST + ":" + ACCESSBILITY_PORT + ACCESSBILITY_PATH

module.exports.ACCESSIBILITY_CONTENT = CONTENT_ACCESSIBILITY_URL