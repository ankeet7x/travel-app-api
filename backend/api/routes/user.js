const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const saltRounds = 10;

//signupuser
router.post('/signup', (req, res, next) => {
	User.findOne({username: req.body.userName}).exec().then((user) => {
		if (user != null){
			return res.status(500).json({
				message: "userAlreadyExists"
			});
		}else{
			bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
 				if(err){
 					return res.status(500).json({
 						error: err.message
 					});
 				}else{
 					const userData = User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						userName: req.body.userName,
						password: hash,
						phoneNumber: req.body.phoneNumber
					});
 					userData.save().then((user) => {
 						res.status(200).json({
 							message: 'userCreated',
 							user: user
 						});
 					}).catch((err) => {
 						res.status(500).json({
 							err: err.message
 						});
 					});
 				}

			});
		}
	}).catch((err) => {
		res.status(500).json({
			error: err.message
		});
	});
});

//Get all Users
router.get('/', (req, res, next) => {
	User.find().exec().then((users) => {
		res.status(200).json({
			message: "usersFetched",
			noOfUsers: users.length,
			users: users
		})
	}).catch((err) => {
		res.status(500).json({
    		message: "unableToFetchUsers",
    		cause: err.message
    	});
	});
});


//Login user
router.post("/login", (req, res, next) => {
	User.findOne({userName: req.body.username}).exec().then((user) => {
		bcrypt.compare(req.body.password, user.password, function(err, result) {
    		if (err) {
    			return res.status(500).json({
    				err: err,
    				message: "authFailed"
    			});
    		}
    		if(result){
    			const token = jwt.sign({username: user.username}, 'secret', {expiresIn: "400h"});
    			return res.status(200).json({
    				message: "userLoggedIn",
    				token: token,
    				userData: user
    			});
    		}
    		return res.status(500).json({
    				message: "authFailed"
    		});
		});
	}).catch((err) => {
		res.status(500).json({
 			err: err.message,
 				message: "userNotFound"
 		});
	});
});





module.exports = router;


