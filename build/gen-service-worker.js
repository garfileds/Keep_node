/**
 * Created by adoug on 2017/9/27.
 * @FileOverview: generate service-worker.js
 */

let packageJson = require('../package.json')
let path = require('path')
let swPrecache = require('sw-precache')

let DEV_DIR = path.resolve(__dirname, '../public')
let DIST_DIR = path.resolve(__dirname, '../public')

const selectedType = process.argv[1]

const callback = function () {}

selectedType === 'dev' ? writeServiceWorkerFile(DEV_DIR, false, callback) : writeServiceWorkerFile(DIST_DIR, true, callback)

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
      rootDir + '/pkgs/**.*',
      rootDir + '/images/**.*',
      rootDir + '/modules/style/**.*',
      rootDir + '/node_modules/**.*'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  }

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback)
}
