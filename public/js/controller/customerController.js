(function() {
	'use strict;'
	angular.module("myApp").controller("customerController", function($scope,$state,$window,customerService,commonService){

		$scope.customer={};
		$scope.customers=[];
		$scope.result=[];
		$scope.deletedData=[];

  		$scope.currentPage = 1;
  		$scope.maxSize = 2;
  		$scope.itemsPerPage = 2;

  		initController();
  		
		function initController(){
			if($state.current.data){
				if($state.current.data.deletedCustomer){
					customerService.listAllDeletedCustomers().then(function(data){
						 if(!data){
				            $scope.alerts = [{ type: 'danger', msg: 'Unable to find any Inactive Customer' }];
				          }
				          else{
				            $scope.deletedData=data; 
				            $scope.totalItems = $scope.deletedData.length; 
				          }
					});
				}
				if($state.current.data.updateCustomer){
					$scope.update=commonService.getUpdateData();
				}
			}
		}

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
  		};
	

		$scope.addCustomer=function (customer) {
			customerService.addCustomer(customer.firstname,customer.lastname,customer.dob,customer.mobilenumber,customer.email).then(function(response){
	          if(!response){
	             $scope.alerts = [{ type: 'warning', msg: 'OOPS!!! Customer is not added' }];
	          }
	          else{
	            $scope.alerts = [{ type: 'success', msg: 'Well done! You successfully added a new customer' }];
	            $scope.customer={};
	                       
	          }
        	});
		}

		$scope.searchCustomer=function(name){
			$scope.result=[];
			customerService.searchCustomer(name).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to find any Customer' }];
	          }
	          else{
	          	$scope.alerts = [{ type: 'success', msg: data.length + ' customer(s) found' }];
	            $scope.result=data; 
	            $scope.totalItems = $scope.result.length;
	          }
        	});
		}

		$scope.updateCustomer=function(customer,id){
			console.log("Customer,id",customer);
			console.log("Customer,id",id);

			customerService.updateCustomer(customer.firstname,customer.lastname,customer.dob,customer.mobilenumber,customer.email,id).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to update the Customer' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Updated the Customer' }];
	          }
        	});
		}

		$scope.updateCustomerPage=function(customer){
			commonService.setUpdateData(customer);
			$state.go('main.updateCustomer');
		}

	
		$scope.softDeleteCustomer=function(id){
			customerService.softDeleteCustomer(id).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to soft delete the Customer' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Soft Deleted the customer succesfully' }];
	          }
        	});
		}

		$scope.activeStatusForCustomer=function(id){
			customerService.activeStatusForCustomer(id).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'warning', msg: 'Unable to change the status for Customer' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Customer marked as Active' }];
	          }
        	});
		}

		$scope.deletePermanently=function(id){
			customerService.deletePermanently(id).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to delete the Customer' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Deleted the customer succesfully' }];
	          }
        	});
		}

		$scope.reset=function(){
			$scope.customer={};
		}

		$scope.cancel=function(){
			$scope.customer={};
			$window.history.back();
		}
	});

})();