const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function regist(data){
	let result = {}
	return new Promise((resolve, reject) => { //新增使用者
		User.create(data, (err) =>{
			if(err){
				result.status = "Create Error";
				if(err.name === 'MongoError' && err.code ===11000){
					result.err = "Username already Exist";
					reject(result);
					return;
				}
				result.err = "server error";
				reject(result);
				return;
			}
			else{
				result.status = "Create Success";
				result.userinfo = data;
				resolve(result);
			}
		});
	});
};