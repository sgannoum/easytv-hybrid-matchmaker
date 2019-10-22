/**
 * A HTTP POST handler for route /personalize/weigths
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var urls = require('./URLs.js')
var msg = require('./Messages.js')

const WeigthsPersonalization = () => {
	
	/**
	 * A HTTP GET handler for route /match
	 */
  const personalize_weights =  (req, res) =>  {
	  
		// Check for user Id
		if (!req.body.user_id) { 
			console.log('A request with missing user_id')
			return res.status(500).json({ code: msg.missing_user_id.msg_code, 
									      msg: msg.missing_user_id.msg_text });
		}
		
		// Check for user profile
		if (!req.body.user_preferences) { 
			console.log('A request with missing user_preferences')
			return res.status(500).json({ code: msg.missing_user_preferences.msg_code, 
										  msg: msg.missing_user_preferences.msg_text });
		}
				
		const user_id = req.body.user_id
		const user_preferences = req.body.user_preferences
		
		console.log('user['+user_id+']: ','personalize weigths')

		//update user weights
		hbmmImpl.update_user_weights(user_id, user_preferences)
	  
    try {
        return res.status(200).json({ code: msg.success.msg_code, msg: msg.success.msg_text });
      } catch (err) {
        console.log('user['+user_id+']: ', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};
	
	/**
	 * A HTTP GET handler for information
	 */
  const get_information =  (req, res) =>  {
	  
    try {
        return res.status(200).json({message: "To change the weigths of the user profile: " +
	    		"								HTTP POST /personalize/weigths \r\n" +
	    		"								Content-Type: application/json \r\n" +
	    		"								\r\n" +
	    		"								\r\n" +
	    		"								{" +
	    		"									\"user_id\": Number," +
	    		"									\"user_preferences\": user default preferences json" +
	    		"								}"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	//TO-DO add a method that takes one or more preferences and update the weigths of the associated
	//user
	
  return {
	  personalize_weights,
	  get_information
	  };
};

module.exports = WeigthsPersonalization;
