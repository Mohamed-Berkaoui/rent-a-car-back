const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car");
async function getReservation(req, res, next) {
  const reservation = await Reservation.find();
  res.json(new AppSuccess(reservation));
}

async function getSinglerReservation(req, res, next) {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.json(new AppFail("wrong id!!!"));
  }
  res.json(new AppSuccess(reservation));
}
async function verifyDate(dateStart, dateEnd, id, carId) {
  const reservation = await Reservation.find({
    _id:{$ne:id},
    $or: [
      {
        $and: [
          { startDate: { $lt:dateEnd } },
          { endDate: { $gt: dateStart } },
        ],
      },
    ]
  });
  const car = await Car.findById(carId);
  return reservation.length == 0;
}



async function addReservation(req, res, next) {
  if (!req.body) {
    return res.json(new AppFail("no data!!!"));
  }
  const reservation = new Reservation(req.body);
  const verified=await verifyDate(req.body.startDate,req.body.endDate,reservation._id,req.body.carId)
  if (!verified) {
    return res.json(new AppFail("car not availble"));
  }
  

  await reservation.save();
  res.json(new AppSuccess(reservation));
}
async function updateReservation(req, res, next) {}
async function deleteReservation(req, res, next) {}
module.exports = {
  addReservation,
  getReservation,
  getSinglerReservation,
  deleteReservation,
  updateReservation,
};
