const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./User');

const hooks = {
  beforeCreate(event) {
	  //nothing to do
  },
};

const tableName = 'UserHybridRelatedInfo';

const UserHybridRelatedInfo = sequelize.define('UserHybridRelatedInfo', {
  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    onDelete: 'CASCADE',
	    onUpdate: 'CASCADE',
	    references: {
	        model: Users,
	        key: 'id',
	        deferrable: Sequelize.INITIALLY_IMMEDIATE
	      }
  },
  user_profile: {
	    type: Sequelize.JSON
  },
  rbmm_profile: {
	    type: Sequelize.JSON
  },
  stmm_profile: {
	    type: Sequelize.JSON
  },
  rbmm_weight: {
    type: Sequelize.DOUBLE
  },
  stmm_weight: {
	type: Sequelize.DOUBLE
  }
}, { hooks: hooks,
	 timestamps: false,
	 tableName: tableName});
	
// eslint-disable-next-line
UserHybridRelatedInfo.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserHybridRelatedInfo;
