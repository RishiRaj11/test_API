import mongoose from 'mongoose';

const docSchema = mongoose.Schema({
    serialNumber: {
        type: String,  // Assuming serial number is a string, but it could be a number as well
        required: true
    },
    docId: {
        type: String,  // Assuming docId is a string, change the type if necessary
        required: true
    },
    docName: {
        type: String,  // Assuming docName is a string
        required: true
    },
    assignedBy: {
        type: String,  // Assuming assignedBy is a string, could be a user ID or name
        required: true
    },
    submissionDate: {
        type: Date,  // Date type to store submission date
        required: true
    }
});

const Document = mongoose.model('Document', docSchema);

export default Document;
