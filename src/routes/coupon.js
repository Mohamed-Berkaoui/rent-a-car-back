const { creatCoupon, getCoupon, updateCoupon, deleteCoupon } = require("../controllers/coupon");
const verifytoken=require('../lib/verifyToken')
const couponRouter = require("express").Router();


couponRouter.post('/',verifytoken('admin'),creatCoupon)
couponRouter.get('/',verifytoken('admin'),getCoupon)
couponRouter.put('/:id',verifytoken('admin'),updateCoupon)
couponRouter.delete('/:id',verifytoken('admin'),deleteCoupon)

module.exports=couponRouter