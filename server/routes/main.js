const router = require('express').Router()
const Site = require('../models/sites')

// utils //

const trimUrl = (url) => {
  let urlSansHttp = url.substring(url.indexOf("//") + 2);
  let urlSansHttpAndEverythingAfterFirstSlash = urlSansHttp.substring(0, urlSansHttp.indexOf('/'));

  return urlSansHttpAndEverythingAfterFirstSlash;
}


// Find a way to categorize the sites
// We need a database of category strings
// It'd be nice if we could just compare URLs to what's already in the sites
// Making category objects that we can add sites to
// { category: stuff, sites: [stuff.com, stuff.org, stuff.io]}

const categorizeUrls = (url) => {

}

// the big four //

router.post('/sites', (req, res, next) => {
  
  let site = new Site();

  // Trim https://
  let trimmedUrl = trimUrl(req.body.url);

  site.lastVisitTime = req.body.lastVisitTime;
  site.title = req.body.title;
  // I need some sort of trim function here
  site.url = trimmedUrl;
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

// Two graphs
// One by URL
// One by category
// Then a tab to set goals on
// and another tab to see all traffic by site and category
// Maybe get a timeline graph to plot what gets hit by time
// For both site and category. 
// Maybe a little golden mean graph... showing safe sites, and hits
// in the middle... outside of that line . . . Work, communication/social, gaming...



module.exports = router

