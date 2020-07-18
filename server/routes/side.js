const router = require('express').Router()
const Category = require('../models/categories')
const { request } = require('express');

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

router.get('/categories', (req, res, next) => {

  Category
  .find()
  .exec((err, categories) => {
    res.send(categories)
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

module.exports = router