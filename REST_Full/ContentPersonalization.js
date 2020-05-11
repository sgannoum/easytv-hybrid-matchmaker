/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js').msg
var DataBaseHandler = require('../lib/DataBaseHandler.js')

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
			if (!req.body.user_content) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_content.msg_text)
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
			
			
			var rbmm_profile;
			const user_id = req.body.user_id
			const user_profile = req.body.user_profile
			var user_content = req.body.user_content
					
			var rbmm_options = {
				    method: 'POST',
				    uri: urls.RBMM_PERSONALIZE_CONTENT,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			 };
			
			
			var accessibility_options = {
				    method: 'GET',
				    uri: 'http://138.4.47.33:8080/media/services/Com_si_fos_ahir/com_si_fos_ahir_capitol_428',
				    headers: {
				        'Accept': '*',
				        'Accept-Encoding': 'gzip, deflate',
				        'Accept-Language': 'en-US,en;q=0.5',
				        'HOST': '138.4.47.33:8080'
				    },
				    json: true // Automatically stringifies the body to JSON

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
					
					console.log('[INFO][%s][%d][Accessibility services]: %s', endpoint_tag, user_id, "process file content")
					//convert content information
					rbmm_options.body.user_content = hbmmImpl.get_user_content(response)
					
					console.log('[INFO][%s][%d][Accessibility services]: %s', endpoint_tag, user_id, JSON.stringify(rbmm_options.body.user_content))

					return rp(rbmm_options)
					
			  }).catch(function (err) {
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][Accessibility services]: URL %s has error %s', endpoint_tag, user_id, accessibility_options.uri, err)

					  if(err.error.code == 'ECONNREFUSED')	  
						  res.status(500).json({msg: 'Internal server error'});
					  else 
						  res.status(500).json(err.error);
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
					
					//write the user current content
					DataBaseHandler.write_content_to_db(user_id, user_content)
					
					//forward rbmm profile
					return res.status(200).json({user_id: user_id, user_profile: rbmm_profile});
					
			  }).catch(function (err) { 
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][RBMM]: %s', endpoint_tag, user_id , err)
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
