(function() {

  'use strict;'

  angular.module('myApp').provider('deletedCustomer',function(){

  	this.$get=function($q,customerService){
  		return{
  			inactive:function(){
  				return customerService.listAllDeletedCustomers();
  			}
  		}
  	};
  });

})();
