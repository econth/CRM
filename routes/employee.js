var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Employee=mongoose.model('User');


router.post('/addEmployee', function(req, res) {
    var newData={
        firstname	:req.body.firstname,
        lastname	:req.body.lastname,
        dob			:req.body.dob,
        mobile		:req.body.mobilenumber,
        email		:req.body.email,
        status		:"active",
        role        :"E"
    };
	
    var employee=new Employee(newData);

	employee.save(function(err,newEmployee){
		if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(newEmployee);
            res.end();
        }
	});
});

router.get('/searchEmployee/:firstname', function(req, res) {
        Employee.find({$or:[{firstname: req.params.firstname},{lastname: req.params.firstname}]}).exec(function (err, employee) { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(employee);
        }
    });

        
});

router.get('/getInactiveEmployees', function(req, res) {
        Employee.find({status: "deleted"}).exec(function (err, employee) { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(employee);
        }
    });
});


router.put('/inactiveEmployee/:id', function (req, res) {
   
    var updateData = { 
         status     :"deleted"
    };

    Employee.update({_id: req.params.id }, updateData, function(err, employee) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                error: err
            });
            res.end();
        }
        else {
            res.json({
                status: 200,
                employee: employee
            });
            res.end();
        }
    });
});

router.put('/updateEmployee/:id', function (req, res) {
   
    var updateData = { 
        firstname   :req.body.firstname,
        lastname    :req.body.lastname,
        dob         :req.body.dob,
        mobile      :req.body.mobile,
        email       :req.body.email,
        status      :"active"
    };

    Employee.update({_id: req.params.id }, updateData, function(err, employee) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                error: err
            });
            res.end();
        }
        else {
            res.json({
                status: 200,
                employee: employee
            });
            res.end();
        }
    });
});

router.put('/activeEmployee/:id', function (req, res) {
   
    var updateData = { 
         status     :"active"
    };

    Employee.update({_id: req.params.id }, updateData, function(err, employee) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                error: err
            });
            res.end();
        }
        else {
            res.json({
                status: 200,
                employee: employee
            });
            res.end();
        }
    });
});



 router.delete('/deleteEmployee/:id', function(req, res) {
        Employee.remove({_id: req.params.id }, function(err, employee) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    error: err
                });
                res.end();
            }
            else {
                res.json({
                    status: 200,
                    message: 'Employee successfully deleted'
                });
                res.end();
            }   
        });
    });


module.exports = router;