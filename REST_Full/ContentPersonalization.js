/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')

const endpoint_tag = 'PCnt';

const ContentPersonalization = () => {
	
  const personalize_content = (req, res) => {	
	  
	  		// Check for user Id
			if (!req.body.user_id) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_id.msg_text)
				return res.status(500).json({ code: msg.missing_user_id.msg_code, 
										      msg: msg.missing_user_id.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_profile) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_profile.msg_text)
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_context) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_context.msg_text)
				return res.status(500).json({ code: msg.missing_user_context.msg_code, 
					  						  msg: msg.missing_user_context.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_context.msg_text)
				return res.status(500).json({ code: msg.missing_user_content.msg_code, 
					  						  msg: msg.missing_user_content.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.media) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_content_media.msg_text)
				return res.status(500).json({ code: msg.missing_user_content_media.msg_code, 
					  						  msg: msg.missing_user_content_media.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.episode) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_content_episode.msg_text)
				return res.status(500).json({ code: msg.missing_user_content_episode.msg_code, 
					  						  msg: msg.missing_user_content_episode.msg_text });
			}
			
			
			var stmm_profile;
			var rbmm_profile;
			const radius = '?radius=' + (req.query.radius || '0.3') 
			const user_id = req.body.user_id
			const user_profile = req.body.user_profile
			const user_context = req.body.user_context
			var user_content = req.body.user_content
						 
			var stmm_options = {
				    method: 'POST',
				    uri: urls.STMM_PERSONALIZE_CONTENT + radius,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			};
			
			var rbmm_options = {
				    method: 'POST',
				    uri: urls.RBMM_PERSONALIZE_CONTENT,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			 };
			
			var accessibility_options = {
				    method: 'GET',
				    uri: urls.ACCESSIBILITY_CONTENT+'/'+user_content.media+'/'+user_content.episode,
				    json: true // Automatically stringifies the body to JSON
			 };
			
			var mpd_options = {
				    method: 'GET'
			 };
			
			console.log('[INFO][%s][%d]: %s', endpoint_tag, user_id, JSON.stringify(req.body))

			//chained request to content services		 
			rp(accessibility_options)
			 .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					// Check for services section
					if (!response.services) { 
						console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_accessibility_services.msg_text )
						return res.status(500).json({ code: msg.missing_accessibility_services.msg_code, 
							  						  msg: msg.missing_accessibility_services.msg_text });
					}

					// Check for user profile
					if (!response.mpd_url) { 
						console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_mpd_url.msg_text )
						return res.status(500).json({ code: msg.missing_mpd_url.msg_code, 
							  						  msg: msg.missing_mpd_url.msg_text });
					}
					
					user_content = response
					
					//user_content = hbmmImpl.mp_to_json(response)
					mpd_options.uri = user_content.mpd_url.replace('//media','/media')
					
					console.log('[INFO][%s][%d][Accessibility services]: %s', endpoint_tag, user_id, JSON.stringify(response))

					return rp(mpd_options)

			  })
			  .catch(function (err) {
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][RBMM]: %s', endpoint_tag, user_id, err)

					  if(err.error.code == 'ECONNREFUSED')	  
						  res.status(500).json({msg: 'Internal server error'});
					  else 
						  res.status(500).json(err.error);
				  }
			  }) 
			
			//chained request to get MPD		 
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}

					console.log('[INFO][%s][%d][MPD]: %s', endpoint_tag, user_id, response)

					var mpd_file_content  = response
					
					//process content to be used for and print any error that occurs
					user_content = hbmmImpl.get_user_content(user_content, mpd_file_content)
					
					//console.log('[INFO][%s][%d][MPD]: %s', endpoint_tag, user_id, JSON.stringify(user_content))
					
					//replace user_content  
					rbmm_options.body.user_content = user_content
					stmm_options.body.user_content = user_content
						
					return rp(rbmm_options)
					
			  })
			  .catch(function (err) { 
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][MPD]: %s', endpoint_tag, user_id, err)
					  res.status(500).json({msg: 'Internal server error'});
				  }
			  }) 
			
			//chained request to RBMM		 
		  	  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					console.log('[INFO][%s][%d][RBMM]: %s', endpoint_tag, user_id, JSON.stringify(response.user_profile))
					
					//set rbmm profile
					rbmm_profile  = response.user_profile;
										
					return rp(stmm_options)
			  })
			  .catch(function (err) { 
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][RBMM]: %s', endpoint_tag, user_id , err)
					  res.status(500).json({msg: 'Internal server error'});
				  }
			  }) 
			
			//chained request to STMM		 
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
	
					console.log('[INFO][%s][%d][STMM]: %s', endpoint_tag, user_id, JSON.stringify(response.user_profile))
	
					//set stmm profile
					stmm_profile  = response.user_profile;
					
					//personalize content
					var hybrid_user_profile = hbmmImpl.personalize_content(user_id, user_profile, stmm_profile, rbmm_profile, user_context, user_content)
					
					console.log('[INFO][%s][%d][HBMM]: %s', endpoint_tag, user_id, JSON.stringify(hybrid_user_profile))
					
					return res.status(200).json({user_id: user_id, user_profile: hybrid_user_profile});
			  })
			  .catch(function (err) { 
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][STMM]: %s', endpoint_tag, user_id, err)
					  res.status(500).json({msg: 'Internal server error'});
				  }
			  }) 
	};
	
	/**
	 * A HTTP GET handler for route /match
	 */
  const get_information =  (req, res) =>  {
	  
    try {
        return res.status(200).json({message: "To personalize context do one of the following: " +
    		"								HTTP POST /personalize/context \r\n" +
    		"								Content-Type: application/json \r\n" +
    		"								\r\n" +
    		"								\r\n" +
    		"								{" +
    		"									\"user_id\": Number," +
    		"									\"user_profile\": user profile json," +
    		"									\"user_content\": user content content," +
    		"								}"});
      } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	
  return {
	  personalize_content,
	  get_information
	  };
};

module.exports = ContentPersonalization;
