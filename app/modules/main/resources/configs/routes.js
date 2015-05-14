define(function(require) {

  return function(module){
    var module = require('module!@');

    module.config([
      '$routeProvider',
      function($routeProvider) {

        $routeProvider.when('/', {
          template: require('template!main'),
          controller: 'main.controllers.main',
          resolve: {
          }
        });

      }
    ]);
  }
});
