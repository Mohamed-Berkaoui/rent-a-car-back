const { body } = require("express-validator");

function registerValidator(){
      return [body("email").notEmpty().isEmail(), body("name").trim().notEmpty()]
}

module.exports=registerValidator