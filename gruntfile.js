/// <binding BeforeBuild='default' Clean='clean' ProjectOpened='watch' />
/*global module */

// PROJECT FOLDER STRUCTURE
//	root/
//		gruntfile.js
//		package.json
//		src/
//			css/
//			js/
//			img/ <== this is a target directory - do not put source files here - they go in /images/
//			*.html
//		dist/
//		images/

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Minify HTML files
		htmlmin: {
			dist: {
				options: {
					quoteCharacter: "'",
					minifyCSS: true,
					minifyJS: true,
					removeComments: true,
					collapseWhitespace: true,
					decodeEntities: true,
					html5: true
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: '**/*.html',
					dest: 'dist'
				}]
			}
		},

		// Minify and join CSS files
		cssmin: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'dist/css/app.min.css': ['src/css/*.css']
				}
			}
		},

		// Join JavaScipt files together in specific order
		concat: {
			options: {
				sourceMap: true
			},
			dist: {
				src: [
					'src/js/utils/math.js',
					'src/js/utils/arrays.js',
					'src/js/utils/keys.js',
					'src/js/utils/objects.js',
					'src/js/utils/utils.js',

					'src/js/formviewmodel.js',

					'src/js/data.js',

					'src/js/app.js',

					'src/pricing/pricing-static.js',
					'src/pricing/pricing-filter.js',

					'src/ratings/rating-interactive.js',
					'src/ratings/rating-static.js',
					'src/ratings/rating-filter.js',
					'src/ratings/rating-widget.js',

					'src/reviews/review-form.js',
					'src/reviews/reviewformviewmodel.js',

					'src/filters/dayofweek.js',
					'src/filters/venuesfilter.js'
			],
				dest: 'dist/js/app.js'
			}
		},

		// Minify concatenated JS files
		uglify: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'dist/js/app.min.js': ['dist/js/app.js']
				}
			}
		},

		// Copy over files not otherwise relocated by other plug-ins
		copy: {

		},

		// Remove generated and copied files
		clean: {
			dist: [
				'dist/*.html',
				'dist/img/*',
				'dist/js/*',
				'dist/css/*'
			],
			staged_images: [
				'src/img/',
				'src/img/staging/'
			]
		},

		// Rebuild the project after any source file is changed
		watch: {
			files: 'src/**/*.*',
			tasks: ['default']
		},

		// Start a local web server
		connect: {
			dist: {
				options: {
					port: 8080,
					base: 'dist',
					keepalive: true
				}
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');


	// The default task removes any prior build outputs,
	// processes images,
	// concatentates and minifies source files,
	// and copies any remaining content into the distribution folder.
	grunt.registerTask('default', [
		'clean',
		'htmlmin', 'cssmin', 'concat', 'uglify',
		'connect'
	]);
};
