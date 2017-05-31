(function() {

  'use strict';
  angular.module("myApp").controller('modalInstanceController',['$scope','$uibModalInstance','$state','$uibModal','loginService','$rootScope',function($scope,$uibModalInstance,$state,$uibModal,loginService,$rootScope){

    $scope.logout=function(){
      $uibModalInstance.close();
      $state.transitionTo('home');
    }

    $scope.cancel=function(){
      $uibModalInstance.dismiss('cancel');
    }

    $scope.loginUser=function(credentials){
    	$uibModalInstance.close();
         loginService.loginUser(credentials.username,credentials.password).then(function(response){
            console.log("res",response);
            if(response){
                $rootScope.username=response.username;
                $state.transitionTo('main.dashboard');
            }else{
                alert("Incorrect Username/Password"); 
                
            }
        }); 
      }

      $scope.createUser=function(credentials){
        $uibModalInstance.close(); 
        loginService.createUser(credentials.username,credentials.password,credentials.mobile,credentials.email).then(function(response){
          if(!response){
            alert("Unable to create the user");
          }
          else{
            alert("User created succesfully");
                       
          }
        });
      }
  




  }]);

})();