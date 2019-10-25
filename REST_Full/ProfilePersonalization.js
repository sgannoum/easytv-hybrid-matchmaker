/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')

console.log("Connect to stmm on Url: "+ urls.STMM_URL)
console.log("Connect to rbmm on Url: "+ urls.RBMM_URL)

const ProfilePersonalization = () => {
  const personalize_profile = (req, res) => {	
	  
			// Check for user Id
			if (!req.body.user_id) { 
				console.log('Personalize profile requestt: missing user_id')
				return res.status(500).json({ code: msg.missing_user_id.msg_code, 
										      msg: msg.missing_user_id.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_profile) { 
				console.log('Personalize profile requestt: missing user_profile')
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			var stmm_profile;
			var rbmm_profile;
			const user_id = req.body.user_id
			const user_profile = req.body.user_profile
			
			console.log('user['+user_id+']: ','personalize profile.')

			var stmm_options = {
				    method: 'POST',
				    uri: urls.STMM_PERSONALIZE_PROFILE,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			};
			
			var rbmm_options = {
				    method: 'POST',
				    uri: urls.RBMM_PERSONALIZE_PROFILE,
				    body: req.body,
				    json: true // Automatically stringifies the body to JSON
			 };
						
			//chained request			 
			rp(rbmm_options)
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					console.log('user['+user_id+'][RBMM]:', JSON.stringify(response.user_profile))
					
					rbmm_profile  = response.user_profile;
					rbmm_options.uri = urls.STMM_PERSONALIZE_PROFILE
					return rp(stmm_options)
			  })
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}

					console.log('user['+user_id+'][STMM]:', JSON.stringify(response.user_profile))
	
					stmm_profile  = response.user_profile;
					var  hybrid_user_profile = hbmmImpl.personalize_profile(user_id, user_profile, stmm_profile, rbmm_profile)
					
					console.log('user['+user_id+'][HBMM]:', JSON.stringify(hybrid_user_profile))
					
					return res.status(200).json({user_id: user_id, user_profile: hybrid_user_profile});
			  })
			  .catch(function (err) { 
				  console.log('user['+user_id+'][Error]: ', err.response.body)
				  res.status(err.statusCode).json(err.response.body);
			  }) 
	};
	
	/**
	 * A HTTP GET handler for information
	 */
  const get_information =  (req, res) =>  {
	  
    try {
        return res.status(200).json({message: "To personalize weigths do: " +
        		"								HTTP POST /personalize/profile \r\n" +
        		"								Content-Type: application/json \r\n" +
        		"								\r\n" +
        		"								\r\n" +
        		"								{" +
        		"									\"user_id\": Number," +
        		"									\"user_profile\": user profile json" +
        		"								}"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	
  return {
	  personalize_profile,
	  get_information
  };
};

module.exports = ProfilePersonalization;
