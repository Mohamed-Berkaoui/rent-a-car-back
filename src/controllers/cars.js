const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const updatestatus = require("../middleware/updatedstatus");
const Car = require("../models/Car");
const Reservation=require('../models/Reservation')

async function getAllCars(req, res, next) {

  const cars = await Car.find();
  res.json(new AppSuccess(cars));
}
async function getCar(req, res, next) {

  const car = await Car.findById(req.params.id);
 if(!car){
  return res.status(400).json(new AppFail('car not found'))
 } 
  res.json(new AppSuccess(car));
}
async function updateCar(req, res, next) {
  if(!req.body){
    return res.status(400).json(new AppFail('error!!'))
  }
  const car=await Car.findById(req.params.id)
  if(!car){
    return res.status(400).json(new AppFail('car not found!!'))
  }
  const updatedcar=await Car.findByIdAndUpdate(car._id,req.body,{returnDocument:"after"})
  res.json(new AppSuccess(updatedcar));
  next()
}
async function updateMaintenance(req,res,next){
  const car=await updatestatus(req.params.id,Car,"maintenance")
  if(typeof(car)=='string'){
    return res.status(400).json(new AppFail(car))
  }

  const date=new Date()
 let d1=new Date(date.getFullYear() ,date.getMonth() ,date.getDate()+1 )
 let d2=new Date(date.getFullYear() ,date.getMonth() ,date.getDate()+3 )

  const reservation = await Reservation.find({
  
    $or: [
      {
        $and: [
          { startDate: { $lte: d2 } },
          { startDate: { $gte: d1 } },
        ],
      },
    ],
  });

  res.json(new AppSuccess({car,reservation}))
}
async function addNewCar(req, res, next) {

  if (!req.body) {
    return res.status(400).json(new AppFail("failed"));
  }
  const car = new Car(req.body);
  await car.save();
  res.json(new AppSuccess(car));
}
async function deleteCar(req, res, next) {
  const car=await Car.findByIdAndDelete(req.params.id)
  return res.json(new AppSuccess(car))
}


module.exports = { getAllCars, getCar, updateCar, addNewCar, deleteCar ,updateMaintenance};
