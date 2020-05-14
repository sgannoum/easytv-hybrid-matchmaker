const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');

const hooks = {
  beforeCreate(userRole) {
    //No pre-processing required
  },
};

const tableName = 'userRoles';

const UserRole = sequelize.define('userRole', {
 
},
 { hooks,
   tableName,
 });
/*Add a foreign key (`userId`) that points to the table `users`.*/
UserRole.belongsTo(User)
/*Add a foreign key (`roleId`) that points to the table `roles`.*/
UserRole.belongsTo(Role)
User.hasMany(UserRole, {onDelete: 'cascade', hooks:true})

// eslint-disable-next-line
UserRole.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserRole;
