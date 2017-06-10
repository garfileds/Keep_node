/**
 * Created by chenpeng on 2017/6/10.
 */

const debug = require('debug')('app:app:user' + process.pid),
  _ = require('lodash'),
  util = require('util'),
  path = require('path'),
  tokenUtils = require('../tokenUtils.js'),
  UnauthorizedAccessError = require(path.join(__dirname, '../..', 'errors', 'UnauthorizedAccessError.js')),
  User = require(path.join(__dirname, '../..', 'models', 'user.js'))

module.exports.authenticate = function (req, res, next) {
  debug('Processing authenticate middleware')

  let username = req.body.username,
    password = req.body.password

  if (_.isEmpty(username) || _.isEmpty(password)) {
    return next(new UnauthorizedAccessError('401', {
      message: 'Invalid username or password'
    }))
  }

  process.nextTick(function () {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err || !user) {
        return next(new UnauthorizedAccessError('401', {
          message: 'Invalid username or password'
        }))
      }

      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          debug('User authenticated, generating token')
          tokenUtils.create(user, req, res, next)
        } else {
          return next(new UnauthorizedAccessError('401', {
            message: 'Invalid username or password'
          }))
        }
      })
    })
  })
}

module.exports.logout = function (req, res, next) {
  if (tokenUtils.expire(req.headers)) {
    delete req.user
    return res.status(200).json({
      'message': 'User has been successfully logged out'
    })
  } else {
    return next(new UnauthorizedAccessError('401'))
  }
}

module.exports.createUser = function (req, res, next) {
  let user = new User()
  user.username = req.body.username
  user.password = req.body.password

  user.save(function (err) {
    if (err) {
      return next(err)
    } else {
      return res.status(200).json(undefined)
    }
  })
}

debug('Loaded')