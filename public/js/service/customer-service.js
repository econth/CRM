(function() {
    'use strict;'
    angular.module("myApp").factory("customerService",['$http','$q','commonService',function($http,$q,commonService){

    	function AddCustomer(firstname,lastname,dob,mobile,email){
    	      var deferred=$q.defer();
    	      var finalDob=commonService.formatDate(dob);
    	      var customerData={
    	           firstname:firstname,
    	           lastname	:lastname,
    	           dob   	:finalDob,
    	           mobile	:mobile,
    	           email	:email 
	        };

            $http.post('/customer/addCustomer', customerData)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
	        return deferred.promise;
    	}

    	function SearchCustomer(name){
    		var deferred=$q.defer();
            $http.get('/customer/searchCustomer/'+ name)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
    		 return deferred.promise;
    	}


    	function UpdateCustomer(firstname,lastname,dob,mobile,email,id){
			 var deferred=$q.defer();
			 var finalDob=commonService.formatDate(dob);
		     var customerData={
		           firstname:firstname,
		           lastname	:lastname,
		           dob   	:finalDob,
		           mobile	:mobile,
		           email	:email 
		      };
			  
			  $http.put('/customer/updateCustomer/'+ id, customerData)
	            .success(function(data) { 
	                deferred.resolve(data);
	            }).error(function(msg, code) {
	                deferred.reject(msg);
             });
	         
    		 return deferred.promise;
    	}

    	function SoftDeleteCustomer(id){
    		 var deferred=$q.defer();
    		  $http.put('/customer/inactiveCustomer/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
             }); 
    		 return deferred.promise;
    	}

    	function ListAllDeletedCustomers(){
    		var deferred=$q.defer();
    		 $http.get('/customer/getInactiveCustomers')
                .success(function(data) { 
                    console.log("data",data);
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
    		return deferred.promise;
    	}

    	function ActiveStatusForCustomer(id){
    		 var deferred=$q.defer();
    		  $http.put('/customer/activeCustomer/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
             });
    		 return deferred.promise;
    	}

    	function DeletePermanently(id){
    		 var deferred=$q.defer();
    		 $http.delete('/customer/deleteCustomer/'+ id)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
             }); 
    		 return deferred.promise;
    	}

    	return{      
	        addCustomer:AddCustomer,
	        searchCustomer:SearchCustomer,
	        updateCustomer:UpdateCustomer,
	        softDeleteCustomer:SoftDeleteCustomer,
	        listAllDeletedCustomers:ListAllDeletedCustomers,
	        activeStatusForCustomer:ActiveStatusForCustomer,
	        deletePermanently:DeletePermanently
    	}
	}]);
})();