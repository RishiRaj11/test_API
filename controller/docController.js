import Document from "../model/documentSchema.js";
export const getAllDocumentsRecords = async (req, res) => {
    try {
        const documents = await Document.find().select('-_id -__v');  // Retrieve all documents
        res.status(200).json(
    
            documents
        );
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching documents',
            error: error.message
        });
    }
};