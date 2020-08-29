const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/overview', { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const FeatureSchema = new Schema({
  feature: String,
  value: String,
});

const PhotoSchema = new Schema({
  thumbnail_url: String,
  url: String,
});

const StyleSchema = new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Number,
  photos: [PhotoSchema],
  skus: {},
});

const Product = mongoose.model('product', {
  id: { type: Number, required: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [FeatureSchema],
  results: [StyleSchema],
  related: Array,
});

// const SkuClothingSchema = new Schema({
//   XS: Number,
//   S: Number,
//   M: Number,
//   L: Number,
//   XL: Number,
//   XXL: Number,
// });

// const SkuShoeSchema = new Schema({
//   7: Number,
//   75: Number,
//   8: Number,
//   85: Number,
//   9: Number,
//   95: Number,
//   10: Number,
//   105: Number,
//   11: Number,
//   115: Number,
//   12: Number,
// });

// const SkuDefaultSchema = new Schema({
//   One_Size: Number,
// });

// queries for routes ...

module.exports = Product;
