const mongoose=require('mongoose')


const carSchema=new mongoose.Schema({
    model:{type:String,required:true},
    brand:{type:String,required:true},
    horsePower:{type:Number,required:true},
    energy:{type:String,required:true,enum:["diesel","petrol","electric","hybride"]},
    nbOfPlaces:{type:Number,required:true},
    mileage:{type:Number},
    tankVolume:{type :Number},
    consumption:{type:Number,required:true},
    gear:{type:String,required:true,enum:["manual","automatic"]},
    status:{type:String,required:true,enum:["available","rented","maintenance"] ,default:"available"},
    color:{type:String},
    image:{type:[String]},
    date:{type:Date,required:true},
    price:{type:Number,required:true}  ,

},{timestamps:true,versionKey:false})
const Car=mongoose.model('car',carSchema)
module.exports=Car
