/**
 * Load all dependencies for module
 */
define(function(require) {

  var module = require('module!@');

  require('controller!main');
  require('config!main')(module);
});
