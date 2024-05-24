var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');

/* GET listing. */
router.get('/', async function(req, res, next) {
    try {
        //Filter 
            //GET /api/adverts?name=Sofa
            const filterByName = req.query.name;
            //GET /api/adverts?sell=true
            const filterBySell = req.query.sell;
            //GET 
            // api/adverts?tags=lifestyle house&type=all - Return ads containing ALL the tags
            // api/adverts?tags=lifestyle house&type=in - Return ads containing some tags

            const filterType = req.query.type;
            const filterByTags = req.query.tags;

            //GET 
            // api/adverts?price=
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
        
        // Pagination GET api/adverts?skip=2&limit=2
            const skip = req.query.skip;
            const limit = req.query.limit;

        // Order GET api/adverts?sort=price
            const sort = req.query.sort;

        // Select fields GET api/adverts?fields=tags
            const fields = req.query.fields;

        const adverts = await Advert.list(filter, skip, limit, sort, fields);
        res.json({results: adverts});

    } catch (error){
        next(error)
    }
});

// Return list of tags used in the adverts
router.get('/tags', async (req, res, next) => {
  try {

    // create a Set to save tags with no duplicity
    const listTags = new Set();

    // select tags from adverts
    const adverts = await Advert.find().select('tags');
    // add tags to listTags
    adverts.forEach(ad => {
      ad.tags.forEach(tag => listTags.add(tag));
    });
    // return JSON
    res.json({tags: Array.from(listTags)})

  } catch{
    next(error);
  }
});

// Return ad by ID   GET /api/adverts/<_id>
router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const advert = await Advert.findById(id);
  
      res.json({ result: advert })
    } catch (error) {
      next(error);
    }
});

// Update an ad   PUT /api/adverts/<_id> (body)
router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
  
      const updatedAd = await Advert.findByIdAndUpdate(id, data, { new: true });
  
      res.json({ result: updatedAd });
  
    } catch (error) {
      next(error);
    }
});

// Create new advert  POST /api/adverts (body)
router.post('/', async (req, res, next) => {
    try {
      const data = req.body;
  
      // create a new advert
      const advert = new Advert(data);
  
      // save to db
      const savedAdvert = await advert.save();
  
      res.json({ result: savedAdvert });
  
    } catch (error) {
      next(error);
    }
});


// Delete by id   DELETE /api/agentes/<_id>
router.delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;

      const advert = await Advert.findById(id);
  
      const deleted = await Advert.deleteOne({ _id: id });
      deleted.deletedAdvert = advert;

      //Return JSON with data of deleted advert
      res.json({deleted});
    } catch (error) {
      next(error);
    }
})


module.exports = router;
