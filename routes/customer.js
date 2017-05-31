var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Customer=mongoose.model('User');


router.get('/searchCustomer/:firstname', function(req, res) {
    Customer.find({$or:[{firstname: req.params.firstname},{lastname: req.params.firstname}]}).exec(function (err, customer) { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(customer);
        }
    });
});

router.get('/getInactiveCustomers', function(req, res) {
    Customer.find({status: "deleted"}).exec(function (err, customer) { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(customer);
        }
    });
});

router.post('/addCustomer', function(req, res) {
    var newData={
        firstname	:req.body.firstname,
        lastname	:req.body.lastname,
        dob			:req.body.dob,
        mobile		:req.body.mobile,
        email		:req.body.email,
        status		:"active"
    };
	
    var customer=new Customer(newData);

	customer.save(function(err,newCustomer){
		if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(newCustomer);
            res.end();
        }
	});
});

router.put('/inactiveCustomer/:id', function (req, res) {
   
    var updateData = { 
         status     :"deleted"
    };
    console.log("1");

    Customer.update({_id: req.params.id }, updateData, function(err, customer) {
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
                customer: customer
            });
            res.end();
        }
    });
});

router.put('/updateCustomer/:id', function (req, res) {
   
    var updateData = { 
        firstname   :req.body.firstname,
        lastname    :req.body.lastname,
        dob         :req.body.dob,
        mobile      :req.body.mobile,
        email       :req.body.email,
        status      :"active"
    };

    Customer.update({_id: req.params.id }, updateData, function(err, customer) {
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
                customer: customer
            });
            res.end();
        }
    });
});

router.put('/activeCustomer/:id', function (req, res) {
   
    var updateData = { 
         status     :"active"
    };

    Customer.update({_id: req.params.id }, updateData, function(err, customer) {
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
                customer: customer
            });
            res.end();
        }
    });
});



 router.delete('/deleteCustomer/:id', function(req, res) {
        Customer.remove({_id: req.params.id }, function(err, customer) {
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
                    message: 'Customer successfully deleted'
                });
                res.end();
            }   
        });
    });

module.exports = router;