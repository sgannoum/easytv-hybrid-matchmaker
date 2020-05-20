/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
const usersInfoHandler = require("../lib/UsersInfoHandler.js").instance;
const JWTService = require('../services/auth.service');
const sequelize = require('../config/database');
const UserModel = require('../models/UserModel');
const ModificationSuggestions = require('../models/ModificationSuggestions');

const endpoint_tag = 'LG';

const UserLogin = () => {
	
   //TODO to be removed
   const getDummyToken = (req, res) => {
	   
	  const user_id = req.body.user_id
	  console.log(user_id)
      return res.status(200).json({jwt : JWTService().issue({id: user_id})});
	  
   };	
	
  const login = async (req, res) => {
	  
	  const user_id = req.token.id;
	  
	  //load user hybrid related information
	  await usersInfoHandler.load(user_id);
	  
	  //get and update user suggestions
	  return sequelize.transaction(async (t) => {
	    	
	    	//find active profile id
	    	 const userModel = await UserModel.findOne({
	    		 	  where: { userId: user_id, isActive: true},
	    	          transaction: t,
	    	          lock: t.LOCK.SHARE })
	    	
	    	 if(userModel == null) {
	  			  console.error('[ERROR][LG][%d]: %s', user_id, 'User has no active profile')
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
	  
      return res.status(200).json({user_id : user_id});
  };
	
  const logout =  (req, res) =>  {
	    
	  const user_id = req.token.id;
	  console.log('[INFO][LO][%d]: %s', user_id, 'User logout')

	  //persist user information
	  usersInfoHandler.save(user_id)
	  .then( () => {
	  		return res.status(200).json({msg : "ok"})})
	  .catch(err => {
           	return res.status(500).json({ msg: 'Internal server error: ' + err });
	  }); 
  };

  return {
	  login,
	  logout,
	  getDummyToken
  };
};

module.exports = UserLogin;
