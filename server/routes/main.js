const router = require('express').Router()
const Site = require('../models/sites')
const Category = require('../models/categories')

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

// use regex to compare in case some thing in the database doesn't have www. in front
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

  // What do I want? I want to have three options based on query
  // Just a site dump
  // Then enough for a graph
  // Then categorized.

router.get('/sites', (req, res, next) => {

  const aggregate = req.body.aggregate;

  // This is all the sites
  if (aggregate) {
    Site.aggregate([{
      $group: {
        _id: '$url',
        count: {
          $sum: '$visitCount'
        },
        lastVisit: {$max: '$lastVisitTime'}
      }
    }])
    .exec((err, aggregatedSites) => {
      res.send(aggregatedSites)
    })
  } else {
    Site
      .find()
      .exec((err, sites) => {
        res.send(sites)
      })
  }

})

router.post('/categories', (req, res, next) => {

  let category = new Category();

  category.name = req.body.name;

  for (let i = 0; i < req.body.sites.length; i++) {
    category.sites.push(req.body.sites[i]);
  }

  category.save((err, cat) => {
    if (err) throw err;
    res.send(cat);
  })

})


// It'd be cool to do a bulk update at some point, extension maybe??
router.put('/categories/:category', (req, res, next) => {

  let site = req.body.site;

  Category
    .findById(req.params.category, (err, category) => {
      if (err) throw err;


    if (category.sites.includes(site)) {        
        res.send("Site already exists in category!")
    }
      else {
        category.sites.push(site);


        // save product, console log success or error,
        // and return product in response
        category.save(err => {
          if (err) throw err;
          else console.log('Site successfully added!');
        });
        res.send(category);
      }
    });

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