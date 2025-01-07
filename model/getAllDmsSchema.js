import mongoose from "mongoose";
const recordSchema = new mongoose.Schema({
    dmsUserGroupMappingId: { type: Number, required: false },
    personNumber: { type: String, required: true },
    personName: { type: String, required: true },
    createdBy: { type: String, required: true },
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the model
const AllUser = mongoose.model('AllUser', recordSchema);
export default AllUser