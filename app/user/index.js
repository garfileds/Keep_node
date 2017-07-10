/**
 * Created by chenpeng on 2017/6/10.
 */

const debug = require('debug')('app:app:user' + process.pid),
  _ = require('lodash'),
  path = require('path'),
  tokenUtils = require('./tokenUtils.js'),
  UnauthorizedAccessError = require(path.join(__dirname, '../..', 'errors', 'UnauthorizedAccessError.js')),
  NotFoundError = require(path.join(__dirname, '../..', 'errors', 'NotFoundError.js')),
  User = require(path.join(__dirname, '../..', 'models', 'user.js'))

module.exports.authenticate = function (req, res, next) {
  debug('Processing authenticate middleware')

  let email = req.body.email,
    password = req.body.password

  if (_.isEmpty(email) || _.isEmpty(password)) {
    return next(new UnauthorizedAccessError('401', {
      message: '用户名或密码不正确'
    }))
  }

  process.nextTick(function () {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err || !user) {
        return next(new UnauthorizedAccessError('401', {
          message: '用户名或密码不正确'
        }))
      }

      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          debug('User authenticated, generating token')
          tokenUtils.create(user, req, res, next)
        } else {
          return next(new UnauthorizedAccessError('401', {
            message: '用户名或密码不正确'
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
      'code': 'ok',
      'message': 'User has been successfully logged out'
    })
  } else {
    return next(new UnauthorizedAccessError('401'))
  }
}

module.exports.createUser = function (req, res, next) {
  let user = new User()
  user.nickname = req.body.nickname
  user.email = req.body.email
  user.password = req.body.password

  user.save(function (err) {
    if (err) {
      return next(err)
    } else {
      return res.status(200).json(undefined)
    }
  })
}

module.exports.emailIsUsed = function (req, res, next) {
  let email = req.query.email

  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return next(new Error('something wrong when querying'))
    } else {
      return res.status(200).json({
        isUsed: !!user
      })
    }
  })
}

debug('Loaded')