/**
 * A HTTP POST handler for route /match
 */
var hybrid = require("../lib/HybridMatchMakerData.js");
var HBMMImpl = require('../lib/HybridMatchMakerImpl.js').HBMMImpl
var hbmmImpl = new HBMMImpl(hybrid.dimensionsHandlers, [0.7, 0.3])
var rp = require('request-promise')

const STMM_HOST = process.env.STMM_HOST || 'localhost';
const RBMM_HOST = process.env.RBMM_HOST || 'localhost';

const STMM_PORT = process.env.STMM_PORT || "8077";
const RBMM_PORT = process.env.RBMM_PORT || "8080";

const STMM_URL = 'http://' + STMM_HOST + ":" + STMM_PORT + "/EasyTV_STMM_Restful_WS";
const RBMM_URL = 'http://' + RBMM_HOST + ":" + RBMM_PORT + "/EasyTV_RBMM_Restful_WS";

const STMM_PERSONALIZATION_URL = STMM_URL + "/match";
const RBMM_PERSONALIZATION_URL = RBMM_URL + "/match";
const STMM_CONTENT_ADAPTATION_URL = STMM_URL + "/content";
const RBMM_CONTENT_ADAPTATION_URL = RBMM_URL + "/content";

console.log("Connect to stmm on Url: "+ STMM_URL)
console.log("Connect to rbmm on Url: "+ RBMM_URL)

const EndPoints = () => {
  const postMatchHandler = (req, res) => {	
	  
			const user_profile = req.body;
			var stmm_profile;
			var rbmm_profile;
			
			// Rejection tests
			if (!user_profile) { return res.status(500).json({ msg: 'No user profile' });};
						 
			var stmm_options = {
				    method: 'POST',
				    uri: STMM_PERSONALIZATION_URL,
				    body: user_profile,
				    json: true // Automatically stringifies the body to JSON
			 };
			
			//chained request			 
			rp(stmm_options)
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}
					
					if(!("user_preferences" in response)) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}

					stmm_profile  = response;
	
					stmm_options.uri = RBMM_PERSONALIZATION_URL
					return rp(stmm_options)
					
			  })
			  .then( function (response) {
					
					if(response == undefined) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}
					
					if(!("user_preferences" in response)) {
						res.status(500).json({ msg: 'Internal server error' });
						return
					}

					rbmm_profile  = response;
					
					var  hybrid_user_profile = hbmmImpl.hybridInference(stmm_profile, rbmm_profile, user_profile)
					return res.status(200).json(hybrid_user_profile);
			  })
			  .catch(function (err) { 
				  console.log(err)
				  res.status(500).json({ msg: 'Internal server error' });
			  }) 

	};
	
	/**
	 * A HTTP GET handler for route /match
	 */
  const getMatchtHandler =  (req, res) =>  {
	  
    try {
        return res.status(200).json({message: "To match a user file do: HTTP POST /match?[radius=number][distance_measure=euclidean|canberra|chebyshev|manhattan][dimensions=[general|visual|auditory|all]+]"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
	
	};

	/**
	 * A HTTP POST handler for route /match
	 */
  const postContentAdaptation = (req, res) => {
		try 
		{
			const {mpd, user_profile} = req.body;
			
			//infer profiles
			hbmmImpl.hybridContentAdaptation(res, user_profile)	
			
		} catch(err) {
	        console.log(err);
	        return res.status(500).json({ msg: 'Internal server error' });
		}
	}

	
  return {
	  postMatchHandler,
	  getMatchtHandler,
	  postContentAdaptation
	  };
};

module.exports = EndPoints;
