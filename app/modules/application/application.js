/**
 * @ngdoc overview
 * @name Application:app.module
 *
 * @description
 * Application module contains base directives and classes that could be used
 * in any other module. This module should not include controllers.
 */
define(function(require) {
  var angular = require('angular');

  require('angular-route');

  var module = angular.module('application', [
    'ngRoute'
  ]);

  return module;
});
