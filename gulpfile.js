const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss',
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './src'
    });

    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ], ['sass']);

    gulp.watch('src/*.html').on('change', browserSync.reload);       

});

gulp.task('js_bootstrap', () => {

    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('src/js/bootstrap'))    
    .pipe(browserSync.stream());
    
       /* 'node_modules/moment/min/moment.min.js',
        'node_modules/moment/locale/es.js'*/  
    
});

gulp.task('js_moment', () => {

    return gulp.src([
        'node_modules/moment/min/moment.min.js',
        'node_modules/moment/locale/es.js' 
    ])
    .pipe(gulp.dest('src/js/moment'))    
    .pipe(browserSync.stream());     
    
});

gulp.task('font-awesome', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('fonts' , () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('default' , ['js_bootstrap', 'js_moment', 'serve', 'font-awesome', 'fonts']);