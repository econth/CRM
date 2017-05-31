(function() {

  'use strict';
  angular.module("myApp").controller('mainController',['$scope','$state','$uibModal',function($scope,$state,$uibModal){

  	/* Employee/Customer Workflow */

    $scope.labels = ['May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov'];

    $scope.series = ['Employees', 'Customers'];
    
    $scope.data = [
      [5, 7, 13, 12, 15, 20, 18],
      [3, 20, 25, 30, 24, 30, 45]
    ];



    /* Revenue chart */

    $scope.revenueSeries = ['Revenue'];

    $scope.revenueData = [3, 20, 25, 30, 100, 75, 145];


    
      $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    	];

    $scope.status = {
      isopen: false
    };

    $scope.customerName="Parthiban";

    $scope.color="green";

    $scope.toggled = function(open) {
      //$log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    //$scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

    $scope.addCustomer=function(){
       $state.transitionTo('main.addCustomer');
    }
    $scope.searchCustomer=function(){
       $state.transitionTo('main.searchCustomer');
    }
    $scope.inactiveCustomers=function(){
       $state.transitionTo('main.inactiveCustomers');
    }
    $scope.addEmployee=function(){
       $state.transitionTo('main.addEmployee');
    }
    $scope.searchEmployee=function(){
       $state.transitionTo('main.searchEmployee');
    }
     $scope.inactiveEmployees=function(){
       $state.transitionTo('main.inactiveEmployees');
    }

    $scope.dashboard=function(){
       $state.transitionTo('main.dashboard');
    }

    $scope.accounts=function(){
       $state.transitionTo('main.accounts');
    }
   
    $scope.appointments=function(){
       $state.transitionTo('main.appointments');
    }

    $scope.bookAppointment=function(){
       $state.transitionTo('main.bookAppointment');
    }

    $scope.invoices=function(){
       $state.transitionTo('main.invoices');
    }

     $scope.reports=function(){
       $state.transitionTo('main.reports');
    }

    $scope.signout=function(){
       var modalInstance = $uibModal.open({
               templateUrl: 'partials/signout.html',
               controller: 'modalInstanceController'          
           });
    }


    $scope.generatePDF=function(){
      html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Invoice_"+$scope.customerName+".pdf");
            }
        });
    }

    $scope.sendEmail=function(){

    }

    $scope.sendSMS=function(){
      
    }

    $scope.available=function(){
      $scope.color="green";
    }

    $scope.busy=function(){
       $scope.color="orange";
    }

    $scope.dnd=function(){
       $scope.color="red";
    }

    $scope.away=function(){
       $scope.color="pink";
    }

    $scope.offline=function(){
       $scope.color="blue";
    }


  }]);

})();



