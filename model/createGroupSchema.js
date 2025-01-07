import mongoose from 'mongoose';

const userGroupMappingSchema = mongoose.Schema({
    personNumber: {
        type: String,
        required: true,
    },
}, { _id: false }); // Prevents automatic creation of _id for subdocuments

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userGroupMappings: {
        type: [userGroupMappingSchema],
        required: true,
    },
});

const DmsGroup = mongoose.model('DmsGroup', groupSchema);

export default DmsGroup;
