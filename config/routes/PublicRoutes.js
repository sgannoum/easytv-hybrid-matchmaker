/**
 * 
 */

const publicRoutes = {
		
		'GET  /personalize/profile': 			'ProfilePersonalization.get_information',
		'POST /personalize/profile/:radius': 	'ProfilePersonalization.personalize_profile',
		'POST /personalize/profile': 			'ProfilePersonalization.personalize_profile',

		'GET  /personalize/context': 			'ContextPersonalization.get_information',
		'POST /personalize/context/:radius': 	'ContextPersonalization.personalize_context',
		'POST /personalize/context': 			'ContextPersonalization.personalize_context',
  
		'GET  /personalize/content': 			'ContentPersonalization.get_information',
		'POST /personalize/content/:radius': 	'ContentPersonalization.personalize_content',
		'POST /personalize/content': 			'ContentPersonalization.personalize_content',
  
		'POST /interaction/events': 			'InteractionEventsHandler.interaction_events_handler',
		
		'POST /personalize/rules': 				'HiddenEndPoints.post_Rbmm_Rules',
		'GET  /personalize/rules': 				'HiddenEndPoints.get_Rbmm_Rules',
  
		'POST /analysis/clusters': 				'HiddenEndPoints.post_stmm_profiles',
		'GET  /analysis/clusters': 				'HiddenEndPoints.get_stmm_profiles'
};

module.exports = publicRoutes;
