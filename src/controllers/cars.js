const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const Car = require("../models/Car");

async function getAllCars(req, res, next) {
  const cars = await Car.find();
  res.json(new AppSuccess(cars));
}
async function getCar(req, res, next) {

  const car = await Car.findById(req.params.id);
 if(!car){
  return res.json(new AppFail('car not found'))
 } 
  res.json(new AppSuccess(car));
}
async function updateCar(req, res, next) {
  if(!req.body){
    return json.res(new AppFail('error!!'))
  }
  const car=await Car.findById(req.params.id)
  if(!car){
    return res.json(new AppFail('car not found!!'))
  }
  const updatedcar=await Car.findByIdAndUpdate(car._id,req.body,{returnDocument:"after"})
  res.json(new AppSuccess(updatedcar));
  next()


}
async function addNewCar(req, res, next) {

  if (!req.body) {
    return res.json(new AppFail("failed"));
  }
  const car = new Car(req.body);
  await car.save();
  res.json(new AppSuccess(car));
}
async function deleteCar(req, res, next) {
  const car=await Car.findByIdAndDelete(req.params.id)
  return res.json(new AppSuccess(car))
}

module.exports = { getAllCars, getCar, updateCar, addNewCar, deleteCar };
