(function() {
	'use strict;'
	angular.module("myApp").directive("myValidator",function() {
		return{
			restrict:'A',
			require:'ngModel',
			link:function(scope, element, attrs, ctrl){

			}
		};
	});
})();