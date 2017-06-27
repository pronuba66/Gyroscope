module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      gyro: {
        options: {
          screw_ie8: true,
          compress: true,
          sourceMap: true,
        },
        files: {
          'build/gyro.min.js': ['js/scene.js', 'js/renderer.js', 'js/lights.js', 'js/camera.js', 'js/gyro.js', 'js/arrows.js', 'js/main.js', ],
        },
        output: {
             comments: false
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false,
        },
        comments: false,
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};