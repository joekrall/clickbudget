const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteSchema = new Schema({
  url: String
})

module.exports = mongoose.model('Site', SiteSchema) 