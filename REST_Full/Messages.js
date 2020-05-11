/**
 * 
 */

const msg = {
		missing_user_id: {
			msg_code: 401,
			msg_text: 'Missing user id',
			http_code: 401
		},
		missing_user_profile:{
			msg_code: 401,
			msg_text: 'Missing user id',
			http_code: 401
		},
		missing_user_context:{
			msg_code: 401,
			msg_text: 'Missing user context',
			http_code: 401
		},
		missing_user_content:{
			msg_code: 401,
			msg_text: 'Missing user content',
			http_code: 401
		},
		missing_user_preferences:{
			msg_code: 401,
			msg_text: 'Missing user preferences',
			http_code: 401
		},
		missing_user_content_media:{
			msg_code: 401,
			msg_text: 'Missing media from user context',
			http_code: 401
		},
		missing_user_content_episode:{
			msg_code: 401,
			msg_text: 'Missing episode from user context',
			http_code: 401
		},
		missing_accessibility_services:{
			msg_code: 401,
			msg_text: 'Missing services from user context',
			http_code: 401
		},
		missing_mpd_url:{
			msg_code: 401,
			msg_text: 'Missing services from user context',
			http_code: 401
		},
		success:{
			msg_code: 200,
			msg_text: 'Success',
			http_code: 200
		}
}

module.exports.msg = msg