const {EventEmitter} = require('events');
const mongoose = require('./model/db_connector');
const chatschema = require('./model/chatschema');
const memberschema = require('./model/memberschema');
const Message = mongoose.model('Message', chatschema);
const User = mongoose.model('User', memberschema);

let instance;
let data = [];
let Max = 10;

class Storage extends EventEmitter{
	constructor(){
		super();
	}
	
	push(msg){
		const m = new Message(msg);
		
		m.save();
		
		this.emit("new_message", msg);
		//data.push(msg);
		
		Message.count().then((count) => {
			if(count >= Max){
				Message.find().sort({'time': 1}).limit(1).then((res) =>{
					Message.findByIdandRemove(res[0]._id);
				});
			}
		});
		//this.emit("new_message", msg);
	}
	
	get(callback){
		Message.find((err, msgs) => {
			callback(msgs);
		});
	}
	
	setMax(max){
		Max = max;
	}
	
	getMax(){
		return Max;
	}
	
	login(data){
		var account = data.user;
		User.findOne({user:account}, (err, res) => {
			if(res){
				console.log(res);
				var passwrd = res.pswd;
				if(data.pswd === passwrd){
					this.emit("Chatroom", account);
					console.log("login success");
				}
				else{
					this.emit("Loginfail");
					console.log("login faile");
				}
			}
		});
	}
	
	regist(data){
		var account = data.user;
		User.findOne({user:account}, (err, res) => {
			if(!res){
				console.log("no data");
				const newaccount = new User(data);
				newaccount.save();
				this.emit("Chatroom", account);
				console.log("regist and login");
			}
			else{
				console.log("already exist");
			}
		});
		
		//var check = User.find(data, function(err, res) {});
	}
}

module.exports = (function(){
	if(!instance){
		instance = new Storage();
	}
	
	return instance;
})();