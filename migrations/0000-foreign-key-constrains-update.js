/**
 * 
 */

'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
	  console.log("Add foreign key constrains")
      return Promise.all([
    	  //drop old constrains and create new ones
	     queryInterface.sequelize.query('ALTER TABLE InteractionEvents DROP CONSTRAINT InteractionEvents_ibfk_1;')
	     .catch((err) => {})
 	     .finally(() =>{
 	    	return queryInterface.sequelize.query(
 				  'ALTER TABLE InteractionEvents '+
 	    		  'ADD CONSTRAINT InteractionEvents_ibfk_1 FOREIGN KEY (modelId) REFERENCES userModels (id) ' +
 	    		  'ON DELETE CASCADE ' +
 	    		  'ON UPDATE CASCADE;'
 				)
 	     }),
 				
 	     queryInterface.sequelize.query('ALTER TABLE ModificationSuggestions DROP CONSTRAINT ModificationSuggestions_ibfk_1;')
 	     .catch((err) => {})
 	     .finally(() =>{
 	 		 return queryInterface.sequelize.query(
 	 				  'ALTER TABLE ModificationSuggestions '+
 	 	    		  'ADD CONSTRAINT ModificationSuggestions_ibfk_1 FOREIGN KEY (id) REFERENCES userModels (id) ' +
 	 	    		  'ON DELETE CASCADE ' +
 	 	    		  'ON UPDATE CASCADE;'
 	 				)
 	     }),
 			
 	     queryInterface.sequelize.query('ALTER TABLE UserHybridRelatedInfo DROP CONSTRAINT UserHybridRelatedInfo_ibfk_1;')
 	     .catch((err) => {})
 	     .finally(() =>{
 	 		 return queryInterface.sequelize.query(
 				  'ALTER TABLE UserHybridRelatedInfo '+
 	    		  'ADD CONSTRAINT UserHybridRelatedInfo_ibfk_1 FOREIGN KEY (id) REFERENCES users (id) ' +
 	    		  'ON DELETE CASCADE ' +
 	    		  'ON UPDATE CASCADE;'
 				) 	     
 		})
    	 
    ]);
  }
};
