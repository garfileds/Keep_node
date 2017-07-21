/**
 * Created by chenpeng on 2017/6/10.
 */

const mongoose = require('mongoose'),
  bcrypt = require("bcryptjs"),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9])+/.test(v)
      },
      message: '注册用户的邮箱格式不正确'
    }
  },

  password: {
    type: String,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  }, toJSON: {
    virtuals: true
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)