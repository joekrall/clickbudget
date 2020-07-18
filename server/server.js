const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/timebudget', {useNewUrlParser: true})

const app = express()
const app2 = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app2.use(bodyParser.json())
app2.use(bodyParser.urlencoded({
  extended: true
}))

app2.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mainRoutes = require('./routes/main')
const sideRoutes = require('./routes/side')

app.use(mainRoutes)
app2.use(sideRoutes)

app2.listen(8080, () => {
  console.log('Node.js app2 listening on port ' + 8080)
})

app.listen(8000, () => {
  console.log('Node.js app listening on port ' + 8000)
})

