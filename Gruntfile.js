module.exports = function(grunt) {

  grunt.initConfig({
        env : {
          dev : {
            NODE_ENV : 'development',
            HOST_API: 'https://s2p-api-demo.herokuapp.com',
            HOST_S3: 'https://s2p-demo.s3-eu-west-1.amazonaws.com',
            CLOUD_CLOUDINARY: 'hgslafjx4'
          },
          demo : {
            NODE_ENV : 'development',
            HOST_API: 'https://s2p-api-demo.herokuapp.com',
            HOST_S3: 'https://s2p-demo.s3-eu-west-1.amazonaws.com',
            CLOUD_CLOUDINARY: 'hgslafjx4'
          },
          prod : {
            NODE_ENV : 'production',
            HOST_API: 'https://s2p-api-prod.herokuapp.com',
            HOST_S3: 'https://s2p-demo.s3-eu-west-1.amazonaws.com',
            CLOUD_CLOUDINARY: 'hcmohfpxd'
          }
      },
      replace: {
        example: {
          src: ["./dist/**/*.js", "./dist/**/*.html"],             // source files array (supports minimatch)
          overwrite: true,
          replacements: [{
            from: 'HOST_API',                   // string replacement
            to: 'https://s2p-api-demo.herokuapp.com'
          }, {
            from: 'HOST_S3',      // regex replacement ('Fooo' to 'Mooo')
            to: 'https://s2p-demo.s3-eu-west-1.amazonaws.com'
          }, {
            from: 'HOST_ANALYTICS_API',
            to: 'https://s2p-analytics-api-demo.herokuapp.com'
          }, {
            from: 'CLOUD_CLOUDINARY',
            to: 'hgslafjx4'
          }]
        }
      },
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "./dist/public/app.js": ["./src/index.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./src/**/*.js", "./src/*.html"],
            tasks: ["browserify", "copy:main", "replace"]
         }
      },
      copy: {
        main: {
          files: [
            // includes files within path
            {expand: true, src: ['./src/**/*.html'], dest: './dist/public', flatten: true, filter: 'isFile'},
            {expand: true, cwd: './src/', src:['assets/**'], dest: './dist/public', filter: 'isFile'}
          ],
        },
        cordova: {
          files: [
            {expand: true, cwd: './dist/public/', src:['**'], dest: '../../konecto-cordova/www', filter: 'isFile'}
          ]
        }
      }
   });
   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-text-replace');


   grunt.registerTask("default", ["env:dev", "watch"]);
   grunt.registerTask("demo", ["env:demo", "browserify", "copy:main", "replace", "copy:cordova"]);
   grunt.registerTask("prod", ["env:prod", "browserify", "copy:main", "replace", "copy:cordova"]);

};
