/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js').msg
const UserModel = require('../models/UserModel');
const sequelize = require('../config/database');

const endpoint_tag = 'PCxt';

const ContextPersonalization = () => {
  const personalize_context = (req, res) => {	
		 	
	  		/*req.token.id holds the userId of a valid jwt. This argument is returned by the authorization middleware.*/
			const user_id = req.token.id
	  
			// Check for user profile
			if (!req.body.user_profile) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_profile.msg_text)
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			// Check for user profile
			if (!req.body.user_context) { 
				console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, msg.missing_user_context.msg_text)
				return res.status(500).json({ code: msg.missing_user_context.msg_code, 
					  						  msg: msg.missing_user_context.msg_text });
			}

			var stmm_profile;
			var rbmm_profile;
			const radius = '?radius=' + (req.query.radius || '0.3') 
			const user_profile = req.body.user_profile
			const user_context = req.body.user_context
			
			console.log('[INFO][%s][%d]: %s', endpoint_tag, user_id, JSON.stringify(req.body))

			var stmm_options = {
			    method: 'POST',
			    uri: urls.STMM_PERSONALIZE_CONTEXT + radius,
			    body: req.body,
			    json: true // Automatically stringifies the body to JSON
			};
			
			var rbmm_options = {
			    method: 'POST',
			    uri: urls.RBMM_PERSONALIZE_CONTEXT,
			    body: req.body,
			    json: true // Automatically stringifies the body to JSON
			};
					
			//chained request to rbmm			 
			rp(rbmm_options)
			  .then((response) => {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
					
					console.log('[INFO][%s][%d][RBMM]: %s', endpoint_tag, user_id, JSON.stringify(response.user_profile))
					
					//set rbmm profile
					rbmm_profile  = response.user_profile;
					
					return rp(stmm_options)
			  })
			  .catch((err) => { 
				  if(!res.finished) {
					  console.error('[ERROR][%s][%d][RBMM]: %s', endpoint_tag, user_id, err)

					  if(err.error.code == 'ECONNREFUSED')	  
						  res.status(500).json({msg: 'Internal server error'});
					  else 
						  res.status(500).json(err.error);
				  }
			  }) 
			
			//chained request to stmm			 
			  .then((response) => {
					
					if(response == undefined) {
						res.status(400).json({ msg: 'Internal server error' });
						return
					}
	
					console.log('[INFO][%s][%d][STMM]: %s', endpoint_tag, user_id, JSON.stringify(response.user_profile))
	
					//set stmm profile
					stmm_profile  = response.user_profile;
					
					hbmmImpl
					.personalize_context(user_id, user_profile, stmm_profile, rbmm_profile, user_context)
					.then(hybrid_user_profile => {
						
						console.log('[INFO][%s][%d][HBMM]: %s', endpoint_tag, user_id, JSON.stringify(hybrid_user_profile))
						
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
					    	 await userModel.update({ userContext: user_context }, { transaction: t})
					    	 
					      }).then(result => {
				                return res.status(200).json({user_id: user_id, user_profile: hybrid_user_profile});
					      }).catch(err => {
					    	  	console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, 'User has no active profile');
				                return res.status(500).json({ msg: 'Internal server error: ' + err });
					      }); 
					})
			  })
			  .catch((err) => {
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
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	
  return {
	  personalize_context,
	  get_information
	  };
};

module.exports = ContextPersonalization;
