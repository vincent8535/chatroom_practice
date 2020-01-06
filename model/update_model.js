const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function update(data){
	let result = {};
	return new Promise((resolve, reject) =>{
		console.log("update");
		User.updateOne({user:data.user}, data, (err, res)=>{
			if(err){
				
				result.status = "Update Fail";
				result.err = "Server Error";
				reject(result);
				return;
			}
			if(res){
				result.status = "Update success";
				result.userinfo = data;
				resolve(result);
			}
			else{
				result.status = "Update Fail";
				result.err = "No user";
				reject(result);
				return;
			}
		});
	});
}