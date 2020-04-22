var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const query = {};

    req.query.title ? query.title = req.query.title : '';
    req.query.city ? query.city = req.query.city : '';
    req.query.type ? query.type = req.query.type : '';
    req.query.description ? query.$text = {$search: req.query.description} : '';

    if (req.query.tags) {
      const tagsArray = req.query.tags.split(' ');
      query.tags = {$in: tagsArray};
    }

    if(req.query.price) {
      const priceSplited = req.query.price.split('-');
      priceSplited[0] > 0 ? query.price = {$gt: priceSplited[0]} : query.price = {$gt: 0};
      priceSplited[1] > 0 ? query.price.$lt = priceSplited[1] : '';
    }

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const select = req.query.select;

    const ads = await Ad.filter(query, limit, skip, sort, select);
    ads.forEach(ad => {
      if(!ad.cover) {
        ad.cover = './fallback_pic/no-image.png';
      }  
    });
    
    res.render('view', { 
      ads
    });
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async(req, res, next) => {
  try {
    const _id = req.params.id;
    const ad = await Ad.findOne({_id});
    !ad.cover ? ad.cover = '../fallback_pic/no-image.png' : ad.cover = '../' + ad.cover;
    if(ad.pictures.length > 0) {
      ad.pictures.map(pic => `../${pic}`);
    }
    console.log(ad);
    res.render('single_ad',{ad});
  } catch(err) {
    next(err);
  }
});




module.exports = router;
