var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
	username:{
		type:String,
		unique:true
	},
	password:{
		type:String
	},
	firstname:{
		type:String
	},
	lastname:{
		type:String
	},
	empId:{
		type:String
	},
	dob:{
		type:String
	},	
	mobile:{
		type:String,
		required:true
	},
	email:{
		type:String,
		unique:true,
		required:true,
		lowercase: true, 
		trim: true
	},
	firstLogin:{
		type:Boolean
	},
	status:{
		type:String
	},
	role:{
		type:String
	}

});

module.exports=mongoose.model('User',userSchema);
