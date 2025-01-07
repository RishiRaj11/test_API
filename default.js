import Group from "./model/movieSchema.js"
import Document from "./model/documentSchema.js";
import Notification from "./model/notificationSchema.js";
import DmsMappingGroup from "./model/dmsGroup.js";
import AllUser from "./model/getAllDmsSchema.js"
import UserGroupUserMapping from "./model/getFroupWithUserSchema.js";
export const  bulkInsert=async(data)=>{
  try{
    await UserGroupUserMapping.insertMany(data);
    console.log("Bulk inserted")
  }catch(e){
    console.log("error while inserting in bulk",e)
  }
   
}