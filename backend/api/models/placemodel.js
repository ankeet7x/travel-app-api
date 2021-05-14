const mongoose = require('mongoose');


const placeModel = mongoose.Schema({
	placeName: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	placeImage: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Place', placeModel);