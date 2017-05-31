var mongoose=require('mongoose');

var appointmentSchema=new mongoose.Schema({
	doa:{
		type:String,
		required:true
	},
	time:{
		type:String,
		required:true
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
	},
	completion:{
		type:String
	},
	name:{
		type:String
	},
	appNo:{
		type:String
	},
	invoiceNo:{
		type:String
	}
});

module.exports=mongoose.model('Appointment',appointmentSchema);
