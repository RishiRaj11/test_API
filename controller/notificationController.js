import Notification from "../model/notificationSchema.js";

export const notificationController = async (req, res) => {
    try {
        // Extract path parameters from the request
        const { startDate, endDate, status, submittedtopersonno } = req.params;

        // Initialize the query object
        let query = {};

        // Handle startDate and endDate
        if (startDate && endDate) {
            // Parse the startDate and endDate from the URL params
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);

            // Check if the dates are valid
            if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            // Add the date filters to the query
            query.startDate = { $gte: parsedStartDate };
            query.endDate = { $lte: parsedEndDate };
        }

        // Handle status
        if (status) {
            query.status = status;
        }

        // Handle submittedbypersonno
        if (submittedtopersonno) {
            query.submittedtopersonno = submittedtopersonno;
        }

        // Fetch notifications from the database
        const notifications = await Notification.find(query).select('-_id -__v');

        // Return the notifications in the response
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
