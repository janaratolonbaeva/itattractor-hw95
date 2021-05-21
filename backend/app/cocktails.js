const express = require('express');
const auth = require('../middleware/auth');
const Cocktail = require("../models/Cocktail");
const permit = require("../middleware/permit");
const upload = require('../multer').cocktails;

const router = express.Router();

router.get('/all', auth, async (req, res) => {
  try {
    let cocktails = [];

    if(req.user.role === 'admin') {
      cocktails = await Cocktail.find();
    } else {
      cocktails = await Cocktail.find({published: true});
    }
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, permit('admin', 'user'), upload.single('image'),  async (req, res) => {
  try {
    const cocktailData = {
      title: req.body.title,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients),
      user: req.user._id
    }

    if (req.file) {
      cocktailData.image = req.file.filename;
    }

    const cocktail = new Cocktail(cocktailData);
    await cocktail.save();
    res.send(cocktailData);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', auth, permit('user', 'admin'), async (req, res) => {
  try {
    const cocktail = await Cocktail.deleteOne({_id: req.params.id});
    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/rating', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail.findOneAndUpdate({_id: req.body._id, rating: {user: req.body._id}},
      {"$set": {"rating.$.star": req.body.rating.star}}
    );

    await Cocktail.findOneAndUpdate({_id: req.body._id, rating: {$not: {$elemMatch: {user: req.body._id}}}},
        {$push: {rating: {user: req.body._id, star: req.body.rating.star}}}
    );

    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const cocktail = await Cocktail.findOneAndUpdate({_id: req.params.id}, {"$set": {published: true}});
    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/user-cocktails', auth, async (req, res) => {
  try {
    let criteria = {};

    if (req.user._id) {
      criteria = {user: req.user._id};
    }

    const cocktails = await Cocktail.find(criteria);
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findOne({_id: req.params.id});

    if (cocktail) {
      res.send(cocktail);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;