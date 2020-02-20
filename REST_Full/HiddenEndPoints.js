/**
 * A HTTP POST handler for route /match
 */
var hbmmImpl =  require('../lib/HybridMatchMakerImpl.js').hbmmImpl
var rp = require('request-promise')
var urls = require('./URLs.js')
var msg = require('./Messages.js')


const endpoint_tag = 'Hid';

const HiddenEndPoints = () => {
  const get_Rbmm_Rules = (req, res) => {
	  
	  
		console.log('[INFO][%s][RBMM]: get rules request from url %s', endpoint_tag, urls.RBMM_RULES)

		var rbmm_options = {
			    method: 'GET',
			    uri: urls.RBMM_RULES,
			    json: true // Automatically stringifies the body to JSON
		};
		
		//set request to rbmm			 
		rp(rbmm_options)
		  .then( function (response) {
				
				if(response == undefined) {
					res.status(400).json({ msg: 'Internal server error' });
					return
				}
				
				console.log('[INFO][%s][RBMM]: %s', endpoint_tag, JSON.stringify(response))
				
				return res.status(200).json(response);
		  })
		  .catch(function (err) { 
			  	res.status(500).json(err.error);
		  }) 
  };
  
  const post_Rbmm_Rules = (req, res) => {
	  
		console.log('[INFO][%s][RBMM]: post rules request to url %s', endpoint_tag, urls.RBMM_RULES)
	  
		var rbmm_options = {
			    method: 'POST',
			    uri: urls.RBMM_RULES,
			    body: req.body,
			    json: true // Automatically stringifies the body to JSON
		};
		
		//set request to rbmm			 
		rp(rbmm_options)
		  .then( function (response) {
				
				if(response == undefined) {
					res.status(400).json({ msg: 'Internal server error' });
					return
				}
				
				console.log('[INFO][%s][RBMM]: %s', endpoint_tag, JSON.stringify(response))
				
				return res.status(200).json(response);
		  })
		  .catch(function (err) { 
			  	res.status(500).json(err.error);
		  }) 
  };

  const get_stmm_profiles = (req, res) => {	  
		console.log('[INFO][%s][STMM]: get rules request from url %s', endpoint_tag, urls.STMM_PROFILES)

		var rbmm_options = {
			    method: 'GET',
			    uri: urls.STMM_PROFILES,
			    json: true // Automatically stringifies the body to JSON
		};
		
		//set request to rbmm			 
		rp(rbmm_options)
		  .then( function (response) {
				
				if(response == undefined) {
					res.status(400).json({ msg: 'Internal server error' });
					return
				}
				
				console.log('[INFO][%s][STMM]: %s', endpoint_tag, JSON.stringify(response))
				
				return res.status(200).json(response);
		  })
		  .catch(function (err) { 
			  	res.status(500).json(err.error);
		  }) 
  };

  const post_stmm_profiles = (req, res) => {
		console.log('[INFO][%s][STMM]: post rules request to url %s', endpoint_tag, urls.STMM_PROFILES)
		  
		var rbmm_options = {
			    method: 'POST',
			    uri: urls.STMM_PROFILES,
			    body: req.body,
			    json: true // Automatically stringifies the body to JSON
		};
		
		//set request to rbmm			 
		rp(rbmm_options)
		  .then( function (response) {
				
				if(response == undefined) {
					res.status(400).json({ msg: 'Internal server error' });
					return
				}
				
				console.log('[INFO][%s][STMM]: %s', endpoint_tag, JSON.stringify(response))
				
				return res.status(200).json(response);
		  })
		  .catch(function (err) { 
			  	res.status(500).json(err.error);
		  }) 
  };

	
  return {
	  get_Rbmm_Rules,
	  post_Rbmm_Rules,
	  get_stmm_profiles,
	  post_stmm_profiles
  };
};

module.exports = HiddenEndPoints;
