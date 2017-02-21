const gulp = require('gulp');
const browsersync = require('browser-sync');
const $ = require('gulp-load-plugins')({lazy: true});
const sys = require('sys')
const exec = require('child_process').exec

gulp.task('babel', () => {
    log('Babeling...')
    return gulp.src("./js/script.js")
        .pipe($.babel())
        .pipe(gulp.dest('./dist'))
})

gulp.task('bundle', () => {
    log("Bundling...")
    function puts(error, stdout, sterr) { sys.puts(stdout) }
    exec("npm run build", puts)    
})

gulp.task('build-css', () => {
    log('Building CSS...');
    return gulp.src('./styles/styles.scss')
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./dist/'));
})

gulp.task('browsersync', () => {
    startBrowserSync();
})

gulp.task('watch', ['babel', 'bundle', 'build-css'], () => {
    gulp.watch('./styles/scss/*.scss', ['build-css']);
    gulp.watch('./js/js/script.js', ['babel', 'bundle']);
})

gulp.task('default', ['watch', 'browsersync'])

// UTILITY FUNCITONS
function log(msg){
    if (typeof(msg) === 'object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function startBrowserSync(){
    if(browsersync.active){
        return;
    }
    log("Syncing browsers...");

    var options = {
        proxy: 'localhost:9000/black-data',
        port: 3000,
        files: ['**/*.*', "!.gitignore"],
        ghostMode: {
            click: true,
            scroll: true,
            location: false,
            forms: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browsersync(options);
}