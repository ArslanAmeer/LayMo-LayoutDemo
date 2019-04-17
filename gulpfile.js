const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-clean-css');
const jsmin = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourceMaps = require('gulp-sourcemaps');
const lessautoprefix = require('less-plugin-autoprefix');
const browsersync = require('browser-sync').create();

var auroPrefix = new lessautoprefix({
    browsers: ['last 2 versions']
});
// var lessDir= 'src/assets/less'

gulp.task('html-min', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream());
});

gulp.task('css-min', () => {
    return gulp.src('src/assets/css/**/*.css')
        .pipe(rename('styles.min.css'))
        .pipe(sourceMaps.init())
        .pipe(cssmin())
        .pipe(sourceMaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browsersync.stream());
});

gulp.task('js-min', () => {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(jsmin())
        .pipe(sourceMaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(browsersync.stream());
});

gulp.task('image-min', () => {
    return gulp.src('src/assets/images/*/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe(browsersync.stream());
});

gulp.task('serve', () => {
    browsersync.init({
        server: "dist"
    });
    gulp.watch('src/*.html', ['html-min']);
    gulp.watch('src/assets/css/**/*.css', ['css-min']);
    gulp.watch('src/assets/js/**/*.js', ['js-min']);
    gulp.watch('src/assets/images/*', ['image-min']);
    gulp.watch('dist/*.html').on('change', browsersync.reload);
});

gulp.task("default", ['css-min', 'js-min', 'image-min', 'html-min', 'serve']);