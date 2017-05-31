var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Appointment=mongoose.model('Appointment');

router.get('/getAppointments', function(req, res) {
	 Appointment.find().exec(function(err, appointments){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json(appointments);
            }
        });
});

router.post('/bookAppointment', function(req, res) {

    var newData={
        doa:req.body.appDate,
        time:req.body.appTime,
        mobile:req.body.mobile,
        email:req.body.email,
        status:"unassigned",
        completion:"pending"
    };
	
    var appointment=new Appointment(newData);

	appointment.save(function(err,createdAppointment){
		if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(createdAppointment);
            res.end();
        }
	});
});

module.exports = router;