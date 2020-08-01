const router = require('express').Router()
const Category = require('../models/categories')
const axios = require('axios')
const { request } = require('express');

router.post('/categories', (req, res, next) => {

  let category = new Category();

  category.name = req.body.name;

  // For future implementation

  // if (req.body.sites) {
  //   for (let i = 0; i < req.body.sites.length; i++) {
  //     category.sites.push(req.body.sites[i]);
  //   }
  // }

  category.save((err, cat) => {
    if (err) throw err;
    res.send(cat);
  })

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


// What I need to do here is decide if we have NULL come back
// for maxClick or for site, to basically route the req to the
// to the correct property to update.
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

module.exports = router