const mongoose=require('mongoose')

const CouponSechema=new mongoose.Schema({
    code:{type:String,required:true},
    reduction:{type:Number,required:true},
    enabled:{type:Boolean,default:false}
},{timestamps:true,versionKey:false})

const Coupon=mongoose.model('coupon',CouponSechema)
module.exports=Coupon

