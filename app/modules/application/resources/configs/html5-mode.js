define(function(require){
  return function(module){
    module.config(['$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
      }
    ]);
  }
});
