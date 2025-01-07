import DmsGroup from "../model/createGroupSchema.js";
import UserGroupMapping from "../model/userGroupMapping.js";
import DmsMappingGroup from "../model/dmsGroup.js";
export const userGroupMappingController = async (req, res) => {
    try {
        let { dmsGroupDetailsId } = req.params;  // Get the ID parameter
        dmsGroupDetailsId=Number(dmsGroupDetailsId)
        // Find the DMS group by dmsGroupDetailsId

        const dmsGroup = await DmsMappingGroup.findOne({ dmsGroupDetailsId }).lean(); // `lean()` is used to return plain JSON instead of Mongoose documents
        // Check if the DMS group exists
        if (!dmsGroup) {
            return res.status(404).json({
                status: 'Error',
                message: 'DMS Group not found',
            });
        }

        // If there are any userGroupMappings, ensure they have the proper fields (null values can be added if needed)
        const formattedGroupData = {
            dmsGroupDetailsId: dmsGroup.dmsGroupDetailsId,
            name: dmsGroup.name,
            status: dmsGroup.status,
            userGroupMappings: dmsGroup.userGroupMappings.map(mapping => ({
                dmsUserGroupMappingId: mapping.dmsUserGroupMappingId,
                personNumber: mapping.personNumber,
                userName: mapping.userName || null,  // Set userName to null if not defined
                status: mapping.status || null,  // Set status to null if not defined
            }))
        };

        // Send the formatted success response
        res.status(200).json({
            status: 'Success',
            message: 'Records fetched successfully',
            data: formattedGroupData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Error fetching DMS group data',
            error: error.message,
        });
    }
};
