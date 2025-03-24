const { register, login, update, getusers, getuser, updatePassword } = require("../controllers/user");
const verifytoken = require("../lib/verifyToken");
const registerValidator = require("../middleware/registerValidator");
const userRouter = require("express").Router(); 

userRouter.post("/register", registerValidator(), register);
userRouter.post("/login", login);

userRouter.put("/update/:id",verifytoken('admin','user','agency'), update);
userRouter.put("/update/password",verifytoken('admin','user','agency'), updatePassword);
userRouter.get("/getallusers",verifytoken('admin'), getusers);
userRouter.get("/:id",verifytoken('admin','user','agency'), getuser);




module.exports = userRouter;
