var mongoose=require('mongoose');

var customerSchema=new mongoose.Schema({
	firstname:{
		type:String,
		required:true
	},
	lastname:{
		type:String,
		required:true
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
	status:{
		type:String
	}
});

module.exports=mongoose.model('Customer',customerSchema);

