/**
 * A HTTP POST handler for route /match
 */
var hybrid = require("../lib/HybridMatchMakerData.js");
var HBMMImpl = require('../lib/HybridMatchMakerImpl.js').HBMMImpl
var hbmmImpl = new HBMMImpl(hybrid.dimensionsHandlers, [0.7, 0.3])

const EndPoints = () => {
  const postMatchHandler = (req, res) => {
		try 
		{			
			const user_profile = req.body;
			
			// Rejection tests
			if (!user_profile) { return res.status(500).json({ msg: 'No user profile' });};
			
			//infer profiles
			 hbmmImpl.hybridInference(req, res, user_profile)
			
		} catch(err) {
	        console.log(err);
	        return res.status(500).json({ msg: 'Internal server error' });
		}
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
