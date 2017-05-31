(function() {
    'use strict;'
    angular.module("myApp").factory("appointmentService",['$http','$q','commonService',function($http,$q,commonService){

        function ListAllAppointments() {
            var deferred = $q.defer();
            $http.get('/appointment/getAppointments')
                .success(function(data) { 
                    console.log("data",data);
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
            return deferred.promise;
        }


        function BookAppointment(appDate,appTime,mobile,email) {
            var deferred = $q.defer();
            var finalAppDate=commonService.formatDate(appDate);
            var appointmentData={
                   appDate  : finalAppDate,
                   appTime  : appTime,
                   mobile   : mobile,
                   email    : email
                };
            
            $http.post('/appointment/bookAppointment', appointmentData)
                .success(function(data) { 
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
            });
            return deferred.promise;

        }  

         return{
                bookAppointment     : BookAppointment,
                listAllAppointments : ListAllAppointments   
            }
    }]);

})();    