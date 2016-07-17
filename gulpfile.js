var gulp = require('gulp'),
	watch = require('gulp-watch'),
	rigger = require('gulp-rigger'),
	sass = require('gulp-sass'),
	prefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
 	build: {
 		html: 'build/',
 		js: 'build/js/',
 		css: 'build/styles/',
 		img: 'build/img/'
 	},
 	src: {
 		html: 'src/*.html',
 		js: 'src/js/main.js',
 		style: 'src/styles/*.scss',
 		img: 'src/img/**/*.*'
 	},
 	watch: {
 		html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/styles/**/*.scss',
    img: 'src/img/**/*.*'
 	},
 	clean: './build'
 };

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', function() {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))

});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function() {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
