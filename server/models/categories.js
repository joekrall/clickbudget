const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  sites: { type: Array, default: [] },
  maxClicks: Number
})

module.exports = mongoose.model('Category', CategorySchema) 