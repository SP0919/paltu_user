const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
  review_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  review_to: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Review", ReviewSchema);
