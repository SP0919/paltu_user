const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceProviderSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serviceType_id: {
    type: Array,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);
