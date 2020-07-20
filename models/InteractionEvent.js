const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./UserModel');

const hooks = {
  beforeCreate(event) {
	  //nothing to do
  },
};

const tableName = 'InteractionEvents';

const InteractionEvent = sequelize.define('InteractionEvents', {
  modelId: {
	    type: Sequelize.INTEGER,
	    onDelete: 'CASCADE',
	    onUpdate: 'CASCADE',
	    references: {
	        model: UserModel,
	        key: 'id',
	        deferrable: Sequelize.INITIALLY_IMMEDIATE
	      }
  },
  preferences: {
    type: Sequelize.JSON
  },
  context: {
    type: Sequelize.JSON
  },
  time:{
    type: Sequelize.TIME, allowNull: false
  },
}, { hooks: hooks,
	 timestamps: false,
	 tableName: tableName});
	
// eslint-disable-next-line
InteractionEvent.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = InteractionEvent;
