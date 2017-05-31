(function() {
	'use strict;'
	angular.module("myApp").controller("employeeController", function($scope,$state,$window,employeeService,commonService){

		$scope.employee={};
		$scope.employees=[];
		$scope.result=[];
		$scope.deletedData=[];

  		$scope.currentPage = 1;
  		$scope.maxSize = 2;
  		$scope.itemsPerPage = 2;

  		initController();
  		
		function initController(){

			if($state.current.data){
				if($state.current.data.deletedEmployee){
					employeeService.listAllDeletedEmployees().then(function(data){
						 if(!data){
				           $scope.alerts = [{ type: 'danger', msg: 'Unable to find any Inactive Employee' }];
				          }
				          else{
				            $scope.deletedData=data; 
				            $scope.totalItems = $scope.deletedData.length; 
				          }
					});
				}
				if($state.current.data.updateEmployee){
					$scope.update=commonService.getUpdateData();
				}
			}
		}

		$scope.closeAlert = function(index) {
    		$scope.alerts.splice(index, 1);
  		};
	

		$scope.addEmployee=function (employee) {
			employeeService.addEmployee(employee.firstname,employee.lastname,employee.dob,employee.mobilenumber,employee.email).then(function(response){
	          if(!response){
	             $scope.alerts = [{ type: 'warning', msg: 'OOPS!!! Employee is not added' }];
	          }
	          else{
	            $scope.alerts = [{ type: 'success', msg: 'Well done! You successfully added a new employee' }];
	            $scope.employee={};
	                       
	          }
        	});
		}

		$scope.searchEmployee=function(name){
			$scope.result=[];
			employeeService.searchEmployee(name).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to find any Employee' }];
	          }
	          else{
	          	$scope.alerts = [{ type: 'success', msg: data.length + ' Employee(s) found' }];
	            $scope.result=data; 
	            $scope.totalItems = $scope.result.length;
	          }
        	});
		}

		$scope.updateEmployee=function(employee){
			employeeService.updateEmployee(employee.firstname,employee.lastname,employee.dob,employee.mobile,employee.email).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to update the Employee' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Updated the Employee' }];
	          }
        	});
		}

		$scope.updateEmployeePage=function(employee){
			commonService.setUpdateData(employee);
			$state.go('main.updateEmployee');
		}
		
	
		$scope.deleteEmployee=function(email){
			employeeService.softDeleteEmployee(email).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to delete the Employee' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Soft Deleted the Employee succesfully' }];
	          }
        	});
		}

		$scope.activeStatusForEmployee=function(email){
			employeeService.activeStatusForEmployee(email).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'warning', msg: 'Unable to change the status for Employee' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Employee marked as Active' }];
	          }
        	});
		}

		$scope.deletePermanently=function(email){
			employeeService.deletePermanently(email).then(function(data){
	          if(!data){
	            $scope.alerts = [{ type: 'danger', msg: 'Unable to delete the Employee' }];
	          }
	          else{
	           	$scope.alerts = [{ type: 'success', msg: 'Deleted the Employee succesfully' }];
	          }
        	});
		}

		$scope.reset=function(){
			$scope.employee={};
		}

		$scope.cancel=function(){
			$scope.employee={};
			$window.history.back();
		}

  
	});

})();