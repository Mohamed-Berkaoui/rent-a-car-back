const { register, login } = require("../controllers/user");
const registerValidator = require("../middleware/registerValidator");
const userRouter = require("express").Router();

userRouter.post("/register", registerValidator(), register);
userRouter.post("/login", login);

module.exports = userRouter;
