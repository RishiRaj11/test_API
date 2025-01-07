import AllUser from "../model/getAllDmsSchema.js";
export const getAllUserController=async(req,res)=>{
    try {
        const records = await AllUser.find().select('-_id -__v');; // Find all records in the collection
        res.status(200).json(records); // Return records as JSON response
    } catch (err) {
        res.status(500).json({ message: "Error retrieving records", error: err });
    } 
}