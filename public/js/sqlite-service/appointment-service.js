(function() {
    'use strict;'
    angular.module("myApp").factory("appointmentService",['$SQLite','$q','commonService',function($SQLite,$q,commonService){

    	function BookAppointment(appointment){
	      var deferred=$q.defer();
	      var finalAppDate=commonService.formatDate(appointment.appDate);
	      var appointmentData={
	           doa:finalAppDate,
	           time:appointment.appTime,
	           mobile:appointment.mobile,
	           email:appointment.email,
	           status:'unassigned',
	           completion:'pending' 
	        };

	        $SQLite.ready(function () {
	             this.insert('appointment', appointmentData).then(function(data){
	               deferred.resolve(data);
	             },function(){
	                deferred.resolve();
	             });
	            
	         });
	        return deferred.promise;
    	}

    	function ListAllAppointments(){
    		var deferred=$q.defer();
    		$SQLite.ready(function () {
			     this.selectAll('SELECT * FROM appointment WHERE status = ?', [ "unassigned"])
      					.then(
      						function () { deferred.resolve(); },
			                function () { alert('Some error, Please login again!'); },
        					function (result) {
        						deferred.resolve(result);
        		});
		    });
    		return deferred.promise;
    	}

    	return{      
	        bookAppointment:BookAppointment,
	        listAllAppointments:ListAllAppointments
	    }
	}]);
})();