const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    car: { type: mongoose.Types.ObjectId, ref: "car" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coupon: { type: mongoose.Types.ObjectId, ref: "coupon", default: null },
    status: { type: String, enum: ["canceled", "completed", "pending"] },
  },
  { timestamps: true, versionKey: false }
);

const Reservation = mongoose.model("reservation", ReservationSchema);
module.exports = Reservation
