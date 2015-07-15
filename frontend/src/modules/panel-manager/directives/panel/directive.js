module.exports = () => {
  return {
    restrict: 'A',
    require: '^panelManager',
    scope: {},
    link: ($scope, element, attributes, panelManager) => {
      console.log('panel link', {$scope, element, attributes, panelManager});
      const {panel} = attributes;

      attributes['ng-if'] = 'test';

      panelManager.registerPanel(panel, $scope);
    }
  };
};