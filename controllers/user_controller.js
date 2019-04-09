const UserModel = require('../models/user_model');

class UserController {
	static signUp(req, res) {
		const newUser = new UserModel({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		newUser
		  .save()
		  .then(doc => res.status(201).json(doc))
		  .catch(err => res.status(500).json({
		  	message: err
		  }))
	}

	static signIn(req, res) {
		UserModel.findOne({
			email: req.body.email
		}).exec()
		  .then(doc => {
		  	if (doc) {
		  		if (doc.password === req.body.password) {
		  			res.status(200).json(doc)
		  		} else {
		  			res.ststus(403).json({
		  				Error: "Password not true"
		  			})
		  		}
		  	} else {
		  		res.status(404).json({
		  			Error: "No such user"
		  		})
		  	}
		  })
		  .catch( err => res.status(500).json({
		  	Error: err
		  }))
	}
}

module.exports = UserController;