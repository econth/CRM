(function() {
	'use strict;'
	angular.module("myApp").directive("myDateField",function(){
		return{
			restrict:'EA',
			require:'ngModel',
			controller: 'myDateController',
			scope:{
				label:'@',
				type:'@myType',
				dt: '=ngModel'     
			},
			templateUrl:'Partials/date-field.html'
			
		};
	});
})();