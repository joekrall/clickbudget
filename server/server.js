const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/timebudget', {useNewUrlParser: true})

const sitesApp = express()
const categoriesApp = express()

sitesApp.use(bodyParser.json())
sitesApp.use(bodyParser.urlencoded({
  extended: true
}))

sitesApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

categoriesApp.use(bodyParser.json())
categoriesApp.use(bodyParser.urlencoded({
  extended: true
}))

categoriesApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const sitesRoutes = require('./routes/sites')
const categoriesRoutes = require('./routes/categories')

sitesApp.use(sitesRoutes)
categoriesApp.use(categoriesRoutes)

categoriesApp.listen(8080, () => {
  console.log('Node.js categoriesApp listening on port ' + 8080)
})

sitesApp.listen(8000, () => {
  console.log('Node.js app listening on port ' + 8000)
})

