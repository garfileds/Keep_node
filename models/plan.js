/**
 * Created by adoug on 2017/7/3.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var PlanSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  bg_image: {
    type: String,
    default: ''
  },

  color: {
    type: String,
    default: '#A7ED84'
  },

  progress_color: {
    type: String,
    default: '#fff'
  },

  status: {
    type: String,
    default: 'ing'
  },

  progress: {
    start_day: {
      type: String,
      required: true
    },
    days: {
      type: Number,
      required: true
    },
    marked: {
      type: [Number],
      required: true
    },
    done: {
      type: [Number],
      default: []
    }
  }
}, {
  toObject: {
    virtuals: true
  }, toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Plan', PlanSchema)