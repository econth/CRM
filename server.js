
// ====================BASE SETUP(modules) =====================================
var express				= require('express');			//Express Package
var bodyParser 			= require('body-parser');		// 
var methodOverride 		= require('method-override');
var morgan				= require('morgan');			//use to see requests
var mongoose			= require('mongoose');
var path   				= require('path');

require('./models/appointment');
require('./models/customer');
require('./models/employee');
require('./models/user');

//API ROUTES
var appointmentRoutes  	= require('./routes/appointment');
var customerRoutes    	= require('./routes/customer');
var employeeRoutes  	= require('./routes/employee');
var userRoutes    		= require('./routes/user');

var app					= express();					//define the app using express

app.use(morgan('dev')); //HTTP Logger


//====================== APP =================================

//APP configuartion
//use body parser to grab information from POST request

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configure app to handle CORS request

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Orgin','*');
	res.setHeader('Access-Control-Allow-Orgin','GET,POST');
	res.setHeader('Access-Control-Allow-Orgin','X-Request-With,content-type,\Authorization');
	next();
});

//set static files location
//used for request that frontend will make

app.use(express.static(__dirname + '/public'));

//======================== DB ================================

mongoose.connect('mongodb://127.0.0.1:27017/econth');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));

db.once('open',function(callback){
	console.log('MONGO: successfully connected to db');
});


//=================== ROUTES/API =============================


//REGISTER ROUTES

app.use('/appointment',appointmentRoutes);
app.use('/customer',customerRoutes);
app.use('/employee',employeeRoutes);
app.use('/user',userRoutes);

//setup our one route to the index.html file
//route for the home page

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


//==================== START THE SERVER ======================

var port=process.env.PORT || 3000;
app.listen(port);
console.log('Econth is listening on the port '+ port);


//https://github.com/jsprodotcom/source

//https://github.com/NicolasRitouet/kinoa


//http://stackoverflow.com/questions/29099969/angularjs-pass-value-from-one-page-to-another