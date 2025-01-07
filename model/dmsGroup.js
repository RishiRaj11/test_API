import mongoose from 'mongoose';
import userGroupMappingSchema from './userGroupMapping.js';  // Import the embedded schema

// Define the schema for DmsGroup
const dmsGroupSchema = new mongoose.Schema({
    dmsGroupDetailsId: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    // Embedding the UserGroupMapping schema directly here as an array of subdocuments
    userGroupMappings: [userGroupMappingSchema], // Embedding the entire schema directly
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the model for DmsMappingGroup
const DmsMappingGroup = mongoose.model('DmsMappingGroup', dmsGroupSchema);

export default DmsMappingGroup;
