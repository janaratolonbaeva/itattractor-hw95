const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  title: String,
  amount: String
});

const RatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  star: {
    type: Number,
    min: 1,
    max: 5
  }
});

const CocktailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: String,
  recipe: String,
  published: {
    type: Boolean,
    default: false
  },
  ingredients: [IngredientSchema],
  rating: [RatingSchema]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;