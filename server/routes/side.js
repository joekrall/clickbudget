const router = require('express').Router()
const Category = require('../models/categories')
const axios = require('axios')
const { request } = require('express');

router.post('/categories', (req, res, next) => {

  let category = new Category();

  category.name = req.body.name;

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
  let maxClick = req.body.maxClick;

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

module.exports = router