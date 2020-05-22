const sequelize = require('../config/database');
const usersInfoHandler = require("../lib/UsersInfoHandler.js").instance;


function onSignal () {
	  console.log('Server is starting cleanup...');
	  return usersInfoHandler.close()
							 .then(() => {
								    // Close all connections used by this sequelize instance, and free all references so the instance can be garbage collected.
								  console.log('Saving data to db...done');
								  sequelize.close();
							  })
							  .then(() => {
								  console.log('Closing all db connections...done');
							  })
}

function onShutdown () {
  console.log('Cleanup finished, server is shutting down');
}

const options = {
  // cleanup options
  timeout: 10000,                   // [optional = 1000] number of milliseconds before forceful exiting
  signals: ['SIGINT', 'SIGHUP', 'SIGTERM'],
  onSignal,                        // [optional] cleanup function, returning a promise (used to be onSigterm)
  onShutdown,                      // [optional] called right before exiting
  logger: console.log              // [optional] logger function to be called with errors. Example logger call: ('error happened during shutdown', error). See terminus.js for more details.
}

module.exports = options