/**
 * 
 */

const publicRoutes = {
		
		'POST /rbmm/rules': 		'HiddenEndPoints.post_Rbmm_Rules',
		'GET  /rbmm/rules': 		'HiddenEndPoints.get_Rbmm_Rules',
  
		'POST /stmm/clusters': 		'HiddenEndPoints.post_stmm_profiles',
		'GET  /stmm/clusters': 		'HiddenEndPoints.get_stmm_profiles',
		
		'POST /dummylogin': 		'Personalization.getDummyToken'

};

module.exports = publicRoutes;
