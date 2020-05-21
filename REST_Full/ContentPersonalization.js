/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js').msg
const UserModel = require('../models/UserModel');
const sequelize = require('../config/database');
const endpoint_tag = 'PCnt';

/**
 * Convert accessibility services information into a proper user_content object
 */
function get_user_content (access_services) {
	
	console.log(access_services)
	//parse service file content
	var user_content = {'http://registry.easytv.eu/application/cs/accessibility/detection/face': false, 
						'http://registry.easytv.eu/application/cs/accessibility/detection/text': false, 
						'http://registry.easytv.eu/application/cs/accessibility/detection/sound':false, 
						'http://registry.easytv.eu/application/cs/accessibility/detection/character': false , 
						'http://registry.easytv.eu/application/cs/audio/track': [], 
						'http://registry.easytv.eu/application/cs/cc/subtitles/language': []};


	var services = access_services.services
	for(var i in services) {
		if(services[i] == 'face-magnification')
			user_content['http://registry.easytv.eu/application/cs/accessibility/detection/face'] = true
			
		if(services[i] == 'text_detection')
			user_content['http://registry.easytv.eu/application/cs/accessibility/detection/text'] = true
			
		if(services[i] == 'sounds-recognition')
			user_content['http://registry.easytv.eu/application/cs/accessibility/detection/sound'] = true
			
		if(services[i] == 'character-recognition')
			user_content['http://registry.easytv.eu/application/cs/accessibility/detection/character'] = true
	}
		
	if(access_services['audio_langs'])
		user_content['http://registry.easytv.eu/application/cs/audio/track'] = access_services['audio_langs']
		
	if(access_services['subtitle_langs'])
		user_content['http://registry.easytv.eu/application/cs/cc/subtitles/language'] = access_services['subtitle_langs']
			
	return user_content
}

const ContentPersonalization = () => {
	
  const personalize_content = async (req, res) => {	

	  		/*req.token.id holds the userId of a valid jwt. This argument is returned by the authorization middleware.*/
			const user_id = req.token.id

			// Check for user profile
			if (!req.body.user_profile) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_profile.msg_text)
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_content.msg_text)
				return res.status(500).json({ code: msg.missing_user_content.msg_code, 
					  						  msg: msg.missing_user_content.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.media) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_content_media.msg_text)
				return res.status(500).json({ code: msg.missing_user_content_media.msg_code, 
					  						  msg: msg.missing_user_content_media.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_content.episode) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_content_episode.msg_text)
				return res.status(500).json({ code: msg.missing_user_content_episode.msg_code, 
					  						  msg: msg.missing_user_content_episode.msg_text });
			}
			
			var rbmm_profile;
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
			 .then((response) => {
					
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
					
					//convert content information
					rbmm_options.body.user_content = get_user_content(response)
					
					console.log('[INFO][%s][%d][Accessibility services]: %s', endpoint_tag, user_id, JSON.stringify(rbmm_options.body.user_content))

					return rp(rbmm_options)
					
			  }).catch((err) => {
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][Accessibility services]: URL %s has error %s', endpoint_tag, user_id, accessibility_options.uri, err)

					  if(err.error.code == 'ECONNREFUSED')	  
						  res.status(500).json({msg: 'Internal server error'});
					  else 
						  res.status(500).json(err.error);
				  }
			  }) 			
			//chained request to RBMM		 
		  	  .then((response) => {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					console.log('[INFO][%s][%d][RBMM]: %s', endpoint_tag, user_id, JSON.stringify(response.user_profile))
					
					//set rbmm profile
					rbmm_profile  = response.user_profile;						

				    return sequelize.transaction(async (t) => {
				    	
				    	//find active profile id
				    	 const userModel = await UserModel.findOne({
				    		 	  where: { userId: user_id, isActive: true},
				    	          transaction: t,
				    	          lock: t.LOCK.UPDATE //SELECT ... FOR UPDATE. This essentially locks the selected record.
				    			 })
				    	
			        	  if(userModel == null) {
			      			  console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, 'User has no active profile')
			                  return res.status(400).json({ msg: 'Bad Request: No record found.' });
			        	  }
			        	
				    	 //update user context
				    	 await userModel.update({ 
				    		 userContent: user_content
				    		 },
				    		 { transaction: t})
				    	 
				      }).then(result => {
			                return res.status(200).json({user_id: user_id, user_profile: rbmm_profile});
				      }).catch(err => {
				        //console.log(err);
			                return res.status(500).json({ msg: 'Internal server error: ' + err });
				      }); 
										
			  }).catch((err) => { 
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
        return res.status(200).json({message: "To personalize content do one of the following: " +
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
