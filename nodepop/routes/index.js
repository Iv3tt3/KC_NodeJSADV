var express = require('express');
var router = express.Router();
const Advert = require('../models/Advert');
const { query, validationResult } = require('express-validator') 

/* GET home page. */
router.get('/', 
  //Validations for queries with express-validator
    [ 
    query('sell').optional().isBoolean().withMessage('must be false or true'),
    query('price').optional().isNumeric().withMessage('must be a number'),
    query('skip').optional().isNumeric().withMessage('must be a number'),
    query('limit').optional().isNumeric().withMessage('must be a number'),
    ], 
  (req, res, next) => {
    validationResult(req).throw(); 
    next();
  },
  async function(req, res, next) {
  try{
    //Filter 
      //GET /?name=Sofa
      const filterByName = req.query.name;
      //GET /?sell=true
      const filterBySell = req.query.sell;
      //GET 
      // ?tags=lifestyle house&type=all - Return ads containing ALL the tags
      // ?tags=lifestyle house&type=in - Return ads containing some tags

      const filterType = req.query.type;
      const filterByTags = req.query.tags;

      //GET 
      // ?price=
      const filterByPrice = req.query.price;

      const filter = {};

      if (filterByName) {
          filter.name = new RegExp('^' + filterByName, "i")
      }

      if (filterBySell) {
          filter.sell = filterBySell;
      }

      if (filterByTags) {
        filter.tags = { $all: filterByTags.split(' ') };
        if (filterType === 'in'){
            filter.tags = { $in: filterByTags.split(' ') };
        }
      }

      if (filterByPrice) {
          const [minPrice, maxPrice] = filterByPrice.split('-');
          if (minPrice && maxPrice) {
            filter.price = { $gte: (minPrice), $lte: (maxPrice) };
          } else if (minPrice) {
              filter.price = { $gte: (minPrice) };
          } else if (maxPrice) {
              filter.price = { $lte: (maxPrice) };
          }
      }
        
    // Pagination GET ?skip=2&limit=2
        const skip = req.query.skip;
        const limit = req.query.limit;

    // Order GET ?sort=price
        const sort = req.query.sort;

    // Select fields GET ?fields=tags
        const fields = req.query.fields;

        const adverts = await Advert.list(filter, skip, limit, sort, fields);

  res.render('index', {title: "Nodepop adverts", adverts: adverts});
  
  } catch (error){
    next(error)
  }
});

module.exports = router;
