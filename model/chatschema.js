const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema;

module.exports = new ChatSchema({
	name: {
		type: String,
		required: true,
	},
	msg: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true
	}
});