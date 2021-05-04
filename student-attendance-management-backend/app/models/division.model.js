const mongoose = require("mongoose");

const Division = mongoose.model(
    "Division",
    new mongoose.Schema({
        division: { type: String, required: true },
        standard: { type: Number, required: true },
        seat: { type: Number, required: true },
        assigned: { type: Boolean },
        createddate: { type: Date },
        updateddate: { type: Date }
    })
);

module.exports = Division;