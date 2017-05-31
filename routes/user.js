var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=mongoose.model('User');

router.post('/loginUser', function(req, res) {
    User.findOne({$and:[{username: req.body.username},{password: req.body.password}]}).exec(function (err, user) { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(user);
        }
    });
});

router.post('/addUser', function(req, res) {
   var userData={
        username	:req.body.username,
        password	:req.body.password,
        mobile		:req.body.mobile,
        email		:req.body.email,
        firstLogin	:true,
        role        :"C"
    };
	
    var user=new User(userData);

	user.save(function(err,newUser){
		if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(newUser);
            res.end();
        }
	});
});

module.exports = router;