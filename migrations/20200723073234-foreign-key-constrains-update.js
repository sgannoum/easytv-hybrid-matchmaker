/**
 * 
 */

'use strict';
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
	  return Promise.all([
		  
		  queryInterface.sequelize.transaction(async t => {
		    const tableName = 'InteractionEvents';
		    let constraintName = await queryInterface.sequelize.query(`SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'InteractionEvents' AND COLUMN_NAME = 'modelId' AND REFERENCED_TABLE_NAME = 'userModels';`, { transaction: t, type: QueryTypes.SELECT });
		    
		    if(constraintName.length > 0){
		  	  constraintName = constraintName[0].CONSTRAINT_NAME;
		  	  await queryInterface.sequelize.query(`ALTER TABLE ${tableName} DROP FOREIGN KEY ${constraintName}, ADD CONSTRAINT FOREIGN KEY(modelId) REFERENCES userModels(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		    }
		    else await queryInterface.sequelize.query(`ALTER TABLE ${tableName} ADD CONSTRAINT FOREIGN KEY(modelId) REFERENCES userModels(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		  }),

		  queryInterface.sequelize.transaction(async t => {
		    const tableName = 'ModificationSuggestions';
		    let constraintName = await queryInterface.sequelize.query(`SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'ModificationSuggestions' AND COLUMN_NAME = 'id' AND REFERENCED_TABLE_NAME = 'userModels';`, { transaction: t, type: QueryTypes.SELECT });
		    
		    if(constraintName.length > 0){
		  	  constraintName = constraintName[0].CONSTRAINT_NAME;
		  	  await queryInterface.sequelize.query(`ALTER TABLE ${tableName} DROP FOREIGN KEY ${constraintName}, ADD CONSTRAINT FOREIGN KEY(id) REFERENCES userModels(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		    }
		    else await queryInterface.sequelize.query(`ALTER TABLE ${tableName} ADD CONSTRAINT FOREIGN KEY(id) REFERENCES userModels(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		  }),

		  queryInterface.sequelize.transaction(async t => {
		    const tableName = 'UserHybridRelatedInfo';
		    let constraintName = await queryInterface.sequelize.query(`SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'UserHybridRelatedInfo' AND COLUMN_NAME = 'id' AND REFERENCED_TABLE_NAME = 'users';`, { transaction: t, type: QueryTypes.SELECT });
		    
		    if(constraintName.length > 0){
		  	  constraintName = constraintName[0].CONSTRAINT_NAME;
		  	  await queryInterface.sequelize.query(`ALTER TABLE ${tableName} DROP FOREIGN KEY ${constraintName}, ADD CONSTRAINT FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		    }
		    else await queryInterface.sequelize.query(`ALTER TABLE ${tableName} ADD CONSTRAINT FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`, { transaction: t});
		  })   	  
	  ])
  }
	  
};
