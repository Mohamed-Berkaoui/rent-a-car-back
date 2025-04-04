const AppFail = require("../lib/AppFail");
const AppSuccess = require("../lib/AppSuccess");
const Coupon = require("../models/Coupon");

async function creatCoupon(req, res, next) {
  const coupon = new Coupon(req.body);
  if (!coupon) {
    return res.status(400).json(new AppFail("enter a coupon!!"));
  }
  await coupon.save();
  res.json(new AppSuccess(coupon));
}
async function getCoupon(req, res, next) {
  const coupon = await Coupon.find();
  return res.json(new AppSuccess(coupon));
}
async function updateCoupon(req, res, next) {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return res.status(400).json(new AppFail("not found!!"));
  }
  const update = await Coupon.findByIdAndUpdate(coupon._id, req.body, {
    returnDocument: "after",
  });
  res.json(new AppSuccess(update));
}

async function deleteCoupon(req, res, next) {
  const update = await Coupon.findByIdAndDelete(req.params.id);
  res.json(new AppSuccess(update));
}

module.exports = { creatCoupon, getCoupon, deleteCoupon, updateCoupon };
