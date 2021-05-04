const mongoose = require("mongoose");

const Attendance = mongoose.model(
    "Attendance",
    new mongoose.Schema({
        division: { type: String, required: true },
        standard: { type: Number, required: true },
        rollno: { type: Number, required: true },
        name: { type: String, required: true },
        status: { type: String, required: true },
        staffname: { type: String, required: true },
        date: { type: Date, required: true },
        createddate: { type: Date, required: true },
        updateddate: { type: Date, required: true },
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff"
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    })
);

module.exports = Attendance;