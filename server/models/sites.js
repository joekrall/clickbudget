const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteSchema = new Schema({

  lastVisitTime: Number,
  typedCount: Number,
  visitCount: Number,

  title: String,
  url: String,
  fullUrl: String,

  category: String,
  
})

module.exports = mongoose.model('Site', SiteSchema) 