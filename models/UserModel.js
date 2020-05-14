const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const hooks = {
  beforeCreate(userModel) {
    //No pre-processing required
  },
};

const tableName = 'userModels';

const UserModel = sequelize.define('userModel', {
  userModel: {
    type: Sequelize.JSON
  },
  userContext: {
	    type: Sequelize.JSON
  },
  userContent: {
	    type: Sequelize.JSON
  },
  name: {
    type: Sequelize.STRING
  },
  isActive:{
    /*
      This signifies that a particular user model is to be used by the software that makes the ui adaptations,
      as well as by the matchmaker. Only one user model for a user can be active. This is not enforced by the sql
      schema but rather it is being enforced by the application server. A better option would have probably been
      to use a separate table to store this information, but considering that in a later stage, there may be only
      one user model per user, the present solution would require less changes. In any case this section can be reviewed
      in the future. 
    */
    type: Sequelize.BOOLEAN
  },
}, { hooks,
     tableName,
     /*Add a composite unique key that includes the columns `name` and `userId` (the foreign key).
     This means that for any user, their user models should have a unique name.*/
     indexes: [
      {
          unique: true,
          fields: ['name', 'userId']
      }
  ]
   });
/*Add a foreign key (`userId`) that points to the table `users`.*/
User.hasMany(UserModel, {as: 'UserModels'})

// eslint-disable-next-line
UserModel.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserModel;
