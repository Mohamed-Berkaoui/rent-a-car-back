const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car");
const updatedStatus = require("../middleware/updatedstatus");
const Coupon = require("../models/Coupon");

async function getReservation(req, res, next) {
  const reservation = await Reservation.find();
  res.json(new AppSuccess(reservation));
}

async function getSinglerReservation(req, res, next) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.status(400).json(new AppFail("wrong id!!!"));
  }
  res.json(new AppSuccess(reservation));
}
async function verifyDate(dateStart, dateEnd, id, carId) {
  const reservation = await Reservation.find({
    _id: { $ne: id },
    $or: [
      {
        $and: [
          { startDate: { $lt: dateEnd } },
          { endDate: { $gt: dateStart } },
        ],
      },
    ],
  });
  const car = await Car.findById(carId);
  return reservation.length == 0;
}

async function addReservation(req, res, next) {
  if (!req.body) {
    return res.status(400).json(new AppFail("no data!!!"));
  }
  const reservation = new Reservation(req.body);
  const verified = await verifyDate(
    req.body.startDate,
    req.body.endDate,
    reservation._id,
    req.body.carId
  );
  if (!verified) {
    return res.status(400).json(new AppFail("car not availble"));
  }

  await reservation.save();
  res.json(new AppSuccess(reservation));
}
async function updateReservation(req, res, next) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.status(400).json(new AppFail("not found!!!"));
  }
  const update = await Reservation.findByIdAndUpdate( 
    req.params.id,
    {
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    },
    { returnDocument: "after" }
  );
  res.json(new AppSuccess(update));
}
async function deleteReservation(req, res, next) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.json(new AppFail("not found!!!"));
  }
  const deleted = await Reservation.findByIdAndDelete(req.params.id);

  return res.json(new AppSuccess("deleted"));
}

async function statuscompleted(req, res, next) {
  const completed = await updatedStatus(
    req.params.id,
    Reservation,
    "completed"
  );
 

  if (typeof completed == "string") {
    return res.status(400).json(new AppFail(completed+'reservation'));
  }
  // console.log(((completed.endDate-completed.startDate)/86400));
  const rented = await updatedStatus(completed.car, Car, "available");
  if (typeof rented == "string") {
    return res.status(400).json(new AppFail(rented+"car"));
  }

  let totalprice
  if(completed.coupon!=null){
    const coupon=await Coupon.findById(completed.coupon)
    totalprice=(((completed.endDate-completed.startDate)/86400000)+1)*rented.price*((100-coupon.reduction)/100)

  }
  res.json(new AppSuccess({completed,totalprice}));
}
async function statuscanceled(req, res, next) {
  const completed = await updatedStatus(req.params.id, Reservation, "canceled");
  if (typeof completed == "string") {
    return res.status(400).json(new AppFail(completed));
  }
  res.json(new AppSuccess(completed));
}
async function statusStarted(req, res, next) {
  const completed = await updatedStatus(req.params.id, Reservation, "started");

  if (typeof completed == "string") {
    return res.status(400).json(new AppFail(completed));
  }
  const rented = await updatedStatus(completed.carId, Car, "rented");
  if (typeof rented == "string") {
    return res.status(400).json(new AppFail(rented));
  }
  res.json(new AppSuccess(completed));
}

module.exports = {
  addReservation,
  getReservation,
  getSinglerReservation,
  deleteReservation,
  updateReservation,
  statuscompleted,
  statuscanceled,
  statusStarted,
};
