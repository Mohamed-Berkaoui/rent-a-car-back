
const jwt=require('jsonwebtoken')
function generatetoken(id){
return jwt.sign({user:id},process.env.JWT,{expiresIn:'1d'})
}

module.exports=generatetoken