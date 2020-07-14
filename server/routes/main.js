const router = require('express').Router()
const Site = require('../models/sites')

router.post('/sites', (req, res, next) => {

  let site = new Site();

  site.url = req.body.url;

  // When we get the sites, we will want to have the user's
  // categories here, as well as basic categories for search
  // We check each site we get back against those categories
  // If site.url matches url in *category* array, then we tag site
  // with .category matching the array name

  site.save((err) => {
    if (err) throw err
  })

  res.end(site)
})

module.exports = router