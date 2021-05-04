const mongoose = require("mongoose");

const Standard = mongoose.model(
    "Standard",
    new mongoose.Schema({
        standard: { type: Number, required: true },
        createddate: { type: Date, required: true },
        updateddate: { type: Date, required: true }
    })
);

module.exports = Standard;