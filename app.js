const debug = require('debug')('app:' + process.pid),
      path = require('path'),
      bodyParser = require('body-parser'),
      favicon = require('serve-favicon'),
      logger = require('morgan')

const jwt = require('express-jwt'),
      unless = require('express-unless'),
      onFinished = require('on-finished'),
      NotFoundError = require(path.join(__dirname, 'errors', 'NotFoundError.js')),
      tokenUtils = require(path.join(__dirname, 'app/user', 'tokenUtils.js'))

const config = require('./config.json'),
      mongoose_uri = process.env.MONGOOSE_URI || 'localhost/Keep'

debug('Loading Mongoose functionality')
const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect(mongoose_uri, {
  user: config.dbUser,
  pass: config.dbPass
})
mongoose.connection.on('error', function () {
  debug('Mongoose connection error')
})
mongoose.connection.once('open', function callback() {
  debug('Mongoose connected to the database')
})

debug('Initializing express')
const express = require('express'),
      app = express()

debug('Setup view engine')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(favicon(path.join(__dirname, 'public/meta', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  onFinished(res, function () {
    debug('[%s] finished request', req.connection.remoteAddress)
  })

  next()
})

let jwtCheck = jwt({
  secret: config.secret
})
jwtCheck.unless = unless

app.use(jwtCheck.unless({
  path: [
    { url: '/api/user/token', methods: ['POST'] },
    '/api/user',
    '/api/user/emailStatus',
    '/',
    /\/\.(js|css)$/,
    /\/images\//
  ]
}))
app.use(tokenUtils.middleware().unless({
  path: [
    { url: '/api/user/token', methods: ['POST'] },
    '/api/user',
    '/api/user/emailStatus',
    '/',
    /\/\.(js|css)$/,
    /\/images\//
  ]
}))

debug('Initializing router')
const AutoRoutes = require('q-auto-routes')
AutoRoutes.init(app, path.join(__dirname, 'routes'))

// all other requests redirect to 404
app.all('*', function (req, res, next) {
  next(new NotFoundError('404'))
})

// error handler for all the applications
app.use(function (err, req, res) {
  let code = 500,
    msg = { message: 'Internal Server Error' }

  switch (err.name) {
    case 'UnauthorizedError':
      code = err.status
      msg = undefined
      break
    case 'BadRequestError':
    case 'UnauthorizedAccessError':
    case 'NotFoundError':
      code = err.status
      msg = err.inner
      break
    default:
      break
  }

  return res.status(code).json(msg)
})

module.exports = app
