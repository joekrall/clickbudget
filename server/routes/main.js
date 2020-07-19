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
    return "";
  }

}

// Routes //

router.post('/sites', (req, res, next) => {

  const secondFunction = async () => {

  await axios.get('http://localhost:8080/categories')
    .then(result => { console.log("Categories now re-populating, I should be first"); setCategories(result); })
    .catch(error => { console.error(error); return Promise.reject(error); });

    let site = new Site();
    let trimmedUrl = trimUrl(req.body.url);
    console.log("I should go second")
    let urlCategory = categorizeUrl(trimmedUrl);

    site.fullUrl = req.body.url;
    site.lastVisitTime = req.body.lastVisitTime;
    site.title = req.body.title;
    site.url = trimmedUrl;
    site.category = urlCategory;
    site.typedCount = req.body.typedCount;
    site.visitCount = req.body.visitCount;

    site.save((err, s) => {
      if (err) throw err;
      res.send(s);
    })

}

secondFunction();


})


router.get('/sites', (req, res, next) => {

    const aggregate = req.query.aggregate;

    // This is all the sites
    if (aggregate === 'true') {
      Site.aggregate([{
          $group: {
            _id: '$url',
            visitCount: {
              $sum: '$visitCount'
            },
            lastVisit: {
              $max: '$lastVisitTime'
            },
            category: {
              $max: '$category'
            }
          }
        }])
        .exec((err, aggregatedSites) => {

          let totalVisitCount = 0;

          for (i = 0; i < aggregatedSites.length; i++) {
            totalVisitCount += aggregatedSites[i].visitCount;
          }

          res.send({
            totalVisitCount: totalVisitCount,
            sites: aggregatedSites // Note same name
          })
        })
    } else {

      Site
        .find()
        .exec((err, sites) => {

          let totalVisitCount = 0;

          for (i = 0; i < sites.length; i++) {
            totalVisitCount += sites[i].visitCount;
          }

          res.send({
            totalVisitCount: totalVisitCount,
            sites: sites
          })
        })
    }


})

router.put('/sites', (req, res, next) => {

  console.log(req.body);
  let category = req.body.category;
  let url = req.body.url;

  Site
    .updateMany( 
      {"url": url}, 
      { "$set": { "category" : category } }, 
      {"multi": true}, 
      (err, result) => {
        res.send(result);
    });

})



module.exports = router