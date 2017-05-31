(function() {
	'use strict;'
	angular.module("myApp").directive("myField",function(){
		return{
			restrict:'EA',
			require:'?ngModel',
			template:'<input type="myType" ng-model="value">',
			link:function(scope,element,attrs,ngModel){
				

				if(!ngModel) {return;}

				ngModel.$render=function(){
					scope.value=ngModel.$modelValue;
				}	
			}
		};
	});
})();