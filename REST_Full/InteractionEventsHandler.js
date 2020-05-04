/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')
var DataBaseHandler = require('../lib/DataBaseHandler.js')

const endpoint_tag = 'IE';

const InteractionEventsHandler = () => {
  const interaction_events_handler = (req, res) => {	
	  	
			// Check for user Id
			if (!req.body.user_id) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_id.msg_text)
				return res.status(500).json({ code: msg.missing_user_id.msg_code, 
										      msg: msg.missing_user_id.msg_text });
			}
			
			// Check for user profile
			if (!req.body.interaction_events) { 
				console.error('[ERROR][%s]: %s', endpoint_tag, msg.missing_user_profile.msg_text)
				return res.status(500).json({ code: msg.missing_user_profile.msg_code, 
											  msg: msg.missing_user_profile.msg_text });
			}
			
			var user_id = req.body.user_id
			var interaction_events = req.body
			console.log('[INFO][%s][%d]: %s', endpoint_tag, user_id, JSON.stringify(interaction_events))
						 
			try 
			{		
				//update event
				DataBaseHandler.update_event_db(interaction_events);
				
				return res.status(200).json({ msg: "Ok" });;
				
			} catch(err) {
		        console.log('user['+user_id+'][ERROR]: ',err);
		    	if(err instanceof TypeError)
			        return res.status(500).json({ msg: err.message });
		    	else
		    		return res.status(500).json({ msg: 'Internal server error' });
			}
	};
	
  return {
	  interaction_events_handler
  };
};

module.exports = InteractionEventsHandler
