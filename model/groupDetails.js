import mongoose from 'mongoose';

const dmsGroupDetailsSchema = new mongoose.Schema({
    dmsGroupDetailsId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'inActive'  // Default to 'inActive'
    }
});

const DmsGroupDetails = mongoose.model('DmsGroupDetails', dmsGroupDetailsSchema);

export default DmsGroupDetails;
