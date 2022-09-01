const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentSchema = mongoose.Schema({
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  service_to: {
    type: String,
   
  },
  serviceType:{
   type: Schema.Types.ObjectId,
   ref: "user",
  },
  status:{
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
