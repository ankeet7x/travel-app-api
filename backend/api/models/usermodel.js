const mongoose = require('mongoose');


const userModel = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: Number,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('User', userModel);