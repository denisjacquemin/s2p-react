module.exports = function(grunt) {

  grunt.initConfig({
        env : {
          dev : {
            NODE_ENV : 'development'
          },
          prod : {
            NODE_ENV : 'production'
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
            tasks: ["browserify", "copy:main"]
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
            {expand: true, cwd: './dist/public/', src:['**'], dest: '../../mobileapp/www', filter: 'isFile'}
          ]
        }
      }
   });
   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks('grunt-contrib-copy');

   grunt.registerTask("default", ["env:dev", "watch"]);
   grunt.registerTask("build", ["browserify", "copy:main", "copy:cordova"]);

};
