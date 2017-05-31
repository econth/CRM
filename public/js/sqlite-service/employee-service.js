(function() {
    'use strict;'
    angular.module("myApp").factory("employeeService",['$SQLite','$q','commonService',function($SQLite,$q,commonService){

    	function AddEmployee(firstname,lastname,dob,mobile,email){
	      var deferred=$q.defer();
	      var finalDob=commonService.formatDate(dob);
	      var employeeData={
	           firstname:firstname,
	           lastname:lastname,
	           dob:finalDob,
	           mobile:mobile,
	           email:email,
	           status:'active' 
	        };

	        $SQLite.ready(function () {
	             this.insert('employee', employeeData).then(function(data){
	               deferred.resolve(data);
	             },function(){
	                deferred.resolve();
	             });
	            
	         });
	        return deferred.promise;
    	}

    	function SearchEmployee(name){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
		         this.selectAll('SELECT * FROM employee WHERE status = ? AND (firstname LIKE ? OR lastname LIKE ?)', [ "active", "%"+name+"%" ,"%"+name+"%"])
		             .then(
		                function () { deferred.resolve(); },
		                function () { alert('Some error, Please login again!'); },
		                function (data) {
		              deferred.resolve(data);
		            });
		        });
    		 return deferred.promise;
    	}


    	function UpdateEmployee(firstname,lastname,dob,mobile,email){
    		 var deferred=$q.defer();
    		 
	         $SQLite.ready(function () {
    		 	this.execute('UPDATE employee SET firstname = ? , lastname = ? ,dob = ? , mobile = ? WHERE email = ?', [ firstname,lastname,dob,mobile,email]).then(function (data) { 
	               deferred.resolve(data);
	             },function(){
	                deferred.resolve();
	             });
    		 });
    		 return deferred.promise;
    	}

    	function SoftDeleteEmployee(email){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
	    		 this.execute('UPDATE employee SET status = ? WHERE email = ?', [ 'delete', email ]).then(function (data) { 
	    		 	deferred.resolve(data); 
	    		 },function(){
	                deferred.resolve();
	             });
		      });
    		 return deferred.promise;
    	}

    	function ListAllDeletedEmployees(){
    		var deferred=$q.defer();
    		$SQLite.ready(function () {
			     this.selectAll('SELECT * FROM employee WHERE status = ?', [ "delete"])
      					.then(
      						function () { deferred.resolve(); },
			                function () { alert('Some error, Please login again!'); },
        					function (result) {
        						deferred.resolve(result);
        		});
		    });
    		return deferred.promise;
    	}

    	function ActiveStatusForEmployee(email){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
	    		 this.execute('UPDATE employee SET status = ? WHERE email = ?', [ 'active', email ]).then(function (data) { 
	    		 	deferred.resolve(data); 
	    		 },function(){
	                deferred.resolve();
	             });
			                
		      });
    		 return deferred.promise;
    	}

    	function DeletePermanently(email){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
	    		 this.execute('DELETE FROM employee WHERE email = ?', [ email ]).then(function (data) { 
	    		 	deferred.resolve(data); 
	    		 },function(){
	                deferred.resolve();
	             });			                
		      });
    		 return deferred.promise;
    	}

    	return{      
	        addEmployee:AddEmployee,
	        searchEmployee:SearchEmployee,
	        updateEmployee:UpdateEmployee,
	        softDeleteEmployee:SoftDeleteEmployee,
	        listAllDeletedEmployees:ListAllDeletedEmployees,
	        activeStatusForEmployee:ActiveStatusForEmployee,
	        deletePermanently:DeletePermanently
    	}
	}]);
})();