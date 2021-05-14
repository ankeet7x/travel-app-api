const mongoose = require('mongoose');

const bookingModel = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Place",
		required: true
	},

	bookedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});


module.exports = mongoose.model('Booking', bookingModel);