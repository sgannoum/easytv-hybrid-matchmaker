/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')


const ContextPersonalization = () => {
  const personalize_context = (req, res) => {	
			
			// Check for user Id
			if (!req.body.user_id) { 
				console.log('A request with missing user_id')
				return res.status(500).json({ code: msg.missing_user_id.msg_code, 
										      msg: msg.missing_user_id.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_profile) { 
				console.log('A request with missing user_profile')
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_context) { 
				console.log('A request with missing user_context')
				return res.status(500).json({ code: msg.missing_user_context.msg_code, 
					  						  msg: msg.missing_user_context.msg_text });
			}

			var stmm_profile;
			var rbmm_profile;
			const user_id = req.body.user_id
			const user_profile = req.body.user_profile
			const user_context = req.body.user_context
			
			console.log('user['+user_id+']: ',' personalize context')

			var stmm_options = {
				    method: 'POST',
				    uri: urls.STMM_PERSONALIZE_CONTEXT,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			 };
			
			//chained request			 
			rp(stmm_options)
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}
					
					console.log('user['+user_id+'][STMM]:', JSON.stringify(response.user_profile))
					
					stmm_profile  = response.user_profile;
					stmm_options.uri = urls.RBMM_PERSONALIZE_CONTEXT
					return rp(stmm_options)
					
			  })
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}

					console.log('user['+user_id+'][RBMM]:', JSON.stringify(response.user_profile))
					
					rbmm_profile  = response.user_profile;
					var  hybrid_user_profile = hbmmImpl.personalize_context(user_id, user_profile, user_context, stmm_profile, rbmm_profile)
					
					console.log('user['+user_id+'][HBMM]:', JSON.stringify(hybrid_user_profile))

					return res.status(200).json({user_id: user_id, user_profile: hybrid_user_profile});
			  })
			  .catch(function (err) { 
				  console.log('user['+user_id+']: ',err)
				  res.status(500).json({ msg: 'Internal server error' });
			  }) 

	};
	
	/**
	 * A HTTP GET handler for route /match
	 */
  const get_information =  (req, res) =>  {
	  
    try {
        return res.status(200).json({message: "To personalize context do: " +
    		"								HTTP POST /personalize/context \r\n" +
    		"								Content-Type: application/json \r\n" +
    		"								\r\n" +
    		"								\r\n" +
    		"								{" +
    		"									\"user_id\": Number," +
    		"									\"user_profile\": user profile json," +
    		"									\"user_context\": user context json," +
    		"								}"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	
  return {
	  personalize_context,
	  get_information
	  };
};

module.exports = ContextPersonalization;
