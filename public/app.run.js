(function() {

  'use strict;'

  angular.module("myApp").run(['$SQLite','DB_CONFIG',function($SQLite, DB_CONFIG){
    
    $SQLite.dbConfig({
        name: 'my-browser-db',
        description: 'Test DB',
        version: '1.0'
      });

    $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                init.step();
                $SQLite.createTable(name, config).then(init.done);
            });
            init.finish();
    });

  }]);


  /*angular.module("myApp").run(['$rootScope','$state','$cookieStore','$http',function($rootScope,$state,$cookieStore,$http){
	   $rootScope.globals=$cookieStore.get('globals') || {};
		    if($rootScope.globals.currentUser){
			     $http.defaults.headers.common['Authorization'] == 'Basic ' +$rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

	// if($localStorage.currentUser){
	// 	$http.defaults.headers.common.Authorization='Bearer '+$localStorage.currentUser.token;
	// }
   	$rootScope.$on('$locationChangeStart', function (event, next, current) {
          //redirect to login page if not logged in
      if ($state.go() !== 'login' && !$rootScope.globals.currentUser) {
         $state.go('login');
     }

      // var publicPages = ['/login'];
      // var restrictedPage = publicPages.indexOf($state.go()) === -1;
      // if (restrictedPage && !$localStorage.currentUser) {
      //       $state.go('login');
      //  }
   });

   	 // var testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
 
     //    // fake authenticate api end point
     //    $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
     //        // get parameters from post request
     //        var params = angular.fromJson(data);
 
     //        // check user credentials and return fake jwt token if valid
     //        if (params.username === testUser.username && params.password === testUser.password) {
     //            return [200, { token: 'fake-jwt-token' }, {}];
     //        } else {
     //            return [200, {}, {}];
     //        }
     //    });
 
     //    // pass through any urls not handled above so static files are served correctly
     //    $httpBackend.whenGET(/^\w+.*//*).passThrough(); 


}]); */

})();