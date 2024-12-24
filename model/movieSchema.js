import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    dmsUserGroupMappingId: {
        type: Number,
        required: true
    },
    personNumber: {
        type: String,
        required: true
    }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
