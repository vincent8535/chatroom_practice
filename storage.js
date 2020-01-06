const {EventEmitter} = require('events');
const mongoose = require('./model/db_connector');
const chatschema = require('./model/chatschema');
const memberschema = require('./model/memberschema');
const Message = mongoose.model('Message', chatschema);
const User = mongoose.model('User', memberschema);

let instance;
let data = [];
let Max = 10;

//處理聊天室用事件
class Storage extends EventEmitter{
	constructor(){
		super();
	}
	
	push(msg){
		const m = new Message(msg);
		
		m.save();
		
		this.emit("new_message", msg);
		
		Message.count().then((count) => {
			if(count >= Max){
				Message.find().sort({'time': 1}).limit(1).then((res) =>{
					Message.findByIdandRemove(res[0]._id);
				});
			}
		});
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
}

module.exports = (function(){
	if(!instance){
		instance = new Storage();
	}
	
	return instance;
})();