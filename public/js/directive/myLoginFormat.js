(function() {
	'use strict;'
	angular.module("myApp").directive("myLoginFormat",function(){
		return{
			restrict:'AE',
			templateUrl:'Partials/login.html'
		};
	});
})();