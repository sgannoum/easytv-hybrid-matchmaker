/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js').msg
const JWTService = require('../services/auth.service');


const UserLogin = () => {
	
   //TODO remove
   const getDummyToken = (req, res) => {
	   
	  const user_id = req.body.user_id
	  console.log(user_id)
      return res.status(200).json({jwt : JWTService().issue({id: user_id})});
   };	
	
  const login = (req, res) => {
	  
	  const user_id = req.token.id;
	  
	  //TODO prepare db
	  //TODO load any user' related informations
	  //TODO check for user history of interaction suggestions
	  
      return res.status(200).json({user_id : user_id});
  };
	
  const logout =  (req, res) =>  {
	    
	  const user_id = req.token.id;

	 //TODO clean any db information
	 //TODO save any informations

      return res.status(200).json({msg : "ok"});
  };

  return {
	  login,
	  logout,
	  getDummyToken
  };
};

module.exports = UserLogin;
