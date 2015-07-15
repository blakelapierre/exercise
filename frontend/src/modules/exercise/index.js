require('angular');
require('angular-route');
require('angular-animate');

import panelManager from '../panel-manager';
import routeMount from '../route-mount';

import _ from 'lodash';

module.exports = {
  'panel-manager': panelManager['panel-manager'],
  'route-mount': routeMount['route-mount'],
  'exercise':  angular.module('exercise', ['ngRoute', 'ngAnimate', 'panel-manager', 'route-mount'])
    .directive('breathe',       require('./directives/breathe/directive'))
    .directive('freestyle',     require('./directives/freestyle/directive'))
    .directive('welcome',       require('./directives/welcome/directive'))


    .directive('workout',             require('./directives/workout/directive'))
      .directive('exerciseList',      require('./directives/workout/exerciseList/directive'))
      .directive('player',            require('./directives/workout/player/directive'))

    .directive('workoutList',         require('./directives/workoutList/directive'))

    .factory('dataStore', require('./factories/dataStore/factory'))

    .config([
      '$routeProvider', '$locationProvider', '$mountProvider',
      ($routeProvider, $locationProvider, $mountProvider) => {

      console.log('routes');

      const {directive} = $mountProvider;

      const routes = {
        [directive]: 'exerciseList',
        '/exercise': {
          [directive]: 'exerciseList',
          '/:name?': {
            [directive]: 'exercise'
          }
        }
      };

      // $mountProvider.mount('/', routes);
      // $mountProvider.$get();

      const routerController = [
        '$scope', '$routeParams',
        ($scope, $routeParams) => _.extend($scope, $routeParams)
      ];

      const dataController = [
        '$scope', '$routeParams', 'dataStore',
        ($scope, $routeParams, dataStore) => {
          const something = _.reduce($routeParams, (params, value, name) => {
            const [store, index] = name.match(/(\b|[A-Z]+)[a-z]*/g);

            console.log({name, value, store, index});

            params[store] = dataStore[`get${capitalize(store)}By${index}`](value);

            return params;
          }, {});

          console.log({dataStore, something});

          _.extend($scope, something);

          function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        }
      ];

      $routeProvider
        .when('/', {
          template: '<welcome></welcome>'
        })
        .when('/breathe', {
          template: `<breathe></breathe>`
        })
        .when('/exercise/:exerciseId?/:taskName?', {
          template: '<player exercise="exercise"></player>',
          controller: dataController
        })
        .when('/freestyle', {
          template: '<freestyle></freestyle>'
        })
        .when('/workout/:workoutName?/:exerciseIndex?/:taskIndex?', {
          template: params => {
            const {workoutName, exerciseIndex, taskIndex} = params;
            if (!workoutName) {
              return '<workout-list></workout-list>';
            }
            else return '<workout workout-name="{{workoutName}}" exercise-index="{{exerciseIndex}}" task-index="{{taskIndex}}"></workout>';
          },
          controller: routerController
        })
        .otherwise({
          template: 'Where\'d you come from?'
        });
    }])
};