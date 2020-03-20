const gulp = require('gulp')
const merge = require('merge-stream')

gulp.task('copy', () => merge(
    gulp.src('./node_modules/jquery/dist/**/*').pipe(gulp.dest('./public/vendor/jquery/')),
    gulp.src('./node_modules/bootstrap/dist/**/*').pipe(gulp.dest('./public/vendor/bootstrap/')),
    gulp.src('./node_modules/bootstrap-icons/icons/**/*').pipe(gulp.dest('./public/vendor/bootstrap-icons/'))
));