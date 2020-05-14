const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const hooks = {
  beforeCreate(role) {
    //No pre-processing required
  },
};

const tableName = 'roles';

const Role = sequelize.define('role', {
  roleKey: {
    type: Sequelize.STRING
  },
}, { hooks,
     tableName,
     indexes: [
      {
          unique: true,
          fields: ['roleKey']
      }
  ]
   });

// eslint-disable-next-line
Role.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Role;
