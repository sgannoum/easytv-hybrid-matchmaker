const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./UserModel');

const hooks = {
  beforeCreate(event) {
	  //nothing to do
  },
};

const tableName = 'ModificationSuggestions';

const ModificationSuggestions = sequelize.define('ModificationSuggestions', {
  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    references: {
	        model: UserModel,
	        key: 'id',
	        deferrable: Sequelize.INITIALLY_IMMEDIATE
	      }
  },
  suggestion: {
    type: Sequelize.JSON
  }
}, { hooks: hooks,
	 timestamps: false,
	 tableName: tableName});
	
// eslint-disable-next-line
ModificationSuggestions.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ModificationSuggestions;
