/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
const JWTService = require('../services/auth.service');
const usersInfoHandler = require("../lib/UsersInfoHandler.js").instance;
const sequelize = require('../config/database');
const UserModel = require('../models/UserModel');
const ModificationSuggestions = require('../models/ModificationSuggestions');

const endpoint_tag = 'LG';

const Personalization = () => {
	
   //TODO to be removed
   const getDummyToken = (req, res) => {
	   
	  const user_id = req.body.user_id
	  console.log("Autherize user_id:",user_id)
      return res.status(200).json({jwt : JWTService().issue({id: user_id})});
	  
   };	
  
  const login =  (req, res) =>  {
	    
	  const user_id = req.token.id;
	  
	  //load user hybrid related information
	  usersInfoHandler.load(user_id);
	  
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

module.exports = Personalization;
