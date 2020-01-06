const mongoose = require('./db_connector');
const memberschema = require('./memberschema');
const User = mongoose.model('User', memberschema);

module.exports = function get(){
	let result = {};
	return new Promise((resolve,reject) =>{ //找全部使用者
		User.find({}, (err, res)=>{
			console.log("result");
			result.member = res;
			resolve(result);
			console.log(res);
		});
	});
};