const AppSuccess = require("../lib/AppSuccess");
const Car = require("../models/Car");

async function getAllCars(req, res, next) {
  const cars =await  Car.find();
  res.json(new AppSuccess(cars));
}
async function getCar(req, res, next) {
  const car = await Car.findById(req.params.id);
  res.json(new AppSuccess(car));
}
async function updateCar(req, res, next) {}
async function addNewCar(req, res, next) {
  if (req.user.role != "admin") {
    return res.json(new AppFail("failed"));
  }
  if (!req.body) {
    return res.json(new AppFail("failed"));
  }
  const car=new Car(req.body)
  await car.save()
  res.json(new AppSuccess(car))
}
async function deleteCar(req, res, next) {}

module.exports = { getAllCars, getCar, updateCar, addNewCar, deleteCar };
