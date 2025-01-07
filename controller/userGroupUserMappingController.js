
import UserGroupUserMapping from "../model/getFroupWithUserSchema.js";
export const userGroupUserMappingController=async(req,res)=>{
    const {personNumber}=req.params;
    try {
        // Retrieve all records from the UserGroupMapping collection
        const userGroupMappings = await UserGroupUserMapping.find({personNumber}).select('-_id -__v');

        if (userGroupMappings.length === 0) {
            return res.status(404).json({
                status: 'Error',
                message: 'No records found'
            });
        }

        // Map to remove `personNumber` from the response and send the modified data
        const filteredResponse = userGroupMappings.map(mapping => {
            const { personNumber, ...rest } = mapping.toObject(); // Remove `personNumber`
            return rest;
        });

        // Return success response with the filtered data
        res.status(200).json(filteredResponse);
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Error fetching user group mappings',
            error: error.message
        });
    }
}