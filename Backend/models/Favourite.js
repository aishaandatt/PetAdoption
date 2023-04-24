// models/favorite.js

const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
