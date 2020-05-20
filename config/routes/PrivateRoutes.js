/**
 * 
 */

const privateRoutes = {
		
		'GET  /personalize/profile': 			'ProfilePersonalization.get_information',
		'POST /personalize/profile/:radius': 	'ProfilePersonalization.personalize_profile',
		'POST /personalize/profile': 			'ProfilePersonalization.personalize_profile',

		'GET  /personalize/context': 			'ContextPersonalization.get_information',
		'POST /personalize/context/:radius': 	'ContextPersonalization.personalize_context',
		'POST /personalize/context': 			'ContextPersonalization.personalize_context',
  
		'GET  /personalize/content': 			'ContentPersonalization.get_information',
		'POST /personalize/content/:radius': 	'ContentPersonalization.personalize_content',
		'POST /personalize/content': 			'ContentPersonalization.personalize_content',
  
		'POST /interaction/events': 			'InteractionEventsHandler.handleInteractionEvents',
		'GET  /interaction/suggestion': 		'InteractionEventsHandler.getActiveProfileSuggestion',
		
		'POST /personalize/login': 				'Personalization.login',
		'POST /personalize/logout': 			'Personalization.logout'

};

module.exports = privateRoutes;
