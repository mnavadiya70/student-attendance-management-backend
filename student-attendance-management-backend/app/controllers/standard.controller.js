const models = require("../models");
const Standard = models.standard;

var jwt = require("jsonwebtoken");

exports.createStandard = (req, res) => {
    let std = new Standard({
        standard: req.body.standard,
        createddate: req.body.createddate,
        updateddate: req.body.updateddate
    });

    std.save((err, std) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Standard created successfully!" });
    });
};

exports.getStandards = (req, res) => {
    Standard.find((error, stds) => {
        if (error) {
            res.send({ message: "Error while getting standards" })
            return;
        }
        res.status(200).send(stds);
    })
}

exports.deleteStandard = (req, res) => {
    let id = req.params.id
    Standard.findByIdAndRemove(id, (error, std) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        res.status(200).send({ message: "Standard deleted successfully" });
    })
}