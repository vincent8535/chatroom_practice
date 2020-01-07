const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function login(data){
	let result = {}
	return new Promise((resolve, reject) => {
		var account = data.user;
		User.findOne({user:account}, (err, res) => { //比對資料
			if(err){
				result.status = "Login Fail";
				result.err = "server error";
				reject(result);
				return;
			}
			if(res){
				if(res.pswd === data.pswd){
					result.status ="Login success"
					result.userinfo = res;
					resolve(result);
				}else{
					result.status = "Login Fail";
					result.err = "Wrong pswd";
					reject(result);
					return;
				}
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