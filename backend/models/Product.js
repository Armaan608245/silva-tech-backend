const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  /* BASIC */

  name: String,

  price: Number,

  description: String,

  category: String,

  subcategory: String,

  /* BRAND */

  brand: String,

  warranty: String,

  stock: {
    type: Number,
    default: 0
  },

  emi: String,

  installation: String,

  /* COMPUTER */

  processor: String,

  ram: String,

  storage: String,
  memory: String,
  color: String,

  /* PRINTER */

  printerType: String,

  printSpeed: String,

  wireless: String,

  /* NETWORK */

  networkSpeed: String,

  wifiStandard: String,

  coverage: String,

  /* DSLR */

  sensorType: String,

  megapixels: String,

  videoQuality: String,

  /* SPARES */

  compatibility: String,

  spareType: String,

  /* MEDIA */

  media: [String],

  /* FLAGS */

  isTopSeller: {

    type: Boolean,

    default: false
  },

  isComingSoon: {

    type: Boolean,

    default: false
  },

  isFeatured: {

    type: Boolean,

    default: false
  }

});

module.exports = mongoose.model(
  "Product",
  productSchema
);