const { verify } = require("jsonwebtoken");
const {
  getReservation,
  getSinglerReservation,
  addReservation,
  deleteReservation,
  updateReservation,
  statusStarted,
  statuscanceled,
  statuscompleted,
} = require("../controllers/reservation");
const verifytoken = require("../lib/verifyToken");

const ReseravationRouter = require("express").Router();

ReseravationRouter.get("/", verifytoken('admin','agent','user'),getReservation);
ReseravationRouter.get("/:id",verifytoken('admin','agent','user'), getSinglerReservation);

ReseravationRouter.post("/",verifytoken('admin','agent','user'),  addReservation);
ReseravationRouter.delete("/:id",verifytoken('admin') , deleteReservation);
ReseravationRouter.put("/:id",verifytoken('admin','agent') , updateReservation);

ReseravationRouter.put("/started/:id",verifytoken('admin','agent') ,statusStarted);
ReseravationRouter.put("/cancled/:id",verifytoken('admin','agent'),  statuscanceled);
ReseravationRouter.put("/completed/:id",verifytoken('admin','agent') , statuscompleted);

module.exports = ReseravationRouter;
