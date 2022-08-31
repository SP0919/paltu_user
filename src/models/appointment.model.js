const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serviceProvider: {
    type: Schema.Types.Objected,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  notification: {
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

module.exports = mongoose.model(" Appointment", AppointmentSchema);
