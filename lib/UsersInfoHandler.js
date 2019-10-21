/**
 * 
 */

class Entry{
	constructor(stmm_profile = undefined, rbmm_profile = undefined, user_weights = [0.5, 0.5]) {
		this.user_weights = user_weights
		this.stmm_profile = stmm_profile
		this.rbmm_profile = rbmm_profile
	}
	
	update(entry){
		this.user_weights = entry.user_weights
		this.stmm_profile = entry.stmm_profile
		this.rbmm_profile = entry.rbmm_profile
	}
	
	get_user_weights(){
		return this.user_weights
	}
	
	set_user_weights(user_weights){
		this.user_weights = user_weights
	}
	
	get_stmm_profile(){
		return this.stmm_profile
	}
	
	set_stmm_profile(stmm_profile){
		this.stmm_profile = stmm_profile
	}
	
	get_rbmm_profile(){
		return this.rbmm_profile
	}
	
	set_rbmm_profile(rbmm_profile){
		this.rbmm_profile = rbmm_profile
	}
}



class UsersInfoHandler {
	
	constructor() {
		this.UsersInfo = new Map();
	}
	
	/**
	 * Get the current user associated weights
	 */
	get_entry(user_id){
		
		//get user entry
		var entry = this.UsersInfo.get(user_id)
		
		if(entry == undefined){
			entry = new Entry()
			this.UsersInfo.set(user_id, entry)
		}
		
		//copy and return entry
		var other_entry = new Entry()
		other_entry.update(entry)
		return other_entry
	}
	
	update_entry(user_id, entry){
		
		//get user entry
		var user_entry = this.UsersInfo.get(user_id)
		
		if(user_entry == undefined){
			//TO-DO throw exception
		}
		
		//get user entry
		user_entry.update(entry)
	}
	
}

//Export singltone
module.exports.instance = new UsersInfoHandler()
