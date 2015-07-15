require('angular');

module.exports = {
  'panel-manager':  angular.module('panel-manager', [])
    .directive('panel',             require('./directives/panel/directive'))
    .directive('panelManager',      require('./directives/panelManager/directive'))
};