import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notificationid: { type: Number, required: true },
    submittedbypersonno: { type: String, required: true },
    submittedbypersonname: { type: String, required: true },
    message: { type: String, default: null },
    submittedtopersonno: { type: String, required: true },
    submittedtopersonname: { type: String, required: true },
    submittedondate: { type: Date, default: null },
    status: { type: String, required: true },
    modulename: { type: String, required: true },
    moduleid: { type: Number, required: true },
    requestid: { type: Number, required: true },
    approvallevel: { type: Number, required: true },
    nextapproalpersonno: { type: String, default: null },
    nextapproalpersonid: { type: String, default: null },
    approvalStatus: { type: String, required: true },
    leaveStatus: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  });
  

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
