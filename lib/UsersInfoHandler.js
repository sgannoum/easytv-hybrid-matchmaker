const UserHybridRelatedInfo = require('../models/UserHybridRelatedInfo');
const sequelize = require('../config/database');

class UsersInfoHandler {
	
	constructor() {
		this.UsersInfo = new Map();
	}
	
	/**
	 * Get the current user associated weights
	 */
	async load(user_id){
		
		//load from db
		return UserHybridRelatedInfo.findOrCreate({
  		 	  where: { id: user_id },
  		 	  defaults: {
					id: user_id,
					user_profile: {"user_preferences": {"default": {"preferences": {}}}}, 
					stmm_profile: {"user_preferences": {"default": {"preferences": {}}, "recommendations":{"preferences":{}}}},
					rbmm_profile: {"user_preferences": {"default": {"preferences": {}}, "recommendations":{"preferences":{}}}},
					rbmm_weight: 0.5,
					stmm_weight: 0.5
				}
		})
		.then(result => {
			//update the map entry
			this.UsersInfo.set(user_id, result[0])
			return result[0]
		})
		.catch(erro => {
			throw erro
		})
	}
	
	/**
	 * Get the current user associated weights
	 */
	get_user(user_id){
		
		//get user entry
		var entry = this.UsersInfo.get(user_id)
		if(entry != undefined && entry != null)
			return entry;
		else 
			throw new Error("User is not logged in");
	}

	/**
	 * Update user entry
	 */
	update_user(user_id, entry){
		this.UsersInfo.set(user_id, entry)
	}
	
	/**
	 * Persist user data to DB
	 */
	async save(user_id){

		if(this.UsersInfo.has(user_id)){
			var entry = this.UsersInfo.get(user_id)
			this.UsersInfo.delete(user_id)
			return entry.save();
		}
		else
			return new Promise((resolve) => { resolve("Success!") }) 
			
	}
	
}

var instance = new UsersInfoHandler()

//Export singltone
module.exports.instance = instance
