/**
 * Created by chenpeng on 2017/6/10.
 */

const debug = require('debug')('app:routes:user' + process.pid),
      util = require('util'),
      path = require('path'),
      Router = require('express').Router,
      UnauthorizedAccessError = require(path.join(__dirname, '../..', 'errors', 'UnauthorizedAccessError.js'))
const userHandler = require(path.join(__dirname, '../../app/user'))

module.exports = (function () {
  let router = new Router()
  
  router.route('/').post(userHandler.createUser)

  router.route('/emailStatus').get(userHandler.emailIsUsed)

  router.route('/token')
    .post(userHandler.authenticate, function (req, res) {
      return res.status(200).json(req.user)
    })
    .delete(userHandler.logout)

  router.unless = require('express-unless')

  return router
})()

debug('Loaded')
