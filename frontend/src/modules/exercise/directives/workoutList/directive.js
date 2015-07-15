module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      $scope.workouts = dataStore.getWorkouts();
    }]
  };
};