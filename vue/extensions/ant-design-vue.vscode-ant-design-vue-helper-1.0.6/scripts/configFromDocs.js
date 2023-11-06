var fs = require('fs');
var path = require('path');
var markdownIt = require('markdown-it')
const gulp = require('gulp');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
const ListStream = require('list-stream');

function main(dir) {
  // const con = fs.readFileSync(dir, 'utf-8')
  // console.log(markdownIt().parse(con, {}))
  marked.setOptions({
    pedantic: true,
    smartypants: true
  })
  gulp.task('markdown', () => {
    gulp.src(dir)
      .pipe(ListStream.obj())
      .pipe(markdownToJSON(marked, 'blog.json'))
      .pipe(gulp.dest('./'))
  })
}
main('./index.en_US.md')