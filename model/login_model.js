const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function login(data){
	let result = {}
	return new Promise((resolve, reject) => {
		var account = data.user;
		User.findOne({user:account}, (err, res) => { //比對資料
			if(err){
				console.log(err);
				result.status = "Login Fail";
				result.err = "server error";
				reject(result);
				return;
			}
			if(res){
				console.log(res);
				resolve(res);
			}
			else{
				result.status = "Login Fail";
				result.err = "No account";
				reject(result);
				return;
			}
		});
	});
};