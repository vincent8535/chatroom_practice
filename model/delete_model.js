const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function erase(data){
	result = {};
	return new Promise((resolve, reject) =>{
		User.deleteOne(data, (err, res)=>{
			if(err){
				result.status = "delete fail";
				result.err = "server error";
				reject(result);
				return;
			}
			if(res){
				result.status = "delete success";
				result.delteinfo = data;
				resolve(result);
			}
			else{
				result.status = "delete fail";
				result.err = "no data";
				reject(result);
				return;
			}
		});
	});
}