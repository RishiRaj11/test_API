import Group from "./model/movieSchema.js"
import Document from "./model/documentSchema.js";
import Notification from "./model/notificationSchema.js";
export const  bulkInsert=async(data)=>{
  try{
    await Notification.insertMany(data);
    console.log("Bulk inserted")
  }catch(e){
    console.log("error while inserting in bulk",e)
  }
   
}