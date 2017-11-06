/**
 * Created by adoug on 2017/9/27.
 * @FileOverview: generate service-worker.js
 */

let gulp = require('gulp')
let packageJson = require('./package.json')
let path = require('path')
let swPrecache = require('sw-precache')

let DEV_DIR = 'public'
let DIST_DIR = 'public'

gulp.task('generate-service-worker-dev', function(callback) {
  writeServiceWorkerFile(DEV_DIR, false, callback)
})

gulp.task('generate-service-worker-dist', function(callback) {
  writeServiceWorkerFile(DIST_DIR, true, callback)
})

gulp.task('default', ['generate-service-worker-dist'])

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,

    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    runtimeCaching: [{
      urlPattern: /\/api\/plans/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 2,
          name: 'plans-cache'
        }
      }
    }, {
      urlPattern: /\/api\/pokemen/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 2,
          name: 'pokemen-cache'
        }
      }
    }],
    staticFileGlobs: [
      rootDir + '/style/**.css',
      rootDir + '/**.html',
      rootDir + '/images/**.*',
      rootDir + '/components/**/**.js',
      rootDir + '/js/**/**.js',
      rootDir + '/node_modules/**/**.js',
      rootDir + '/runtime/**/**.js'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  }

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback)
}
