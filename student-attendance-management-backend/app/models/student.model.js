const mongoose = require("mongoose");

const Student = mongoose.model(
    "Student",
    new mongoose.Schema({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
        rollno: { type: Number, required: true },
        dateofbirth: { type: Date, required: true },
        mobile: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true },
        gender: { type: String, required: true },
        createddate: { type: Date, required: true },
        updateddate: { type: Date, required: true },
        division: {type: String, required: true},
        standard: {type: Number, required: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Student;