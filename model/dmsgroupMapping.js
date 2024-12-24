import mongoose from 'mongoose';

const dmsUserGroupMappingSchema = new mongoose.Schema({
    dmsUserGroupMappingId: {
        type: Number,
        required: true,
        unique: true
    },
    dmsGroupDetailsId: {
        type: Number,
        required: true
    },
    personNumber: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'inActive'  // Default to 'inActive'
    }
});

const DmsUserGroupMapping = mongoose.model('DmsUserGroupMapping', dmsUserGroupMappingSchema);

export default DmsUserGroupMapping;
