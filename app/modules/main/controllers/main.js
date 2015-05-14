define(function(require) {
  var module = require('module!@');

  module
    .directive('ontology', function() {
      return {
        restrict: 'A',
        template: require('template!ontology'),
        controller: function($scope, $element) {
          angular.extend($scope, {
            ontologies: ['http://dbpedia.org/ontology/'],
            selectedOntology: function() { return $("#ontology-select").val(); },
            loadOntology: function() {
              var url = $scope.selectedOntology();
              if(!localStorage[url]) { localStorage[url] = $scope.fetchOntology(url); }
              $scope.ontologyLoaded(localStorage[url]);
            },
            ontologyLoaded: function(ontology) {
              console.log(ontology);
              localStorage[$scope.selectedOntology()] = ontology;
            },
            fetchOntology: function(url) {
              var query = "\
                prefix : <"+url+">\
                prefix owl: <http://www.w3.org/2002/07/owl#>\
                prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
                select distinct ?type ?label ?superclass\
                where {\
                  ?type a owl:Class ;\
                    rdfs:label ?label .\
                  filter(langMatches(lang(?label), 'EN'))\
                  optional { ?type rdfs:subClassOf ?superclass . }\
                }".split("\n").join(" ");
              var results = null;
              $.ajax({
                dataType: "jsonp",
                url: "http://dbpedia.org/sparql",
                data: $.param({query: query, format: "json", Accept: 'application/sparql-results+json' }),
                success: function(response) {
                  var types = { };
                  var roots = [];
                  var results = response.results.bindings;
                  for(var i=0; i<results.length; i++) {
                    var result = results[i];
                    if(!types[result.type.value]) {
                      types[result.type.value] = { label: result.label.value, type: result.type.value, children: [] };
                      if(result.superclass) {
                        types[result.type.value].superclass = result.superclass.value;
                      } else {
                        types[result.type.value].superclass = null;
                      }
                    }
                  }
                  for(key in types) {
                    var type = types[key];
                    if(!types[type.superclass]) {
                      roots.push(type);
                    } else {
                      types[type.superclass].children.push(type);
                    }
                  }
                  $scope.ontologyLoaded(roots);
                }
              });
            }
          });
        }
      }
    })
    .controller('main.controllers.main', [ '$scope', 'uiGridConstants', function($scope, uiGridConstants) {
      angular.extend($scope, {
        editor: null,
        aceLoaded: function(editor) { $scope.editor = editor; },
        outputData: { columnDefs: [], data: [], onRegisterApi: function(api) { $scope.gridApi = api; } },
        ontologyData: { columnDefs: [], data: [], onRegisterApi: function(api) { $scope.ontologyGridApi = api; } },
        getQueryLines: function() { return $scope.editor.session.doc.$lines; },
        getQuery: function() { return $scope.getQueryLines().join(" "); },
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
              $scope.appendHistory($scope.getQueryLines());
            }
          });
        },
        endpoints: ['http://dbpedia.org/sparql'],
        history: function() {
          var history = localStorage.getItem("history") || [];
          return history;
        },
        appendHistory: function(query) {
          var history = localStorage.getItem("history") || [];
          history.push(query);
          localStorage.setItem("history", history);
        }
      });
    }
    ]);
});
