import DmsGroup from "../model/createGroupSchema.js";

export const createGroupController = async (req, res) => {
    const { name, userGroupMappings } = req.body;

    try {
        // Check if a group with the same name already exists
        const existingGroup = await DmsGroup.findOne({ name });

        if (existingGroup) {
            return res.status(400).json({ message: `Group with name ${name} already exists.` });
        }

        // Create and save the new group
        const group = new DmsGroup({ name, userGroupMappings });
        const savedGroup = await group.save();

        // Convert the savedGroup to a plain object and remove `_id` and `__v`
        const result = savedGroup.toObject();
        delete result._id;
        delete result.__v;

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
