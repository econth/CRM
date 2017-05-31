(function() {
	'use strict;'
	angular.module("myApp").controller("homeController", function($scope,$uibModal){

		$scope.myInterval = 5000;
  		$scope.noWrapSlides = false;
  		$scope.country="in";
  		$scope.active = 0;
		$scope.slides = [];
		var currIndex = 0;

		for (currIndex = 0; currIndex < 3; currIndex++) {
			$scope.slides.push({
		      image: 'img/image_'+currIndex+'.jpg',
		      text: ['Digital Transformation','Mobile touch'][$scope.slides.length % 2],
		      id: currIndex
			});
		}

		$scope.countries=["in","us","fr","gb","it"];

		$scope.changeCountry=function (country) {
			$scope.country=country;
		}

		$scope.loginModal=function(){
			 var modalInstance = $uibModal.open({
       			 templateUrl: 'view/login.html',
       			 controller: 'modalInstanceController'  
       			       			
   			 });
		}

		$scope.registerModal=function(){
			var modalInstance = $uibModal.open({
       			 templateUrl: 'partials/register.html',
       			 controller: 'modalInstanceController'

   			 });
		}
		


	});

})();