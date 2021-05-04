const mongoose = require("mongoose")

const Leave = mongoose.model(
    "Leave",
    new mongoose.Schema({
        name: { type: String, required: true },
        standard: { type: Number, required: true },
        division: { type: String, required: true },
        rollno: { type: Number, required: true },
        reason: { type: String, required: true },
        leavestartdate: { type: Date, required: true },
        leaveenddate: { type: Date, required: true },
        status: { type: String },
        duration: { type: Number, required: true },
        approvermessage: { type: String },
        approveddate: { type: Date },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        requesteddate: { type: Date, required: true },
        createddate: { type: Date, required: true },
        updateddate: { type: Date, required: true },
    })
);

module.exports = Leave;