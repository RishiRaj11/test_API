import mongoose from "mongoose";

const userGroupMappingSchema = new mongoose.Schema({
    dmsUserGroupMappingId: { type: Number, required: true },
    personNumber: { type: String, required: true },
    userName: { type: String, default: null },
    status: { type: String, default: null },
}, { _id: false }); // _id is disabled for this embedded schema

// Exporting the schema rather than a model as we're embedding it
export default userGroupMappingSchema;
