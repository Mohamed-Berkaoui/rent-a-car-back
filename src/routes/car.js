const { getAllCars, getCar, addNewCar } = require("../controllers/cars");
const verifytoken = require("../lib/verifyToken");
const carRouter = require("express").Router(); 

carRouter.get("/",getAllCars)
carRouter.get("/:id",getCar)
carRouter.post("/",verifytoken('admin'),addNewCar)


module.exports=carRouter