require('angular');

module.exports = {
  'route-mount': angular.module('route-mount', [])
    .provider('$mount', require('./providers/mount/provider'))
};