const router = require('express').Router()
const Site = require('../models/sites')

router.post('/sites', (req, res, next) => {
  
  let siteInfo = JSON.parse(req.body);
  console.log(siteInfo);
  let site = new Site();

  site.lastVisitTime = req.body.lastVisitTime;
  site.title = req.body.title;
  // I need some sort of trim function here
  site.url = req.body.url;
  site.typedCount = req.body.typedCount;
  site.visitCount = req.body.visitCount;

  // When we get the sites, we will want to have the user's
  // categories here, as well as basic categories for search
  // We check each site we get back against those categories
  // If site.url matches url in *category* array, then we tag site
  // with .category matching the array name

  site.save((err, s) => {
    if (err) throw err;
    res.send(s);
  })

  
})

router.get('/sites', (req, res, next) => {

  Site
    .find()
    .exec((err, sites) => {
        res.send(sites)
    })
      
})



module.exports = router

