/**
 * A HTTP POST handler for route /match
 */
const UserModel = require('../models/UserModel');
const InteractionEvent = require('../models/InteractionEvent');
const sequelize = require('../config/database');

const endpoint_tag = 'IE';

const InteractionEventsHandler = () => {
  const interaction_events_handler = async (req, res) => {	
	  				
	    /*req.token.id holds the userId of a valid jwt. This argument is returned by the authorization middleware.*/
		var user_id = req.body.user_id
	    
		//find user active profile and then update the events history
	    UserModel.findOne({ where: { userId: user_id, isActive: true }})
	    		 .then( userModel => {
	        			
		        	  if(userModel == null) {
		      			  console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, 'User has no active profile')
		                  return res.status(500).json({ msg: 'Bad Request: No record found.' });
		        	  }
		        		  
		        	  //write events to db
		        	  var events = req.body.interaction_events
		    		  for(i = 0; i < events.length; i++)
		    		  {
			              try {
			            	  
			                  InteractionEvent.create({
  									modelId: userModel.id,
				                    preferences: events[i].preferences,
				                    context: events[i].user_context,
				                    time: events[i].user_context['http://registry.easytv.eu/context/time']
			                  });
			                  
			                } catch (err) {
			                	console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, err)
			                	return res.status(500).json({ msg: 'Internal server error: ' + err });
			                }
		    		  }
		        	  
		              return res.status(200).json({ msg: "Ok" });
		              
		          }).catch( err => {
	                console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, err)
		            return res.status(500).json({ msg: 'Internal server error: ' + err });
		          });
	};
	
  return {
	  interaction_events_handler
  };
};

module.exports = InteractionEventsHandler
