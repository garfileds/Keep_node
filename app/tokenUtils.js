/**
 * Created by chenpeng on 2017/6/10.
 */

const debug = require('debug')('app:tokenUtils:' + process.pid),
      path = require('path'),
      util = require('util'),
      redis = require("redis"),
      client = redis.createClient(),
      _ = require('lodash'),
      config = require("../config.json"),
      jsonwebtoken = require("jsonwebtoken"),
      TOKEN_EXPIRATION = 60 * 24 * 7,
      TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60,
      UnauthorizedAccessError = require(path.join(__dirname, '../errors', 'UnauthorizedAccessError.js'))

client.on('error', function (err) {
  debug(err)
})

client.on('connect', function () {
  debug("Redis successfully connected")
})

module.exports.fetch = function (headers) {
  if (headers && headers.authorization) {
    let authorization = headers.authorization
    let part = authorization.split(' ')
    if (part.length === 2) {
      return part[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

module.exports.create = function (user, req, res, next) {
  debug('Create token')

  if (_.isEmpty(user)) {
    return next(new Error('User data cannot be empty.'))
  }

  let data = {
    _id: user._id,
    username: user.username,
    access: user.access,
    name: user.name,
    email: user.email,
    token: jsonwebtoken.sign({
      _id: user._id,
      iat: new Date().getTime()
    }, config.secret, {
      expiresInMinutes: TOKEN_EXPIRATION
    })
  }

  let decoded = jsonwebtoken.decode(data.token)

  data.token_exp = decoded.exp
  data.token_iat = decoded.iat

  debug('Token generated for user: %s, token: %s', data.username, data.token)

  client.set(data.token, JSON.stringify(data), function (err, reply) {
    if (err) {
      return next(new Error(err))
    }

    if (reply) {
      client.expire(data.token, TOKEN_EXPIRATION_SEC, function (err, reply) {
        if (err) {
          return next(new Error("Can not set the expire value for the token key"))
        }
        if (reply) {
          req.user = data
          next()
        } else {
          return next(new Error('Expiration not set on redis'))
        }
      })
    }
    else {
      return next(new Error('Token not set in redis'))
    }
  })

  return data

}

module.exports.retrieve = function (id, done) {
  debug("Calling retrieve for token: %s", id)

  if (_.isNull(id)) {
    return done(new Error("token_invalid"), {
      "message": "Invalid token"
    })
  }

  client.get(id, function (err, reply) {
    if (err) {
      return done(err, {
        "message": err
      })
    }

    if (_.isNull(reply)) {
      return done(new Error("token_invalid"), {
        "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
      })
    } else {
      let data = JSON.parse(reply)
      debug("User data fetched from redis store for user: %s", data.username)

      if (_.isEqual(data.token, id)) {
        return done(null, data)
      } else {
        return done(new Error("token_doesnt_exist"), {
          "message": "Token doesn't exists, login into the system so it can generate new token."
        })
      }

    }

  })

}

module.exports.verify = function (req, res, next) {
  debug("Verifying token")

  let token = exports.fetch(req.headers)

  jsonwebtoken.verify(token, config.secret, function (err) {
    if (err) {
      req.user = undefined
      return next(new UnauthorizedAccessError("invalid_token"))
    }

    exports.retrieve(token, function (err, data) {

      if (err) {
        req.user = undefined
        return next(new UnauthorizedAccessError("invalid_token", data))
      }

      req.user = data
      next()
    })
  })
}

module.exports.expire = function (headers) {
  let token = exports.fetch(headers)

  debug("Expiring token: %s", token)

  if (token !== null) {
    client.expire(token, 0)
  }

  return token !== null
}

module.exports.middleware = function () {
  let func = function (req, res, next) {

    let token = exports.fetch(req.headers)

    exports.retrieve(token, function (err, data) {
      if (err) {
        req.user = undefined
        return next(new UnauthorizedAccessError("invalid_token", data))
      } else {
        req.user = _.merge(req.user, data)
        next()
      }

    })
  }

  func.unless = require("express-unless")

  return func
}

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC

debug("Loaded")