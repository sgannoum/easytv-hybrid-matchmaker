const database = require('../config/database');
const Role = require('../models/Role');
const Sequelize = require('sequelize');
const path = require('path')
const Umzug = require('umzug')

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startMigrateFalse = async () => {
    try {
    //  await dropDB();
      await syncDB();

      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateTrue = async () => {
    try {
      const umzug = new Umzug({
        migrations: {
          // indicates the folder containing the migration .js files
          path: './migrations',
          // inject sequelize's QueryInterface in the migrations
          params: [
            database.getQueryInterface()
          ]
        },
        // indicates that the migration data should be store in the database
        // itself through sequelize. The default configuration creates a table
        // named `SequelizeMeta`.
        storage: 'sequelize',
        storageOptions: {
          sequelize: database
        }
      })
      //Do all migrations
      await umzug.up()
      console.log('\nAll migrations performed successfully\n')

      //await syncDB();
      //Create the 'admin' role if not exists. The following record is needed for some services (e.g. login).
      let role = await Role
        .findOne({
          where: {
            roleKey: 'admin',
          }
        });

      if(!role){
        await Role.create({
          roleKey: 'admin',
        });
      }      
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    var done = false;
    while (!done) {
      try {
        await authenticateDB();
        await startMigrateTrue();

        done = true;
      } catch (err) {
        errorDBStart(err);
      }

      if (!done) {
        // When starting the database with docker-compose, sometimes the API starts before the db is ready.
        // Retry in 3 seconds
        await sleep(3000);
      }
    }
  };
  

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'staging':
        await startStage();
        break;
      case 'testing':
        await startTest();
        break;
      case 'production':
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
