'use strict'

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// const WebpackMd5Hash = require('webpack-md5-hash')
// const MD5HashPlugin = require('md5-hash-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const AfterChunkHashPlugin = require('webpack-after-chunk-hash-plugin')
// const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./load-minified')
const env = config.build.env

/*const criticalCss = new ExtractTextPlugin('css/critical_[contenthash:7].css')
const criticalCssRule = {
  test: /firstScreen\.scss$/,
  loader: criticalCss.extract(`sass-loader${config.build.productionSourceMap ? '?sourceMap' : ''}`, 'css-loader', 'style-loader')
}*/

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    asyncAssets: './src/asyncAssets'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name]_[chunkhash:7].js'),
    chunkFilename: utils.assetsPath('js/components/[name]_[chunkhash:7].js')
  },
  plugins: [
    // fix issue https://github.com/webpack/webpack/issues/959
    // new MD5HashPlugin(),
    // new WebpackMd5Hash(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    // criticalCss,
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name]_[contenthash:7].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'views/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      inlineSource: '((asyncAssets|manifest).*js$)|(app.*css)',
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
      chunksSortMode: function (chunk1, chunk2) {
        var orders = ['manifest', 'asyncAssets', 'base', 'app']

        return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0])
      },
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackExcludeAssetsPlugin(),
    // new StyleExtHtmlWebpackPlugin(),
    // keep module.id stable when vendor modules does not change
    // new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // fix issue https://github.com/webpack/webpack/issues/959
    // split base js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'base',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['base']
    }),
    // extract common of async chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      async: 'base-async',
      minChunks: 2
    }),
    // new AfterChunkHashPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../images'),
        to: 'images'
      },
      {
        from: path.resolve(__dirname, '../meta'),
        to: 'meta'
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'keep',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css,svg,webp}'],
      minify: true,
      stripPrefix: 'dist/',

      // runtime cache
      handleFetch: true,
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
    })
  ]
})

/*webpackConfig.output.chunkFilename = function (chunk) {
  if (chunck.name.indexOf('async') > -1) {
    return utils.assetsPath('js/async/[name]_[chunkhash:7].js')
  }

  return utils.assetsPath('js/components/[name]_[chunkhash:7].js')
}*/

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
