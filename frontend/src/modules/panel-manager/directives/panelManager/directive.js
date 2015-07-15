module.exports = () => {
  return {
    restrict: 'E',
    link: ($scope, element, attributes) => {
      console.log('panelManager link', {$scope, element, attributes});
    },
    controller: ['$scope', function($scope) {
      console.log('panelManager controller');
      const panels = [];

      this.registerPanel = (name, scope) => {
        console.log('register', {name, scope});
        panels.push(name, scope);
      };
    }]
  };
};