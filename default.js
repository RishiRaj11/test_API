import Group from "./model/movieSchema.js"
import Document from "./model/documentSchema.js";
export const  bulkInsert=async(data)=>{
  try{
    await Document.insertMany(data);
    console.log("Bulk inserted")
  }catch(e){
    console.log("error while inserting in bulk")
  }
   
}