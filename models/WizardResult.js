const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const hooks = {
  beforeCreate(wizardResult) {
    //No pre-processing required
  },
};

const tableName = 'wizardResult';

const WizardResult = sequelize.define('wizardResult', {
  colorset: {
    type: Sequelize.INTEGER
  },
  fontsize: {
    type: Sequelize.INTEGER
  },
  volume:{
    type: Sequelize.INTEGER
  },
  csColors:{
    type: Sequelize.JSON
  },
}, { hooks, tableName, });

// eslint-disable-next-line
WizardResult.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = WizardResult;
