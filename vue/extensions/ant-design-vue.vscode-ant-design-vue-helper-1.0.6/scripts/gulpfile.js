const gulp = require('gulp');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
const ListStream = require('list-stream');

gulp.task('markdown', (done) => {
  gulp.src('./index.en_US.md')
    .pipe(markdownToJSON(marked, 'blog.json'))
    .pipe(gulp.dest('.'))
  done()
});