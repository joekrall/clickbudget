const router = require('express').Router()
const Site = require('../models/sites')
const Category = require('../models/categories')
const axios = require('axios');
const { request } = require('express');

// set categories - function call at server startup

let categories = [];

axios.get('http://localhost:8080/categories')
    .then(result => { console.log("Categories now populating"); setCategories(result); })
    .catch(error => { console.error(error); return Promise.reject(error); });

const setCategories = (response) => {
  categories = response.data;
}

// utils //

const trimUrl = (url) => {

  let urlSansHttp = "";
  if (url.includes("https://")) {
     urlSansHttp = url.substring(url.indexOf("//") + 2);
  } else
  if (url.includes("http://")) {
    urlSansHttp = url.substring(url.indexOf("//") + 2);
  } else {
    urlSansHttp = url;
  }

  let urlSansHttpAndEverythingAfterFirstSlash = "";

  if (urlSansHttp.includes('/')) {
    urlSansHttpAndEverythingAfterFirstSlash = urlSansHttp.substring(0, urlSansHttp.indexOf('/'));
  } else {
    urlSansHttpAndEverythingAfterFirstSlash = urlSansHttp;
  }

  return urlSansHttpAndEverythingAfterFirstSlash;
}


function categorizeUrl(url) {

  let flag = false;
  let categorizationOfUrl = null;
 
  categories.forEach((category) => {
    console.log(category.name)
    category.sites.forEach((site) => {
      if (site === url) {
        categorizationOfUrl = category.name;
        flag = true;
      }
    })
  })

  if (flag) {
    return categorizationOfUrl;
  } else {
    return "Uncategorized";
  }

}

// Routes //

router.post('/sites', (req, res, next) => {

  let site = new Site();
  let trimmedUrl = trimUrl(req.body.url);

  let urlCategory = categorizeUrl(trimmedUrl);

  site.fullUrl = req.body.url;
  site.lastVisitTime = req.body.lastVisitTime;
  site.title = req.body.title;
  site.url = trimmedUrl;
  site.category = urlCategory;
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

  const aggregate = req.query.aggregate;

  // This is all the sites
  if (aggregate === 'true') {
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

      // Get a count and send that through redux tomorrow
      // Use that for percentages... or not ... we could just post
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

module.exports = router