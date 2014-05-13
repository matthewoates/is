module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        uglify: {
            all: {
                options: {

                },
                files: {
                    'is.min.js': ['is.js']
                }
            }
        },

        bytesize: {
            all: {
                src: [
                    'is.min.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bytesize');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'bytesize']);
};
