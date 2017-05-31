(function() {
    'use strict;'
    angular.module("myApp").factory("loginService",['$SQLite','$timeout','$q',function($SQLite,$timeout,$q){

    function CreateUser(username,password,mobile,email){
      var deferred=$q.defer();
      var userData={
           username:username,
           password:password,
           mobile:mobile,
           email:email 
        };

        $SQLite.ready(function () {
             this.insert('user', userData).then(function(data){
               deferred.resolve(data);
             },function(){
                deferred.resolve();
             });
            
         });
        return deferred.promise;
    }


    function LoginUser(username,password){
        var deferred=$q.defer();
         $SQLite.ready(function () {
         this.selectFirst('SELECT * FROM user WHERE username = ? AND password = ?', [ username , password ])
             .then(
                function () { deferred.resolve(); },
                function () { alert('Some error, Please login again!'); },
                function (data) {
              deferred.resolve(data);
            });
        });

        return deferred.promise;
    }

    return{
       
        createUser:CreateUser,
        loginUser:LoginUser
    }


	/*function publicSetCredentials(username,password){
		 var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
	}

	function publicLogin(username,password,callback){
          Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------
            $timeout(function () {
                var response;
                userService.getByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);
    }

    

	function publicClearCredentials(){
		 $rootScope.globals = {};
         $cookieStore.remove('globals');
         $http.defaults.headers.common.Authorization = 'Basic ';

            // delete $localStorage.currentUser;
            // $http.defaults.headers.common.Authorization = '';


	} */


}]);


 
    

})();