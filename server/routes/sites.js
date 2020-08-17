const router = require('express').Router()
const Site = require('../models/sites')
const Category = require('../models/categories')
const axios = require('axios');
const { request } = require('express');

module.exports = function (router) {
/* -------- Routes - /categories ----------------*/

router.post('/categories', (req, res, next) => {

  // Sanitize and standardize category name
  let newCategoryName = req.body.name;
  if (newCategoryName.length > 25) {
    res.send("Invalid entry")
  } else {

    Category
      .find()
      .exec((err, categories) => {

        if (categories.some((category) => category.name === req.body.name)) {
          res.send("Category already exists!")
        } else {

          let category = new Category();
          category.name = newCategoryName;
          category.save((err, cat) => {
            if (err) throw err;
            res.send(cat);
          })

        }

      })

  }

})

router.get('/categories', (req, res, next) => {

  // Categories are sorted alphatically
  Category
  .find()
  .sort({name: 1})
  .exec((err, categories) => {
    res.send(categories)
  })

}) 

// Update category budget or sites
router.put('/categories/:category', (req, res, next) => {

  let site = req.body.site;
  let maxVisits = req.body.maxVisits;

  // If req.body.maxVisits exists, we update based on request
  if (maxVisits) {
    Category
    .findById(req.params.category, (err, category) => {
      if (err) throw err;

      if (maxVisits === "CLEAR")
        category.maxVisits = "";
      else {
        category.maxVisits = maxVisits;
      }

        category.save(err => {
          if (err) throw err;
          else console.log('maxVisits successfully added!');
        });

        res.send(category);
      });    

  // If req.body.site exists, we pull the matching site from 
  // any other sites array on each of the existing categories,
  // and then add it to the category specified by req.params.category
  }  else if (site) {


    Category
      .update(
      {"sites": site }, 
      {'$pull': {"sites": site } }, 
      {"multi": true},
      function (err, val) {
        console.log(val)
      });

    Category
      .findById(req.params.category, (err, category) => {
        if (err) throw err;


      if (category.sites.includes(site)) {        
          res.send("Site already exists in category!")
      }
        else {
          category.sites.push(site);
          category.save(err => {
            if (err) throw err;
            else console.log('Site successfully added!');
          });
          res.send(category);
        }
      });
    }

})


router.delete('/categories/:category', (req, res, next) => {


  Category
  .deleteOne({ _id: req.params.category }, function (err) {
    if (err) return handleError(err);
    else res.send("Category " + req.params.category + " has been deleted");
    });
})

// When the server begins listening, we send 
// out an initial function call to get categoriesForRoutes,
// used by the categorizeUrl util below

let categoriesForRoutes = [];

axios.get('http://localhost:8000/categories')
    .then(result => { console.log("Categories now populating"); setCategories(result); })
    .catch(error => { console.error(error); return Promise.reject(error); });

const setCategories = (response) => {
  categoriesForRoutes = response.data;
}

/* ------------ utils - /sites ----------------*/

const trimUrl = (url) => {

  // removes http
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

  // remove everything after the first slash
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
 
  categoriesForRoutes.forEach((category) => {
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
    return "(Uncategorized)";
  }

}

/* -------- Routes - /sites ----------------*/

router.post('/sites', (req, res, next) => {

  const requestThenAddNewSites = async () => {

  // First checking if any sites have been added to any categories
  // Then create new site and categorize it if applicable
  await axios.get('http://localhost:8000/categories')
    .then(result => { console.log("Categories now re-populating"); setCategories(result); })
    .catch(error => { console.error(error); return Promise.reject(error); });

    let site = new Site();

    // data processing
    let trimmedUrl = trimUrl(req.body.url);
    let urlCategory = categorizeUrl(trimmedUrl);

    // creating new site
    site.lastVisitTime = req.body.lastVisitTime;
    site.typedCount = req.body.typedCount;
    site.visitCount = req.body.visitCount;
    site.title = req.body.title;
    site.url = trimmedUrl;
    site.fullUrl = req.body.url;
    site.category = urlCategory;

    site.save((err, s) => {
      if (err) throw err;
      res.send(s);
    })

}

requestThenAddNewSites();

})


router.get('/sites', (req, res, next) => {

    const aggregate = req.query.aggregate;

    // Return all the sites aggregated by (trimmed) url
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
            firstVisit: {
              $min: '$lastVisitTime'
            },
            category: {
              $max: '$category'
            }
          } },
          { 
            $sort: { _id: 1 } 
          }
        ])
        .exec((err, aggregatedSites) => {
          
          // Get count for each category
          let categoryCountArray = aggregatedSites.reduce((accumulator, currentSite) => {
            let currentCategoryName = currentSite.category;
            let currentVisitCount = currentSite.visitCount;
            let categoryObject = {
              name: currentCategoryName,
              count: currentVisitCount
            }
          
            if (accumulator.some( obj => obj['name'] === categoryObject.name )) {
                accumulator.forEach((obj) => {
                  if (obj['name'] === categoryObject.name) {
                    obj.count += categoryObject.count;
                  }
                })
              } else {
          
                accumulator.push(categoryObject);
              }
            return accumulator;
          }, [])

          // Get total visits across all aggregated sites
          let totalVisitCount = 0;

          for (i = 0; i < aggregatedSites.length; i++) {
            totalVisitCount += aggregatedSites[i].visitCount;
          }

          // Get dates for first and last visit for each aggregate of sites
          let lastVisit = aggregatedSites.reduce((maxValue, currentAggregate) => {
            if (maxValue < currentAggregate.lastVisit) {
              maxValue = currentAggregate.lastVisit;
            }
              return maxValue
          }, 0);
          let firstVisit = aggregatedSites.reduce((minValue, currentAggregate) => {
            if (minValue > currentAggregate.firstVisit) {
              minValue = currentAggregate.firstVisit;
            }
              return minValue
          }, lastVisit);

          // Get max of lastVisit and min of firstVisit of aggregatedSites

          res.send({
            firstVisit: firstVisit,
            lastVisit: lastVisit,
            categoryCountArray: categoryCountArray,
            totalVisitCount: totalVisitCount,
            sites: aggregatedSites // Note same name
          })
        })

    // If "aggregate" is false, return all the sites uncategorized
    } else {

      Site
        .find()
        .exec((err, sites) => {

          let totalVisitCount = 0;

          for (i = 0; i < sites.length; i++) {
            totalVisitCount += sites[i].visitCount;
          }

          
          let lastVisit = sites.reduce((maxValue, currentSite) => {
            if (maxValue < currentSite.lastVisitTime) {
              maxValue = currentSite.lastVisitTime;
            }
              return maxValue
          }, 0);

          let firstVisit = sites.reduce((minValue, currentSite) => {
            if (minValue > currentSite.lastVisitTime) {
              minValue = currentSite.lastVisitTime;
            }
              return minValue
          }, lastVisit);


          res.send({
            totalVisitCount: totalVisitCount,
            firstVisit: firstVisit,
            lastVisit: lastVisit,
            sites: sites
          })
        })
    }


})

router.put('/sites', (req, res, next) => {
 
  let category = req.body.category;
  let url = req.body.url;
  let categoryId = req.body.categoryId;

  // Uncategorize sites (when categoryId is deleted)
  if (categoryId !== "none") {

    Category
      .findById(categoryId, function (err, category) {
        if (err) return handleError(err);

        for (let i = 0; i < category.sites.length; i++) {
          Site
          .updateMany( 
            {"url": category.sites[i]}, 
            { "$set": { "category" : "(Uncategorized)" } }, 
            {"multi": true}, 
            (err) => {
              if (err) return handleError(err);
          });
        }
      });


    res.send("All the sites are now uncategorized!")

  // Categorize site
  } else {
    
    Site
      .updateMany( 
        {"url": url}, 
        { "$set": { "category" : category } }, 
        {"multi": true}, 
        (err, result) => {
          res.send(result);
      });

    }

})

}