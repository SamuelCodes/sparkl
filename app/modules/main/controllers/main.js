define(function(require) {
  var module = require('module!@');

  module
    .controller('main.controllers.main', [ '$scope', 'uiGridConstants', function($scope, uiGridConstants) {
        angular.extend($scope, {
          editor: null,
          aceLoaded: function(editor) { $scope.editor = editor; },
          outputData: { columnDefs: [], data: [], onRegisterApi: function(api) { $scope.gridApi = api; } },
          getQuery: function() { return $scope.editor.session.doc.$lines.join(" "); },
          setOutput: function(content) {
            if(content.length) {
              var colDefs = [];
              for(var key in content[0]) { colDefs.push({ name: key, field: key + '.value' }); }
              $scope.outputData = { "columnDefs": colDefs, "data": content };
            }
          },
          run: function() {
            var queryUrl = "http://dbpedia.org/sparql"
            $.ajax({
              dataType: "jsonp",
              url: queryUrl,
              data: $.param({ query: $scope.getQuery(), format: "json", Accept: 'application/sparql-results+json' }),
              success: function(_data) {
                $scope.setOutput(_data.results.bindings);
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
              }
            });
          },
          endpoints: ['http://dbpedia.org/sparql'],
          history: function() {
            if(!localStorage["sparkl.history"]) {
              localStorage['sparkl.history'] = ['http://dbpedia.org/sparql'];
            }
            return localStorage["sparkl.history"];
          }
        });
      }
    ]);
});
