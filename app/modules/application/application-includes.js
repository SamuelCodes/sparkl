/**
 * Load all dependencies for module
 */
define(function(require) {

  var module = require('module!@');

  jQuery = require('jquery');
  require('ace');
  require('angular-ui');
  require('angular-ui-ace');
  require('angular-ui-grid');
  require('angular-ui-layout');
  require('bootstrap');
  require('angular-aria');
  require('angular-animate');
  require('angular-material');

  require('config!main')(module);

});
