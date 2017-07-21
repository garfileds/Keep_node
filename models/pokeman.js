/**
 * Created by adoug on 2017/7/18.
 */

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const schemaStrRequired = {
  type: String,
  required: true
}

const PokemanSchema = new Schema({
  name: schemaStrRequired,

  jp_name: String,
  en_name: String,

  nature_img: schemaStrRequired,

  number: schemaStrRequired,

  img: schemaStrRequired,

  attr: {
    type: [String],
    required: true
  },

  category: schemaStrRequired,

  features: {
    type: [String],
    required: true
  }
}, {
  toObject: {
    virtuals: true
  }, toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Pokeman', PokemanSchema)