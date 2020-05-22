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
const { createTerminus } = require('@godaddy/terminus')

//environment: development, staging, testing, production
const environment = process.env.NODE_ENV || 'development';

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const config = require('../config');
const path = process.cwd().endsWith('REST_Full') ? './' : './REST_Full/' 
const mappedOpenRoutes = mapRoutes(config.publicRoutes, path);
const mappedAuthRoutes = mapRoutes(config.privateRoutes, path);
const dbService = require('../services/db.service');
const auth = require('../policies/auth.policy');
const shutdown = require('../policies/shutdown.policy');
const DB = dbService(environment, config.migrate).start();

//Api handler
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../api-docs/API_description.js');
app.use('/EasyTV_HBMM_Restful_WS/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

//allow cross origin requests
//configure to only allow requests from certain origins
app.use(cors());

//secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//secure your private routes with jwt authentication middleware
app.all('/EasyTV_HBMM_Restful_WS/\personalize|\interaction/*', (req, res, next) => auth(req, res, next));

//fill routes for express application
app.use('/EasyTV_HBMM_Restful_WS', mappedAuthRoutes);
app.use('/EasyTV_HBMM_Restful_WS', mappedOpenRoutes);


//set server shutdown policy
createTerminus(server, shutdown)

//server listen
server.listen(config.port, () => {
	if (environment !== 'production' &&
	 environment !== 'development' &&
	 environment !== 'testing'
	) {
	 console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
	 process.exit(1);
	}	
	console.log('Server up, listening to port ' + config.port);
	
	return DB;
});

