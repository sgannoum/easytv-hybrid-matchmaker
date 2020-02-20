/**
 * 
 */

const publicRoutes = {
  'POST /personalize/profile': 'ProfilePersonalization.personalize_profile',
  'GET  /personalize/profile': 'ProfilePersonalization.get_information',
  
  'POST /personalize/weigths': 'WeigthsPersonalization.personalize_weights',
  'GET  /personalize/weigths': 'WeigthsPersonalization.get_information',

  'GET  /personalize/context': 'ContextPersonalization.get_information',
  'POST /personalize/context': 'ContextPersonalization.personalize_context',
  
  'POST /personalize/content': 'ContentPersonalization.personalize_content',
  'GET  /personalize/content': 'ContentPersonalization.get_information',
  
  'POST /personalize/rules': 'HiddenEndPoints.post_Rbmm_Rules',
  'GET  /personalize/rules': 'HiddenEndPoints.get_Rbmm_Rules',
  
  'POST /analysis/clusters': 'HiddenEndPoints.post_stmm_profiles',
  'GET  /analysis/clusters': 'HiddenEndPoints.get_stmm_profiles'

};

module.exports = publicRoutes;
