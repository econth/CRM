(function() {

	'use strict';
	angular.module("myApp").controller('loginController',['$scope','$state',function($scope,$state){

		$scope.login=publicLoginFunction;
		$scope.newUser=publicNewUserFunction;
		$scope.cancel=publicCancelFunction;
		$scope.register=publicRegisterFunction;
		$scope.showLoginForm=true;
		$scope.showRegisterForm=false;

		initController();

		function initController(){
			//loginService.clearCredentials();
		}

		

		function publicLoginFunction(credentials){
			$scope.dataLoading=true;

		/*	loginService.login(credentials.username,credentials.password,function(response){
				if(response.success){
					loginService.setCredentials($scope.username,$scope.password);
					$state.go('home');
				}else{
					 alert(response.message);
	                 $scope.dataLoading = false;
				}
			}); */

			$state.go('main.dashboard');
		}

		function publicNewUserFunction(){
			$scope.showLoginForm=!$scope.showLoginForm;
			$scope.showRegisterForm=!$scope.showRegisterForm;
		}

		function publicCancelFunction(){
			$scope.showLoginForm=!$scope.showLoginForm;
			$scope.showRegisterForm=!$scope.showRegisterForm;
		}

		function publicRegisterFunction(user){
			$scope.dataLoading=true;

			// userService.createUser(user.username,user.password,user.email,user.mobile,function(response){
			// 	if(response.success){
			// 		$scope.cancel();
			// 	}else{
			// 		alert(response.message);
			// 		 $scope.dataLoading = false;
			// 	}
			// });
		}
	}]);

})();