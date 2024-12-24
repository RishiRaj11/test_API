import Group from "./model/movieSchema.js"

export const  bulkInsert=async(data)=>{
  try{
    await Group.insertMany(data);
    console.log("Bulk inserted")
  }catch(e){
    console.log("error while inserting in bulk")
  }
   
}