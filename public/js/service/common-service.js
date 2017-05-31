(function() {
    'use strict;'
    angular.module("myApp").factory("commonService",[function(){

    	var updateData={};
    	
    	function FormatDate(date) {
	      var d = new Date(date),
	      month = '' + (d.getMonth() + 1),
	      day = '' + d.getDate(),
	      year = d.getFullYear();

	      if (month.length < 2) month = '0' + month;
	      if (day.length < 2) day = '0' + day;

	      return [day, month, year].join('/');
	    }

	    function DateToDateObject(date){
	    	var dateString = date; 
			var dateParts = dateString.split("/");
			var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); 
			return dateObject;
	    }

	    function GetUpdateData(){
	    	return updateData;
	    }

	    function SetUpdateData(data){
	    	//r finalDate=new Date(data.dob).toString();
	    	console.log("data",data);
	    	updateData={
	    		_id			:data._id,
				firstname	:data.firstname,
				lastname	:data.lastname,
				mobile 		:data.mobile,
				dob			:DateToDateObject(data.dob),
				email		:data.email
			};

			
	    }

    	return {
    		formatDate 		:FormatDate,
    		getUpdateData 	:GetUpdateData,
    		setUpdateData 	:SetUpdateData
    	}

    }]);

})();    
