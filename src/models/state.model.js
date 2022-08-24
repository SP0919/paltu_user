const mongoose = require("mongoose");

const StateSchema = mongoose.Schema({
  id: {
    type: Number,
    //required: true,
  },
  name: {
    type: String,
    //required: true,
  },

  country_id: {
    type: Number,
    // required: true,
  },
  country_code: {
    type: String,
    // required: true,
  },
  country_name: {
    type: String,
    // required: true,
  },
  state_code: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
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

module.exports = mongoose.model("State", StateSchema);