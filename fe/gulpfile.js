/**
 * Created by adoug on 2017/9/27.
 * @FileOverview 处理图片生成响应式所需的不同尺寸，并压缩
 */

const gulp = require('gulp')
const imageResize = require('gulp-image-resize')
const imagemin = require('gulp-imagemin')
const webp = require('imagemin-webp')
const rename = require('gulp-rename')

gulp.task('responsive', function () {
  gulp
  .src('./images/all-devices.png')
  .pipe(rename(function (path) { path.basename += '_xlarge@2x' }))
  .pipe(gulp.dest('./images'))

  gulp
  .src('./images/{all-devices.png,bg.jpg}')
  .pipe(imageResize({
    width: 768
  }))
  .pipe(rename(function (path) { path.basename += '_medium@1x' }))
  .pipe(gulp.dest('./images'))

  gulp
  .src('./images/{all-devices.png,bg.jpg}')
  .pipe(imageResize({
    width: 1536
  }))
  .pipe(rename(function (path) { path.basename += '_medium@2x' }))
  .pipe(gulp.dest('./images'))
})

gulp.task('webp', function () {
  gulp
  .src('./images/**/*.{png,jpg}')
  .pipe(imagemin([
    webp({
      quality: 80
    })
  ], { verbose: true }))
  .pipe(rename(function (path) { path.extname = '.webp' }))
  .pipe(gulp.dest('./images'))
})

gulp.task('auto', function () {
  // 监听文件修改，当文件被修改则执行 images 任务
  gulp.watch('./images/**/*.*', ['responsive', 'webp'])
})

gulp.task('images', ['responsive', 'webp'])
gulp.task('default', ['responsive', 'webp', 'auto'])
