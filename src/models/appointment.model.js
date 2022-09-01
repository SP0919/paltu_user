const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentSchema = mongoose.Schema({
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
<<<<<<< HEAD
  service_to: {
=======
  // serviceProvider: {
  //   type: Schema.Types.Objected,
  //   ref: "User",
  // },
  name: {
>>>>>>> 6ff4c0e4d58019837c8e98797a7420f265c9bfe8
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

module.exports = mongoose.model("Appointment", AppointmentSchema);
