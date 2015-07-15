module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      workout: '=',
      currentIndex: '='
    },
    controller: ['$scope', ($scope) => {
      console.log({$scope});
    }]
  };
};