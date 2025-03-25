const User = require("../models/User");
const AppFail = require("./AppFail");
const jwt = require("jsonwebtoken");

function verifytoken(...role) {
  return async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json(new AppFail("not authorized"));
    }
    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT);
    } catch (err) {
      return res.json(new AppFail("not authorized"));
    }
    const user = await User.findById(decode.user);
    if (!user) {
      return res.json(new AppFail("not authorized"));
    }
    if (!role.includes(user.role)) {
      return res.json(new AppFail("not authorized"));
    }
    delete user.password;
    req.user = user;
    next();
  };
}
module.exports = verifytoken;
