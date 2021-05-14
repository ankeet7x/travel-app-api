const express = require('express');
const router = express.Router();
const multer = require('multer');
const Place = require('../models/placemodel');
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/');
    },
    filename: function(req, file, callback){
        callback(null, new Date().toString() + file.originalname);
    }
});
const upload = multer({storage: storage});



//Upload posts
router.post('/', upload.single('placeImage'), (req, res, next) => {
	console.log(req.file);
	const travelDestination = Place({
		placeName: req.body.name,
		price: req.body.price,
		placeImage: req.file.path
	});
	travelDestination.save().then((destination) => {
		res.status(200).json({
			message: "addedPlace",
			place: destination
		})
	}).catch((err) => {
		res.status(500).json({
			error: err.message,
		});
	});
});


//Get all places
router.get('/', (req, res, next) => {
	Place.find().exec().then((places) => {
		res.status(200).json({
			destinations: places.length,
			message: "placesFetched",
			places: places
		})
	}).catch((err) => {
		res.status(500).json({
			error: err.message
		});
	});
});


//Get place by name
router.get('/:placeName', (req, res, next) => {
	Place.findOne({placeName: req.params.placeName}).exec().then((place) => {
		res.status(200).json({
			message: "placeFetched",
			place: place
		})
	}).catch((err) => {
		res.status(200).json({
			error: err.message
		});
	});
});

//Delete place by name
router.delete('/:placeName', (req, res, next) => {
	Place.deleteOne({placeName: req.params.placeName}).exec().then((place) => {
		res.status(200).json({
			message: 'placeDeleted',
			place: place
		})
	}).catch((err) => {
		res.status(500).json({})
	});
});



module.exports = router;