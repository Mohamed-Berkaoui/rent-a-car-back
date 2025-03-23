const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "rentacar" });
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}


module.exports=connectToDb