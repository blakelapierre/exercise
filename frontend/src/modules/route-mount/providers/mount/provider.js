import _ from 'lodash';

const DIRECTIVE = Symbol('directive');

module.exports = [function() {
  this.$get = ['$rootScope', $rootScope => {
   console.log('lollers', {$rootScope});


   $rootScope.$on('$locationChangeStart',   changeStart);
   $rootScope.$on('$locationChangeSuccess', changeSuccess);

   function changeStart() {
     console.log('start', {arguments});
   }

   function changeSuccess() {
     console.log('success', {arguments});
   }

   return {mount: 'mount'};
  }];

  this.mount = (base, routes) => {
    console.log({base, routes});

    const directive = routes[DIRECTIVE];

    if (directive) {
      console.log('!!!', {directive});
    }

    _.each(routes, (definition, path) => {
      console.log({path, definition});

      if (typeof definition === 'object') {
        this.mount(base + path, definition);
      }
    });

    return this;
  };

  this.directive = DIRECTIVE;
}];