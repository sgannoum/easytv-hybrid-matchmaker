/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')


const ContentPersonalization = () => {
	
  const personalize_content = (req, res) => {	
	  
	  		// Check for user Id
			if (!req.body.user_id) { 
				console.log('Personalize content requestt: missing user_id')
				return res.status(500).json({ code: msg.missing_user_id.msg_code, 
										      msg: msg.missing_user_id.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_profile) { 
				console.log('Personalize content requestt: missing user_profile')
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_context) { 
				console.log('Personalize content requestt: missing user_context')
				return res.status(500).json({ code: msg.missing_user_context.msg_code, 
					  						  msg: msg.missing_user_context.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content) { 
				console.log('Personalize content requestt: missing user_content')
				return res.status(500).json({ code: msg.missing_user_content.msg_code, 
					  						  msg: msg.missing_user_content.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.media) { 
				console.log('Personalize content requestt: missing media element from user_content.')
				return res.status(500).json({ code: msg.missing_user_content.msg_code, 
					  						  msg: msg.missing_user_content.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.episode) { 
				console.log('Personalize content requestt: missing episode element from user_content.')
				return res.status(500).json({ code: msg.missing_user_content.msg_code, 
					  						  msg: msg.missing_user_content.msg_text });
			}
			
			
			var stmm_profile;
			var rbmm_profile;
			const user_id = req.body.user_id
			const user_profile = req.body.user_profile
			const user_context = req.body.user_context
			var user_content = req.body.user_content
			var mpd_file
						 
			var stmm_options = {
				    method: 'POST',
				    uri: urls.STMM_PERSONALIZE_PROFILE,
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
			
			console.log('user['+user_id+']:','personalize content')
			console.log('user['+user_id+']:','send request for content accessibility services', accessibility_options.uri)

			//chained request			 
			rp(accessibility_options)
			 .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					// Check for user profile
					if (!response.services) { 
						console.log('user['+user_id+']', 'Content response: missing services element', JSON.stringify(response))
						return res.status(500).json({ code: msg.missing_user_content.msg_code, 
							  						  msg: msg.missing_user_content.msg_text });
					}

					// Check for user profile
					if (!response.mpd_url) { 
						console.log('user['+user_id+']', 'Content response: missing mpd_url element', JSON.stringify(response))
						return res.status(500).json({ code: msg.missing_user_content.msg_code, 
							  						  msg: msg.missing_user_content.msg_text });
					}
					
					user_content = response
					
					//user_content = hbmmImpl.mp_to_json(response)
					mpd_options.uri = user_content.mpd_url.replace('//media','/media')
					
					console.log('user['+user_id+'][content_services]: ', JSON.stringify(response))
					console.log('user['+user_id+'][content_services]:','send request for MPD file', mpd_options.uri)

					return rp(mpd_options)

			  })
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}

					console.log('user['+user_id+'][MPD]:', response)
					
					mpd_file  = response;
					
					//process content to be used for 
					user_content = hbmmImpl.get_user_content(user_content, mpd_file)
					
					//add user_content to requests 
					rbmm_options.body.user_content = user_content
					stmm_options.body.user_content = user_content
						
					console.log('user['+user_id+'][MPD]:','send request for rbmm with content', JSON.stringify(stmm_options.body))

					return rp(rbmm_options)
					
			  })
			  	.then( function (response) {
						
						if(response == undefined) {
							res.status(400).json({ msg: 'Internal server error' });
							return
						}
						
						console.log('user['+user_id+'][RBMM]:', JSON.stringify(response.user_profile))
						
						//set rbmm profile
						rbmm_profile  = response.user_profile;
						
						return rp(stmm_options)
				  })
				  .then( function (response) {
						
						if(response == undefined) {
							res.status(400).json({ msg: 'Internal server error' });
							return
						}
		
						console.log('user['+user_id+'][STMM]:', JSON.stringify(response.user_profile))
		
						//set stmm profile
						stmm_profile  = response.user_profile;
						
						//personalize content
						var  hybrid_user_profile = hbmmImpl.personalize_content(user_id, user_profile, stmm_profile, rbmm_profile, user_context, user_content)
						
						console.log('user['+user_id+'][HBMM]:', JSON.stringify(hybrid_user_profile))
						
						return res.status(200).json({user_id: user_id, user_profile: hybrid_user_profile});
				  })
				  .catch(function (err) { 
					  console.log('user['+user_id+'][Error]: ', err.response.body)
					  res.status(err.statusCode).json(err.response.body);
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
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	
  return {
	  personalize_content,
	  get_information
	  };
};

module.exports = ContentPersonalization;
