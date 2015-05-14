/**
 * Create angular module
 */
define(function(require) {
  var ng = require('angular');

  var module = ng.module('main', [
    'ui.ace',
    'ui.grid',
    'ui.grid.autoResize',
    'ui.layout',
    'ngAnimate',
    'ngMaterial'
  ]);

  return module;
});
