(function() {
    'use strict;'
    angular.module("myApp").factory("customerService",['$SQLite','$q','commonService',function($SQLite,$q,commonService){

    	function AddCustomer(firstname,lastname,dob,mobile,email){
	      var deferred=$q.defer();
	      var finalDob=commonService.formatDate(dob);
	      var customerData={
	           firstname:firstname,
	           lastname:lastname,
	           dob:finalDob,
	           mobile:mobile,
	           email:email,
	           status:'active' 
	        };

	        $SQLite.ready(function () {
	             this.insert('customer', customerData).then(function(data){
	               deferred.resolve(data);
	             },function(){
	                deferred.resolve();
	             });
	            
	         });
	        return deferred.promise;
    	}

    	function SearchCustomer(name){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
		         this.selectAll('SELECT * FROM customer WHERE status = ? AND (firstname LIKE ? OR lastname LIKE ?)', [ "active", "%"+name+"%" ,"%"+name+"%"])
		             .then(
		                function () { deferred.resolve(); },
		                function () { alert('Some error, Please login again!'); },
		                function (data) {
		              deferred.resolve(data);
		            });
		        });
    		 return deferred.promise;
    	}


    	function UpdateCustomer(firstname,lastname,dob,mobile,email){
    		 var deferred=$q.defer();
    		 
	         $SQLite.ready(function () {
    		 	this.execute('UPDATE customer SET firstname = ? , lastname = ? ,dob = ? , mobile = ? WHERE email = ?', [ firstname,lastname,dob,mobile,email]).then(function (data) { 
	               deferred.resolve(data);
	             },function(){
	                deferred.resolve();
	             });
    		 });
    		 return deferred.promise;
    	}

    	function SoftDeleteCustomer(email){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
	    		 this.execute('UPDATE customer SET status = ? WHERE email = ?', [ 'delete', email ]).then(function (data) { 
	    		 	deferred.resolve(data); 
	    		 },function(){
	                deferred.resolve();
	             });
		      });
    		 return deferred.promise;
    	}

    	function ListAllDeletedCustomers(){
    		var deferred=$q.defer();
    		$SQLite.ready(function () {
			     this.selectAll('SELECT * FROM customer WHERE status = ?', [ "delete"])
      					.then(
      						function () { deferred.resolve(); },
			                function () { alert('Some error, Please login again!'); },
        					function (result) {
        						deferred.resolve(result);
        		});
		    });
    		return deferred.promise;
    	}

    	function ActiveStatusForCustomer(email){
    		 var deferred=$q.defer();
    		  $SQLite.ready(function () {
	    		 this.execute('UPDATE customer SET status = ? WHERE email = ?', [ 'active', email ]).then(function (data) { 
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
	    		 this.execute('DELETE FROM customer WHERE email = ?', [ email ]).then(function (data) { 
	    		 	deferred.resolve(data); 
	    		 },function(){
	                deferred.resolve();
	             });			                
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