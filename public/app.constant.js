(function() {

  'use strict;'

   angular.module("myApp").constant('DB_CONFIG', {
            user: {
                username: { type: 'text', null: false },
                password: { type: 'text', null: false},
                mobile: { type: 'integer' },
                email :{type:'text'},
                firstLogin:{type:'boolean'}
            },
            customer: {
                firstname: { type: 'text', null: false},
                lastname: { type: 'text', null: false},
                dob: {type:'text'},
                mobile: { type: 'integer' },
                email :{type:'text'},
                status :{type:'text'}    //active,delete
            },
            employee: {
                firstname: { type: 'text', null: false },
                lastname: { type: 'text', null: false},
                dob: {type:'text'},
                mobile: { type: 'integer' },
                email :{type:'text'},
                status :{type:'text'}   //active,delete
            },
            appointment: {
                doa: { type: 'text', null: false },
                time: { type: 'text', null: false},
                mobile: { type: 'integer' },
                email :{type:'text'},
                status :{type:'text'},  //unassigned, assigned
                completion :{type:'text'} //pending , completed
            }

    });

})();