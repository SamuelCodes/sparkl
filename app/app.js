define(function(require) {

  require('modules/application/application-includes');
  require('modules/main/main-includes');

  var ng = require('angular');

  var name = 'sparkl';
  var app = ng.module(name, [
    'application',
    'main'
  ]);

  ng.element(document)
    .ready(function()
      {
        var root = ng.element(document.querySelector('#' + name));

        ng.bootstrap(root, [name]);
        console.timeEnd('application loading');
      });
});
