(function() {
    'use strict;'
    angular.module("myApp").factory("employeeService",['$SQLite','$q','$http','commonService',function($SQLite,$q,$http,commonService){

    	function AddEmployee(firstname,lastname,dob,mobile,email){
	      var deferred=$q.defer();
	      var finalDob=commonService.formatDate(dob);
	      var employeeData={
	           firstname	:firstname,
	           lastname		:lastname,
	           dob 			:finalDob,
	           mobilenumber	:mobile,
	           email		:email
	        };

	        $http.post('/employee/addEmployee', employeeData)
            	.success(function(data) { 
                	deferred.resolve(data);
            	}).error(function(msg, code) {
                	deferred.reject(msg);
        	});
	        return deferred.promise;
    	}

    	function SearchEmployee(name){
    		 var deferred=$q.defer();
    		  $http.get('/employee/searchEmployee/'+ name)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            }); 
    		 return deferred.promise;
    	}


    	function UpdateEmployee(firstname,lastname,dob,mobile,email,id){
			 var deferred=$q.defer();
			 var finalDob=commonService.formatDate(dob);
		     var employeeData={
		           firstname:firstname,
		           lastname	:lastname,
		           dob   	:finalDob,
		           mobile	:mobile,
		           email	:email 
		      };

		      $http.put('/employee/updateEmployee/'+ id, employeeData)
	            .success(function(data) { 
	                deferred.resolve(data);
	            }).error(function(msg, code) {
	                deferred.reject(msg);
             });
    		 return deferred.promise;
    	}

    	function SoftDeleteEmployee(id){
    		 var deferred=$q.defer();
    		 $http.put('/employee/inactiveEmployee/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
             });  
    		 return deferred.promise;
    	}

    	function ListAllDeletedEmployees(){
    		var deferred=$q.defer();
    		 $http.get('/employee/getInactiveEmployees')
                .success(function(data) { 
                    console.log("data",data);
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
    		return deferred.promise;
    	}

    	function ActiveStatusForEmployee(id){
    		 var deferred=$q.defer();
    		 $http.put('/employee/activeEmployee/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
             });
    		 return deferred.promise;
    	}

    	function DeletePermanently(id){
    		 var deferred=$q.defer();
    		 $http.delete('/employee/deleteEmployee/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
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