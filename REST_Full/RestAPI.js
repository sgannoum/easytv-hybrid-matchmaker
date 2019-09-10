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

/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

//environment: development, staging, testing, production
const environment = process.env.NODE_ENV || 'development';

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const config = require('../config');
const mappedOpenRoutes = mapRoutes(config.publicRoutes, './REST_FULL/');


//secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//fill routes for express application
app.use('/EasyTV_HBMM_Restful_WS', mappedOpenRoutes);

server.listen(config.port, () => {
	if (environment !== 'production' &&
	 environment !== 'development' &&
	 environment !== 'testing'
	) {
	 console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
	 process.exit(1);
	}	
	console.log('Server up, listening to port ' + config.port);
});

