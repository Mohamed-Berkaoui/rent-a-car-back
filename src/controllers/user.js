const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const generatetoken = require("../lib/generateToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
async function register(req, res, next) {
  const result = validationResult(req);
  console.log("🚀 ~ register ~ result:", result);

  if (!result.isEmpty()) {
    return res.json(new AppFail("verify your cridentions"));
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
  res.cookie("token", token, { httpOnly: true, secure: false, path: "/" });
  existUser.password = "";
  res.json(new AppSuccess(existUser));
}

/**
 * @todo protect route
 */
async function update(req, res, next) {
  if (!req.body) {
    return res.json(new AppFail("failed"));
  }

  const user =
    req.user.role == "admin"
      ? {
          email: req.body.email,
          name: req.body.name,
          phone: req.body.phone,
          isBanned: req.body.isBanned,
        }
      : { name: req.body.name, phone: req.body.phone };
  if (!(req.user.role == "admin" || req.user._id == req.params.id)) {
    return res.json(new AppFail("failed"));
  }
  const updateuser = await User.findByIdAndUpdate(req.params.id, user, {
    returnDocument: "after",
  });
  return res.json(new AppSuccess(updateuser));
}
async function updatePassword(req, res, next) {
  if (!req.body) {
    return res.json(new AppFail("failed"));
  }
  let user = await User.findById(req.user._id);
  if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
    return res.json(new AppFail("failed"));
  }
  user.password=bcrypt.hashSync(req.body.newPassword,10)
  await user.save()
  res.json(new AppSuccess(user));
}
async function getusers(req, res, next) {
  const getallusers = await User.find();
  return res.json(new AppSuccess(getallusers));
}
async function getuser(req, res, next) {
  const getallusers = await User.findById(req.params.id);
  return res.json(new AppSuccess(getallusers));
}

module.exports = { register, login, getusers, update, getuser,updatePassword };
