import mongoose from 'mongoose';

const userGroupMappingSchema = mongoose.Schema({
  personNumber: {
    type: String,
    required: true
  }
});

const entitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  userGroupMappings: [userGroupMappingSchema]
});

const Entity = mongoose.model('Entity', entitySchema);

export default Entity;
