const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const WizardResult = require('./WizardResult');
const sequelize = require('../config/database');
const moment = require('../node_modules/moment');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    user.isActivated = false;
    //5 digit random base64 encoded string.
    user.activationCode = crypto.randomBytes(256).toString('base64').substr(2,5);
    
    user.activationCodeExpiresAt = moment().add(10800, 'seconds').toDate();
  },
};

const tableName = 'users';

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  isActivated:{
    type: Sequelize.BOOLEAN
  },
  activationCode:{
    type: Sequelize.STRING
  },
  activationCodeExpiresAt:{
    type: Sequelize.DATE
  },
  passwordResetCode:{
    type: Sequelize.STRING
  },
  passwordResetCodeExpiresAt:{
    type: Sequelize.DATE
  }
}, { hooks, tableName });

User.belongsTo(WizardResult);

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  delete values.activationCode;
  delete values.activationCodeExpiresAt;
  delete values.isActivated;
  delete values.passwordResetCode;
  delete values.passwordResetCodeExpiresAt;

  return values;
};

module.exports = User;
