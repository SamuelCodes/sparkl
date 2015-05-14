module.exports = function(grunt) {

  var vendors = {
    list: [
      'bootstrap',
      'angular-route',
      'requirejs',
      'requirejs-text',
      'jquery',
      'angular-ui',
      'angular-ui-ace',
      'angular-ui-grid'
    ],
    paths: {
      'bootstrap': '../lib/bootstrap/bootstrap',
      'requirejs': '../lib/requirejs/require',
      'requirejs-text': '../lib/requirejs-text/text',
      'jquery': '../lib/jquery/jquery',
      'angular-ui': '../lib/angular-ui/build/angular-ui',
      'angular-ui-ace': '../lib/angular-ui-ace/ui-ace',
      'angular-ui-grid': '../lib/angular-ui-grid/ui-grid'
    },
  };

  var applicationBootScript = './app/boot.js';
  var baseUrl = './app';
  var built = {
    vendors: 'build/vendors.js',
    app: 'build/app.js'
  };

  var uglify2Options = {
    compress: {
      evaluate: true,
      drop_debugger: true,
      dead_code: true
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          cleanTargetDir: false,
          cleanBowerDir: false,
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: [ 'lib/bootstrap/*.ttf', 'lib/bootstrap/*.woff*' ], dest: 'fonts', flatten: true},
          {expand: true, src: [ 'lib/angular-ui-grid/*.ttf', 'lib/angular-ui-grid/*.woff*' ], dest: 'build', flatten: true},
          {expand: true, src: [ 'bower_components/dist/css/*.map' ], dest: 'build', flatten: true}
        ]
      }
    },
    concat: {
      build: {
        dest: 'build/vendor.css',
        src: [ 'bower_components/**/*.css' ]
      }
    },
    requirejs: {
      vendors: {
        options: {
          baseUrl: baseUrl,
          logLevel: 2, //WARNING
          out: built.vendors,
          // optimize: 'none',
          optimize: 'uglify2',
          uglify2: uglify2Options,
          // generateSourceMaps: true, //<-uncomment this line to enable source mapping
          preserveLicenseComments: false,
          mainConfigFile: applicationBootScript,
          include: vendors.list,
          paths: vendors.paths
        }
      },
      app: {
        options: {
          baseUrl: baseUrl,
          logLevel: 2, //WARNING
          out: built.app,
          // optimize: 'none',
          optimize: 'uglify2',
          uglify2: uglify2Options,
          // generateSourceMaps: true, //<-uncomment this line to enable source mapping
          preserveLicenseComments: false,
          mainConfigFile: applicationBootScript,
          name: 'boot',
          exclude: vendors.list,
          paths: vendors.paths
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('default', ['bower', 'requirejs:app', 'requirejs:vendors', 'concat', 'copy']);
};
