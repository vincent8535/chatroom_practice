const mongoose = require('mongoose');
const MemberSchema = mongoose.Schema;

module.exports = new MemberSchema({
	user: {
		type: String,
		required: true,
		index:{unique:true}
	},
	pswd: {
		type: String,
		required: true,
	},
	permision: {
		type: String,
		default:  "normal"
	}
});