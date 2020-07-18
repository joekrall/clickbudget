const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteSchema = new Schema({
  lastVisitTime: Number,
  title: String,
  fullUrl: String,
  url: String,
  typedCount: Number,
  visitCount: Number
})

module.exports = mongoose.model('Site', SiteSchema) 