const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/bookingmodel');
const checkPermission = require("../middleware/authChecker");

//Add booking
router.post('/', (req, res, next) => {
	const bookingScene = Booking({
		_id: mongoose.Types.ObjectId(),
		place: req.body.place,
		bookedBy: req.body.bookedBy,
		date: req.body.date
	});
	bookingScene.save().then((doc) => {
		res.status(200).json({
			message: "booked",
			bookingModel: doc
		})
	}).catch((err) => {
		res.status(500).json({
			message: "errorSaving",
			error: err.message
		});
	});
});


//Find all bookings
router.get('/', (req, res, next) => {
	Booking.find().exec().then((bookings) => {
		res.status(200).json({
			message: "gotBookings",
			bookings: bookings
		})
	}).catch((err) => {
		res.status(500).json({
			message: "errorGettingBookings",
			error: err.message
		})
	});
});


//Find Booking of specific user
router.get("/:userId", (req, res, next) => {
	Booking.find({bookedBy: req.params.userId}).exec().then((doc) => {
		res.status(200).json({
			message: "fetchedBookingOfCurrentUser",
			details: doc
		})
	}).catch((err) => {
		res.status(500).json({
			message: "failedFetchingBookingOfCurrentUser",
			error: err.message
		})
	});
});

//Delete specific Booking of specific user
router.delete("/:bookingId", (req, res, next) => {
	Booking.deleteOne({_id: req.params.bookingId}).exec().then((booking) => {
		res.status(200).json({
			message: "deletedBooking",
			bookingData: booking
		})
	}).catch((err) => {
		res.status(500).json({
			message: "errorInBookingDeletion",
			error: err.message
		})
	})
});


module.exports = router;