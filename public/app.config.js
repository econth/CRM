(function() {

  'use strict;'

  angular.module("myApp").config(function($stateProvider,$urlRouterProvider,ChartJsProvider){

  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']});

	$stateProvider
	  
		 .state('home', { 
		    url: '/home',
		    templateUrl: 'view/home.html',
		    controller: 'homeController'
		})

	     .state('main', { 
	      url: '/main',
	      templateUrl: 'view/main.html',
	      controller: 'mainController'
	    })

	     .state('main.dashboard', { 
	      url: '/dashboard',
	      templateUrl: 'partials/dashboard.html',
	      controller: 'mainController'
	    })

	     .state('main.accounts', {
	      url:'/accounts', 
	      templateUrl: 'partials/accounts.html',
	      controller: 'mainController'
	    })

	     .state('main.bookAppointment', {
	      url:'/book-appointment', 
	      templateUrl: 'partials/book-appointment.html',
	      controller: 'appointmentController'
	    })

	      .state('main.appointments', {
	      url:'/appointments', 
	      templateUrl: 'partials/appointments.html',
	      controller: 'appointmentController',
	      data: {
		        appointments: true
		    } 
	    })

	     .state('main.invoices', { 
	      url: '/invoices',
	      templateUrl: 'partials/invoices.html',
	      controller: 'mainController'
	    })

	     .state('main.reports', {
	      url:'/reports', 
	      templateUrl: 'partials/reports.html',
	      controller: 'mainController'
	    })

	     .state('main.addCustomer', {
	      url:'/addCustomer', 
	      templateUrl: 'partials/add-customer.html',
	      controller: 'customerController'
	    })

	     .state('main.searchCustomer', {
	      url:'/searchCustomer', 
	      templateUrl: 'partials/search-customer.html',
	      controller: 'customerController'
	    })

	     .state('main.inactiveCustomers', {
	      url:'/inactiveCustomers', 
	      templateUrl: 'partials/inactive-customers.html',
	      controller: 'customerController',
	       data: {
		        deletedCustomer: true
		    }  
	    })

	     .state('main.updateCustomer', {
	      url:'/update-customer', 
	      templateUrl: 'partials/update-customer.html',
	      controller: 'customerController',
	      data:{
   		  		updateCustomer:true
   		  }
	    })

	      .state('main.addEmployee', {
	      url:'/add-employee', 
	      templateUrl: 'partials/add-employee.html',
	      controller: 'employeeController'
	    })

	     .state('main.searchEmployee', {
	      url:'/search-employee/:id', 
	      templateUrl: 'partials/search-employee.html',
	      controller: 'employeeController'
	    })

	     .state('main.inactiveEmployees', {
	      url:'/inactive-employees', 
	      templateUrl: 'partials/inactive-employees.html',
	      controller: 'employeeController',
	      data: {
		        deletedEmployee: true
		    }  
	    })
	     
	      .state('main.updateEmployee', {
	      url:'/update-employee', 
	      templateUrl: 'partials/update-employee.html',
	      controller: 'employeeController',
	      data:{
   		  		updateEmployee:true
   		  }
	    })
  	   
 	$urlRouterProvider.otherwise('/home');
});

})();