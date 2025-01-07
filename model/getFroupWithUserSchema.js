// models/UserGroupMapping.js

import mongoose from 'mongoose';

const userGroupMappingSchema = new mongoose.Schema({
    dmsUserGroupMappingId: { type: Number, default: null },
    personNumber: { type: String, required: true },
    personName: { type: String, required: true },
    createdBy: { type: String, required: true },
}, { timestamps: true });

const UserGroupUserMapping= mongoose.model('UserGroupUserMapping', userGroupMappingSchema);

export default UserGroupUserMapping;
