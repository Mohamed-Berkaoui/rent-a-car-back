const { getReservation, getSinglerReservation, addReservation } = require("../controllers/reservation");

const ReseravationRouter = require("express").Router(); 


ReseravationRouter.get('/',getReservation)
ReseravationRouter.get('/:id',getSinglerReservation)

ReseravationRouter.post('/',addReservation)


module.exports = ReseravationRouter;
