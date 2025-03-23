const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const generatetoken = require("../lib/generateToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
async function register(req, res, next) {

    const result=validationResult(req)
    console.log("🚀 ~ register ~ result:", result)

    if (!result.isEmpty()) {
        return res.json(new AppFail("verify your cridentions"))
    }
  const existUser = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existUser) {
    return res.json(new AppFail("user already exist!!!"));
  }

  const user = new User(req.body);
  user.password = bcrypt.hashSync(user.password, 10);
  await user.save();
  user.password = "";
  return res.json(new AppSuccess(user));
}
async function login(req, res, next) {
  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    return res.json(new AppFail("somthing went wrong!!"));
  }
  const verifypassoword = bcrypt.compareSync(
    req.body.password,
    existUser.password
  );
  if (!verifypassoword) {
    return res.json(new AppFail("somthing went wrong!!"));
  }
  const token = generatetoken(existUser._id);
  if (!token) {
    return res.json(new AppFail("smth went wrong ..."));
  }
  res.cookie("token", token);
  existUser.password = "";
  res.json(new AppSuccess(existUser));
}

module.exports = { register, login };
