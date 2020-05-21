/**
 * A HTTP POST handler for route /match
 */
const InteractionEvent = require('../models/InteractionEvent');
const usersInfoHandler = require("../lib/UsersInfoHandler.js").instance;
const sequelize = require('../config/database');
const UserModel = require('../models/UserModel');
const ModificationSuggestions = require('../models/ModificationSuggestions');

const endpoint_tag = 'IE';

const InteractionEventsHandler = () => {
	
  const getActiveProfileSuggestion = (req, res) => {
	  
	  /*req.token.id holds the userId of a valid jwt. This argument is returned by the authorization middleware.*/
	  const user_id = req.token.id
	  
	  //get and update user suggestions
	  return sequelize.transaction(async (t) => {
	    	
	    	//find active profile id
	    	 const userModel = await UserModel.findOne({
	    		 	  where: { userId: user_id, isActive: true},
	    	          transaction: t,
	    	          lock: t.LOCK.SHARE })
	    	
	    	 if(userModel == null) {
	  			  console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, 'User has no active profile')
	              return res.status(400).json({ msg: 'Bad Request: No record found.' });
	    	 }
	    	
	    	 //profile modification suggestions
	    	 var profileSuggestion = await ModificationSuggestions.findOne({
			    			 					 where: { id: userModel.userId },
									    		 transaction: t, 
								    	         lock: t.LOCK.UPDATE })
								    	         
		     console.log('[INFO][%s][%d]: %s', endpoint_tag, user_id, profileSuggestion == null ? 'User has no profile modification suggestions' : JSON.stringify(profileSuggestion))  
	    	
		     if(profileSuggestion == null) return {suggestion: {}}
	    	 
	    	 //reset user associated suggestions
	    	 await ModificationSuggestions.update (
					 values  = { suggestion: {} },
					 options = { where: { id: userModel.userId },
		    			 	     transaction: t})
		    			 	    
		     return profileSuggestion  
	    		
	      }).then(result => {
	    	// Committed
                return res.status(200).json({user_id: user_id, profile_modification_suggestions: result.suggestion});
	      }).catch(err => {
	    	// Rolled back
                return res.status(500).json({ msg: 'Internal server error: ' + err });
	      }); 
  }
	
	
  const handleInteractionEvents = async (req, res) => {	
	  				
		/*req.token.id holds the userId of a valid jwt. This argument is returned by the authorization middleware.*/
		const user_id = req.token.id
	    
		//find user active profile and then update the events history
	    UserModel
	     .findOne({ where: { userId: user_id, isActive: true }})
		 .then( userModel => {
				
	    	  if(userModel == null) {
	  			  console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, 'User has no active profile')
	              return res.status(500).json({ msg: 'Bad Request: No record found.' });
	    	  }
	    		  
	    	  //write events to db
	    	  var instances = []
			  for(const event of req.body.interaction_events)
				  instances.push({modelId: userModel.id,
				                  preferences: event.preferences,
				                  context: event.user_context,
				                  time: event.user_context['http://registry.easytv.eu/context/time']})
	    	    
			  //persists
	          InteractionEvent
		          .bulkCreate(instances)
		          .then(() => {
		        	  return res.status(200).json({ msg: "Ok" });
		          })
		    	  .catch (err => {
		            	throw err
		          })   
	          
	      }).catch( err => {
	        console.error('[ERROR][%s][%d]: %s', endpoint_tag, user_id, err)
	        return res.status(500).json({ msg: 'Internal server error: ' + err });
	      });
	};
	
  return {
	  getActiveProfileSuggestion,
	  handleInteractionEvents
  };
};

module.exports = InteractionEventsHandler
