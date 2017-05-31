(function() {
	'use strict;'
	angular.module("myApp").controller("myDateController", function($scope,$filter){

		function dateOfBirth(){
        
        $scope.inlineOptions = {
          minDate: new Date(),
          showWeeks: false
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          maxDate: new Date(2000, 1, 1),
          minDate: new Date(1900, 1, 1),
          startingDay: 1
        };
    }

    function appointment(){
       $scope.inlineOptions = {
          minDate: new Date(),
          showWeeks: true
        };

        $scope.dateOptions = {
          dateDisabled: disabled,
          formatYear: 'yy',
          maxDate: new Date(2100, 1, 1),
          minDate: new Date(),
          startingDay: 1
      };
    }

    
    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.open1 = function() {
      if($scope.type=="appointment"){
        appointment();

      }

      if($scope.type=="dob"){
        dateOfBirth();
      }
      $scope.popup1.opened = true;
          
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;

    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.changeDate=function(){
     
    };

    



 	});

})();