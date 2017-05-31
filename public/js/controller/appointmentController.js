(function() {
	'use strict;'
	angular.module("myApp").controller("appointmentController", function($scope,$state,appointmentService){

		$scope.appointment={};
		$scope.appointments=[];
		$scope.appointmentData=[];

		$scope.currentPage = 1;
  		$scope.maxSize = 2;
  		$scope.itemsPerPage = 2;

  		initController();

  		function initController(){
  			if($state.current.data){
				if($state.current.data.appointments){
					appointmentService.listAllAppointments().then(function(data){
						 if(!data){
				            $scope.alerts = [{ type: 'danger', msg: 'Unable to find any Appointments' }];
				          }
				          else{
				            $scope.appointmentData=data; 
				            $scope.totalItems = $scope.appointmentData.length; 
				          }
					});
				}
			}
  		}

		$scope.bookAppointment=function (appointment) {
			appointmentService.bookAppointment(appointment.appdate,appointment.apptime,appointment.mobilenumber,appointment.email).then(function(response){
	          if(!response){
	             $scope.alerts = [{ type: 'warning', msg: 'OOPS!!! Unable to book appointment' }];
	          }
	          else{
	            $scope.alerts = [{ type: 'success', msg: 'Well done! Appointment has been booked' }];
	            $scope.appointment={};
	                       
	          }
        	});
		}

		$scope.closeAlert = function(index) {
    		$scope.alerts.splice(index, 1);
  		};

		$scope.reset=function(){
			$scope.appointment={};
		}
	});

})();