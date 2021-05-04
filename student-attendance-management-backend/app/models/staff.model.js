const mongoose = require("mongoose");

const Staff = mongoose.model(
    "Staff",
    new mongoose.Schema({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
        experience: { type: Number, required: true },
        qualification: { type: String, required: true },
        dateofbirth: { type: Date, required: true },
        joiningdate: { type: Date, required: true },
        mobile: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true },
        gender: { type: String, required: true },
        division: { type: String, required: true },
        standard: { type: Number, required: true },
        createddate: { type: Date, required: true },
        updateddate: { type: Date, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Staff;