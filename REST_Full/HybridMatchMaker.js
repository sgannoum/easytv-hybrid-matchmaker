/*!
EasyTV Statistical Matchmaker 

Copyright 2017-2020 Center for Research & Technology - HELLAS

Licensed under the New BSD License. You may not use this file except in
compliance with this licence.

You may obtain a copy of the licence at
https://github.com/REMEXLabs/GPII-Statistical-Matchmaker/blob/master/LICENSE.txt


The research leading to these results has received funding from 
the European Union's H2020-ICT-2016-2, ICT-19-2017 Media and content convergence 
under grant agreement no. 761999.
*/



var fluid = require("C:\\Users\\salgan\\git\\universal\\node_modules\\infusion"),
easytv = fluid.registerNamespace("easytv");

var matchMaker = fluid.registerNamespace("easytv.matchMaker");
var hybrid = fluid.registerNamespace("easytv.matchMaker.hybrid");
var hybridMatch = fluid.registerNamespace("easytv.matchMaker.hybrid.match");


// Specify kettel.app invocation path and invocation method
fluid.defaults("easytv.hybridMatchmaker", {
	gradeNames: ["kettle.app", "autoInit"],
        requestHandlers: {
            postHandler: {
                "type": "easytv.matchMaker.hybrid.postHandler",
                "route": "/EasyTV_HBMM_Restful_WS/HBMM/match",
                "method": "post"
            },
            gettHandler: {
                "type": "easytv.matchMaker.hybrid.gettHandler",
                "route": "/EasyTV_HBMM_Restful_WS/HBMM/match",
                "method": "get"
            },
            optiontHandler: {
                "type": "easytv.matchMaker.hybrid.optiontHandler",
                "route": "/EasyTV_HBMM_Restful_WS/HBMM/match",
                "method": "options"
            }
        }
});

// Specify invoker for post match
fluid.defaults("easytv.matchMaker.hybrid.postHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "easytv.matchMaker.hybrid.match.postHandler"
    }
});

//Specify invoker get match
fluid.defaults("easytv.matchMaker.hybrid.gettHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "easytv.matchMaker.hybrid.match.getHandler"
    }
});

//Specify invoker for option match
fluid.defaults("easytv.matchMaker.hybrid.optiontHandler", {
    gradeNames: "kettle.request.http",
    invokers: {
        handleRequest: "easytv.matchMaker.hybrid.match.optionHandler"
    }
});


fluid.require("../lib//HybridMatchMakerData.js", require);
var url = require('url')
var HBMMImpl = require('../lib/HybridMatchMakerImpl.js').HBMMImpl
var hbmmImpl = new HBMMImpl(hybrid.dimensionsHandlers, [0.7, 0.3])

/**
 * A HTTP POST handler for route /match
 */
hybridMatch.postHandler = function (request) {
	try 
	{
		var user_profile = request.req.body
		
		// Rejection tests
		if (!("user_preferences" in user_profile)) { fluid.log("Invalid SMM payload: 'user_preferences' missing."); request.events.onError({message: "Invalid SMM payload: 'user_preferences' missing."}); return;};
		
		request.res.header('Access-Control-Allow-Origin', '*');
		request.res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		request.res.header('Access-Control-Allow-Headers', 'Content-Type');
		
		hbmmImpl.hybridInference(request, user_profile)
		
	} catch(err) {
		fluid.log("====== SMM ERROR ======");
		fluid.log(err);
		console.log(err);
		fluid.log("====== SMM ERROR ======");
		request.events.onError(err);
	}
}

/**
 * A HTTP GET handler for route /match
 */
hybridMatch.getHandler = function (request) {

	request.res.header('Access-Control-Allow-Origin', '*');
	request.res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	request.res.header('Access-Control-Allow-Headers', 'Content-Type');
	request.events.onSuccess.fire({message: "To match a user file do: HTTP POST /match?[radius=number][distance_measure=euclidean|canberra|chebyshev|manhattan][dimensions=[general|visual|auditory|all]+]"});
		
}

/**
 * A HTTP Options handler for route /match
 * Handler of CORS
 */
hybridMatch.optionHandler = function (request) {

	request.res.header('Access-Control-Allow-Origin', '*');
	request.res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	request.res.header('Access-Control-Allow-Headers', 'Content-Type');
	request.events.onSuccess.fire({message: "To match a user file do: HTTP POST /match?[radius=number][distance_measure=euclidean|canberra|chebyshev|manhattan][dimensions=[general|visual|auditory|all]+]"});
		
}

