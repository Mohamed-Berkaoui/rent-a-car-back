
async function updatestatus(id,model,newStatus){
  const checkid= await model.findById(id);
  if (!checkid) {
    return 'not found'
  }
  const newupdatedstatus=await model.findByIdAndUpdate(id,{status:newStatus},{returnDocument:'after'})
return newupdatedstatus
}
module.exports=updatestatus