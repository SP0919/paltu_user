const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  iso3: {
    type: String,
    // required: true,
  },
  iso2: {
    type: String,
    // required: true,
  },
  numeric_code: {
    type: Number,
    // required: true,
  },
  phone_code: {
    type: Number,
    // required: true,
  },
  capital: {
    type: String,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  currency_name: {
    type: String,
    // required: true,
  },
  currency_symbol: {
    type: String,
    // required: true,
  },
  tld: {
    type: String,
    // required: true,
  },
  native: {
    type: String,
    // required: true,
  },
  region: {
    type: String,
    // required: true,
  },
  subregion: {
    type: String,
    // required: true,
  },
  timezones: {
    type: Array,
    // required: true,
  },
  translations: {
    type: Object,
    // required: true,
  },
  latitude: {
    type: String,
    // required: true,
  },
  longitude: {
    type: String,
    // required: true,
  },
  emoji: {
    type: String,
    // required: true,
  },
  emojiU: {
    type: String,
    // required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
  is_active: { type: Number, default: 1 },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Countries", CountrySchema);
