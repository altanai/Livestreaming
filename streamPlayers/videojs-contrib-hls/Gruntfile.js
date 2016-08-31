'use strict';

var basename = require('path').basename;

module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: pkg,
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> Brightcove;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['build', 'dist', 'tmp']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        nonull: true,
        src: ['src/videojs-hls.js',
              'src/stream.js',
              'src/flv-tag.js',
              'src/exp-golomb.js',
              'src/h264-extradata.js',
              'src/h264-stream.js',
              'src/aac-stream.js',
              'src/metadata-stream.js',
              'src/segment-parser.js',
              'src/m3u8/m3u8-parser.js',
              'src/xhr.js',
              'src/playlist.js',
              'src/playlist-loader.js',
              'node_modules/pkcs7/dist/pkcs7.unpad.js',
              'src/decrypter.js'
            ],
        dest: 'dist/videojs.hls.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/videojs.hls.min.js'
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js',
              '!test/tsSegment.js',
              '!test/fixtures/*.js',
              '!test/manifest/**',
              '!test/muxer/**',
               '!test/switcher/**']
      }
    },
    connect: {
      dev: {
        options: {
          hostname: '*',
          port: 9999,
          keepalive: true
        }
      },
      test: {
        options: {
          hostname: '*',
          port: 9999
        }
      }
    },
    open : {
      dev : {
        path: 'http://127.0.0.1:<%= connect.dev.options.port %>/example.html',
        app: 'Google Chrome'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'test']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      }
    },
    concurrent: {
      dev: {
        tasks: ['connect', 'open', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    version: {
      project: {
        src: ['package.json']
      }
    },
    'github-release': {
      options: {
        repository: 'videojs/videojs-contrib-hls',
        auth: {
          user: process.env.VJS_GITHUB_USER,
          password: process.env.VJS_GITHUB_TOKEN
        },
        release: {
          'tag_name': 'v' + pkg.version,
          name: pkg.version,
          body: require('chg').find(pkg.version).changesRaw
        }
      },
      files: {
        'dist': ['videojs.hls.min.js']
      }
    },
    karma: {
      options: {
        frameworks: ['qunit']
      },

      saucelabs: {
        configFile: 'test/karma.conf.js',
        autoWatch: true
      },

      dev: {
        browsers: ['Chrome', 'Safari', 'Firefox',
        'Opera', 'IE', 'PhantomJS', 'ChromeCanary'],
        configFile: 'test/localkarma.conf.js',
        autoWatch: true
      },

      chromecanary: {
        options: {
          browsers: ['ChromeCanary'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      phantomjs: {
        options: {
          browsers: ['PhantomJS'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      opera: {
        options: {
          browsers: ['Opera'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      chrome: {
        options: {
          browsers: ['Chrome'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      safari: {
        options: {
          browsers: ['Safari'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      firefox: {
        options: {
          browsers: ['Firefox'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      ie: {
        options: {
          browsers: ['IE'],
          configFile: 'test/localkarma.conf.js',
          autoWatch: true
        }
      },

      ci: {
        configFile: 'test/karma.conf.js',
        autoWatch: false
      }
    },
    protractor: {
      options: {
        configFile: 'test/functional/protractor.config.js',
        webdriverManagerUpdate: !(process.env.TRAVIS && true)
      },

      chrome: {
        options: {
          args: {
            capabilities: {
              browserName: 'chrome'
            }
          }
        }
      },

      firefox: {
        options: {
          args: {
            capabilities: {
              browserName: 'firefox'
            }
          }
        }
      },

      safari: {
        options: {
          args: {
            capabilities: {
              browserName: 'safari'
            }
          }
        }
      },

      ie: {
        options: {
          args: {
            capabilities: {
              browserName: 'internet explorer'
            }
          }
        }
      },

      saucelabs:{}
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-github-releaser');
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('chg');


  grunt.registerTask('manifests-to-js', 'Wrap the test fixtures and output' +
                     ' so they can be loaded in a browser',
                     function() {
    var
      jsManifests = 'window.manifests = {\n',
      jsExpected = 'window.expected = {\n';
    grunt.file.recurse('test/manifest/',
                       function(abspath, root, sub, filename) {
      if ((/\.m3u8$/).test(abspath)) {

        // translate this manifest
        jsManifests += '  \'' + basename(filename, '.m3u8') + '\': ' +
          grunt.file.read(abspath)
            .split(/\r\n|\n/)

            // quote and concatenate
            .map(function(line) {
              return '    \'' + line + '\\n\' +\n';
            }).join('')

            // strip leading spaces and the trailing '+'
            .slice(4, -3);
        jsManifests += ',\n';
      }

      if ((/\.js$/).test(abspath)) {

        // append the expected parse
        jsExpected += '  "' + basename(filename, '.js') + '": ' +
          grunt.file.read(abspath) + ',\n';
      }
    });

    // clean up and close the objects
    jsManifests = jsManifests.slice(0, -2);
    jsManifests += '\n};\n';
    jsExpected = jsExpected.slice(0, -2);
    jsExpected += '\n};\n';

    // write out the manifests
    grunt.file.write('tmp/manifests.js', jsManifests);
    grunt.file.write('tmp/expected.js', jsExpected);
  });

  // Launch a Development Environment
  grunt.registerTask('dev', 'Launching Dev Environment', 'concurrent:dev');

  // Default task.
  grunt.registerTask('default',
                     ['clean',
                      'test',
                      'concat',
                      'uglify']);

  // The test task will run `karma:saucelabs` when running in travis,
  // otherwise, it'll default to running karma in chrome.
  // You can specify which browsers to build with by using grunt-style arguments
  // or separating them with a comma:
  //   grunt test:chrome:firefox  # grunt-style
  //   grunt test:chrome,firefox  # comma-separated
  grunt.registerTask('test', function() {
    var tasks = this.args;

    grunt.task.run(['jshint', 'manifests-to-js']);

    if (process.env.TRAVIS) {
      if (process.env.TRAVIS_PULL_REQUEST === 'false') {
        grunt.task.run(['karma:saucelabs']);
        grunt.task.run(['connect:test', 'protractor:saucelabs']);
      } else {
        grunt.task.run(['karma:phantomjs']);
      }
    } else {
      if (tasks.length === 0) {
        tasks.push('chrome');
      }
      if (tasks.length === 1) {
        tasks = tasks[0].split(',');
      }
      tasks = tasks.reduce(function(acc, el) {
        acc.push('karma:' + el);
        if (/chrome|firefox|safari|ie/.test(el)) {
          acc.push('protractor:' + el);
        }
        return acc;
      }, ['connect:test']);

      grunt.task.run(tasks);
    }
  });
};
