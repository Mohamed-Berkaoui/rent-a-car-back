const { getAllCars, getCar, addNewCar, deleteCar, updateCar } = require("../controllers/cars");
const verifytoken = require("../lib/verifyToken");
const carRouter = require("express").Router(); 

carRouter.get("/",getAllCars)
carRouter.post("/",verifytoken('admin'),addNewCar)
carRouter.get("/:id",getCar)
carRouter.delete("/:id",verifytoken('admin'),deleteCar)
carRouter.put("/:id",verifytoken('admin','agent'),updateCar)




module.exports=carRouter