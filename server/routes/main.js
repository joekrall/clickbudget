const router = require('express').Router()


router.get('/get-sites', (req, res, next) => {
  for (let i = 0; i < 90; i++) {

    // When we get the sites, we will want to have the user's
    // categories here, as well as basic categories for search
    // We check each site we get back against those categories
    // If site.url matches url in *category* array, then we tag site
    // with .category matching the array name

    site.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})