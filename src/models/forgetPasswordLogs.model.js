const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForgetpasswordLogSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
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

module.exports = mongoose.model("ForgetpasswordLog", ForgetpasswordLogSchema);
