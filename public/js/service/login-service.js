(function() {
    'use strict;'
    angular.module("myApp").factory("loginService",['$q','$http',function($q,$http){

    function CreateUser(username,password,mobile,email){
      var deferred=$q.defer();
      var userData={
           username:username,
           password:password,
           mobile:mobile,
           email:email 
        };

         $http.post('/user/addUser', userData)
              .success(function(data) { 
                  deferred.resolve(data);
              }).error(function(msg, code) {
                  deferred.reject(msg);
          });
        
        return deferred.promise;
    }


    function LoginUser(username,password){
        var deferred=$q.defer();
        var loginData={
           username:username,
           password:password
        };
        $http.post('/user/loginUser', loginData)
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(msg, code) {
                deferred.reject(msg);
        });
        return deferred.promise;
    }

    return{
       
        createUser:CreateUser,
        loginUser:LoginUser
    }
  }]);
})();