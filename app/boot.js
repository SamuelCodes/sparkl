baseUrl: '/app',
requirejs.config({
  paths: {
    jquery: '../lib/jquery/jquery',
    angular: '../lib/angular/angular',
    'angular-route': '../lib/angular-route/angular-route',
    text: '../lib/requirejs-text/text',
    base: '../lib/requirejs-angualr-loader/src/base',
    template: '../lib/requirejs-angualr-loader/src/template',
    controller: '../lib/requirejs-angualr-loader/src/controller',
    service: '../lib/requirejs-angualr-loader/src/service',
    module: '../lib/requirejs-angualr-loader/src/module',
    config: '../lib/requirejs-angualr-loader/src/config',
    directive: '../lib/requirejs-angualr-loader/src/directive',
    filter: '../lib/requirejs-angualr-loader/src/filter',
    requirejs: '../lib/requirejs/require',
    'requirejs-text': '../lib/requirejs-text/text',
    bootstrap: '../lib/bootstrap/bootstrap',
    'angular-ui-ace': '../lib/angular-ui-ace/ui-ace',
    'angular-ui': '../lib/angular-ui/build/angular-ui',
    'ace': '../lib/ace-builds/src/ace',
    'angular-ui-grid': '../lib/angular-ui-grid/ui-grid',
    'angular-ui-layout': '../lib/angular-ui-layout/ui-layout',
    'angular-material': '../lib/angular-material/angular-material',
    'angular-animate': '../lib/angular-animate/angular-animate',
    'angular-aria': '../lib/angular-aria/angular-aria',
  },
  structure: {
    prefix: 'modules/{module}',
    module: {
      path: '/{module}'
    },
    template: {
      path: '/resources/views/{template}.{extension}',
      extension: 'html'
    },
    controller: {
      path: '/controllers/{controller}'
    },
    service: {
      path: '/src/{service}'
    },
    config: {
      path: '/resources/configs/{config}'
    },
    directive: {
      path: '/resources/directives/{directive}'
    },
    filter: {
      path: '/resources/filter/{filter}'
    }
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-animate': {
      deps: [
        'angular',
        'angular-ui'
      ]
    },
    'angular-aria': {
      deps: [
        'angular',
        'angular-ui'
      ]
    },
    'angular-material': {
      deps: [
        'angular',
        'angular-ui',
        'angular-animate'
      ]
    },
    'angular-ui-layout': {
      deps: [
        'angular',
        'angular-ui'
      ]
    },
    'angular-ui': {
      deps: [
        'angular'
      ]
    },
    'angular-ui-ace': {
      deps: [
        'angular',
        'angular-ui'
      ]
    },
    'angular-ui-grid': {
      deps: [
        'angular',
        'angular-ui'
      ]
    },
    'angular-route': {
      deps: [
        'angular'
      ]
    },
    'angular-cache': {
      deps: [
        'angular'
      ]
    },
    'angular-resource': {
      deps: [
        'angular'
      ]
    },
    'bootstrap': {
      deps: [
        'jquery'
      ]
    }
  },
  packages: [

  ]
});


console.time('application loading');
require(['app']);


