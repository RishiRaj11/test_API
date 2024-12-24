import DmsUserGroupMapping from "../model/dmsgroupMapping.js";
import DmsGroupDetails from "../model/groupDetails.js";
import Group from "../model/movieSchema.js";
import Entity from "../model/postSchema.js";
  // Assuming the schema is saved in models/Entity.js

  // Assuming the model is saved in models/DmsGroupDetails.js
  export const getGroupDetailsById = async (req, res) => {
    try {
        const { dmsGroupDetailsId } = req.params; // Fetch the dmsGroupDetailsId from the URL parameter
        
        // Fetch the group details based on dmsGroupDetailsId
        const groupDetails = await DmsGroupDetails.findOne({ dmsGroupDetailsId }).exec();

        if (!groupDetails) {
            return res.status(404).json({
                message: "Group details not found"
            });
        }

        // Fetch user group mappings for this group
        const userGroupMappings = await DmsUserGroupMapping.find({ dmsGroupDetailsId })
            .select('dmsUserGroupMappingId personNumber userName status')
            .exec();

        // Map user group mappings to match the desired response format
        const formattedUserGroupMappings = userGroupMappings.map(mapping => ({
            dmsUserGroupMappingId: mapping.dmsUserGroupMappingId,
            personNumber: mapping.personNumber,
            userName: mapping.userName,
            status: mapping.status || 'inActive'  // Default to "inActive" if no status provided
        }));

        // Construct the response object
        const responseData = {
            dmsGroupDetailsId: groupDetails.dmsGroupDetailsId,
            name: groupDetails.name,
            status: groupDetails.status || 'inActive',  // Default to "inActive" if no status is provided
            userGroupMappings: formattedUserGroupMappings
        };

        // Send the response
        return res.status(200).json({
            message: "Group details fetched successfully",
            data: responseData
        });

    } catch (error) {
        console.error("Error fetching group details:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the group details",
            error: error.message
        });
    }
};


export const groupDetailsController = async (req, res) => {
  try {
      const { dmsGroupDetailsId, name, effectiveDate, dmsUserGroupMappings } = req.body;

      // Validate required fields
      if (!dmsGroupDetailsId || !name || !effectiveDate || !dmsUserGroupMappings) {
          return res.status(400).json({
              message: "Missing required fields (dmsGroupDetailsId, name, effectiveDate, dmsUserGroupMappings)"
          });
      }

      // Ensure dmsUserGroupMappings is an array
      if (!Array.isArray(dmsUserGroupMappings)) {
          return res.status(400).json({
              message: "dmsUserGroupMappings should be an array"
          });
      }

      // Validate dmsUserGroupMappings array
      if (dmsUserGroupMappings.length === 0) {
          return res.status(400).json({
              message: "dmsUserGroupMappings array cannot be empty"
          });
      }

      // Create a new DmsGroupDetails instance
      const newGroupDetails = new DmsGroupDetails({
          dmsGroupDetailsId,
          name,
          effectiveDate,  // Assuming the date format is valid
          dmsUserGroupMappings
      });

      // Save the new group details to the database
      const savedGroupDetails = await newGroupDetails.save();

      // Remove _id and __v from the response
      const responseData = savedGroupDetails.toObject();
      delete responseData._id;
      delete responseData.__v;

      // Ensure dmsUserGroupMappings is defined and is an array
      if (Array.isArray(responseData.dmsUserGroupMappings)) {
          responseData.dmsUserGroupMappings.forEach(mapping => {
              delete mapping._id;  // Remove the _id from the user group mappings
          });
      }

      // Return the saved group details without _id and __v
      return res.status(201).json({
          message: "Group details created successfully",
          data: responseData
      });

  } catch (error) {
      console.error("Error creating group details:", error);
      return res.status(500).json({
          message: "An error occurred while creating the group details",
          error: error.message
      });
  }
};

//   export const groupDetailsController = async (req, res) => {
//     try {
//         // Destructure incoming request body
//         const { dmsGroupDetailsId, name, effectiveDate, dmsUserGroupMappings } = req.body;

//         // Validate required fields
//         if (!dmsGroupDetailsId || !name || !effectiveDate || !dmsUserGroupMappings) {
//             return res.status(400).json({
//                 message: "Missing required fields (dmsGroupDetailsId, name, effectiveDate, dmsUserGroupMappings)"
//             });
//         }

//         // Ensure effectiveDate is in a valid Date format
//         const effectiveDateObject = new Date(effectiveDate);
//         if (isNaN(effectiveDateObject.getTime())) {
//             return res.status(400).json({
//                 message: "Invalid date format for effectiveDate"
//             });
//         }

//         // Validate dmsUserGroupMappings array
//         if (!Array.isArray(dmsUserGroupMappings) || dmsUserGroupMappings.length === 0) {
//             return res.status(400).json({
//                 message: "dmsUserGroupMappings must be a non-empty array"
//             });
//         }

//         // Ensure each mapping in dmsUserGroupMappings has the required fields
//         for (let mapping of dmsUserGroupMappings) {
//             if (!mapping.dmsUserGroupMappingId || !mapping.dmsGroupDetailsId || !mapping.personNumber) {
//                 return res.status(400).json({
//                     message: "Each dmsUserGroupMapping must have dmsUserGroupMappingId, dmsGroupDetailsId, and personNumber"
//                 });
//             }
//         }

//         // Create a new DmsGroupDetails instance
//         const newGroupDetails = new DmsGroupDetails({
//             dmsGroupDetailsId,
//             name,
//             effectiveDate: effectiveDateObject,  // Convert to Date object
//             dmsUserGroupMappings
//         });

//         // Save the new group details to the database
//         const savedGroupDetails = await newGroupDetails.save();

//         // Remove _id and __v from the response
//         const responseData = savedGroupDetails.toObject();
//         delete responseData._id;
//         delete responseData.__v;

//         // Remove _id from each user mapping in dmsUserGroupMappings
//         responseData.dmsUserGroupMappings.forEach(mapping => {
//             delete mapping._id;
//         });

//         // Return the saved group details without _id and __v
//         return res.status(201).json({
//             message: "Group details created successfully",
//             data: responseData
//         });
//     } catch (error) {
//         // Handle any errors
//         console.error("Error creating group details:", error);
//         return res.status(500).json({
//             message: "An error occurred while creating the group details",
//             error: error.message
//         });
//     }
// };

  export const postController = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, effectiveDate, userGroupMappings } = req.body;

        // Ensure that all required fields are provided
        if (!name || !effectiveDate || !userGroupMappings || userGroupMappings.length === 0) {
            return res.status(400).json({
                message: "Missing required fields or empty userGroupMappings array"
            });
        }

        // Create a new entity document
        const newEntity = new Entity({
            name,
            effectiveDate: new Date(effectiveDate),  // Ensure the effectiveDate is a Date object
            userGroupMappings
        });

        // Save the document to the database
        const savedEntity = await newEntity.save();

        // Remove the _id and __v from the saved entity before sending it to the client
        const entityResponse = savedEntity.toObject(); // Convert Mongoose document to plain object
        delete entityResponse._id; // Remove _id from the response
        delete entityResponse.__v; // Remove __v from the response

        // Also, remove _id from userGroupMappings array
        entityResponse.userGroupMappings.forEach(mapping => {
            delete mapping._id; // Remove _id from each mapping in the userGroupMappings array
        });

        // Return a success response with the modified entity data
        return res.status(201).json({
            message: "Entity created successfully",
            data: entityResponse
        });
    } catch (error) {
        // Handle any errors that occur during the operation
        console.error("Error creating entity:", error);
        return res.status(500).json({
            message: "An error occurred while creating the entity",
            error: error.message
        });
    }
};
export const groupController=async(req,res)=>{
    try {
        const groups = await Group.find().select('-_id -__v'); // Find all groups in the database
        res.json(groups); // Respond with the groups
      } catch (err) {
        res.status(500).json({ message: 'Error retrieving groups', error: err });
      }
}

export const deleteGroupController=async(req,res)=>{
    console.log()
    try {
        const groupId = req.params.id;  // Extract the ID from the URL
        
        // Find and delete the group by ID
        const deletedGroup = await Group.findByIdAndDelete(groupId);
            
        if (!deletedGroup) {
          return res.status(404).json({ message: 'Group not found' }); // If no group was found
        }
    
        res.json({ message: 'Group deleted successfully', deletedGroup });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting the group', error: err });
      }
}

