(function() {
    'use strict;'
    angular.module("myApp").factory("userService",['$http',function($http){

        function publicGetAllUsers() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function publicGetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function publicGetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function publicCreateUser(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function publicUpdateUser(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function publicDeleteUser(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function publicHandleSuccess(res) {
            return res.data;
        }

        function publicHandleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

         return{
                getAllUsers : publicGetAllUsers,
                getById : publicGetById,
                getByUsername : publicGetByUsername,
                createUser : publicCreateUser,
                updateUser : publicUpdateUser,
                deleteUser : publicDeleteUser,
                handleSuccess : publicHandleSuccess,
                handleError : publicHandleError
            }
    }]);

})();    


        