const models = require("../models");
const Division = models.division;

var jwt = require("jsonwebtoken");

exports.createDivision = (req, res) => {
    let div = new Division({
        division: req.body.division,
        standard: req.body.standard,
        seat: req.body.seat,
        assigned: req.body.assigned,
        createddate: req.body.createddate,
        updateddate: req.body.updateddate
    });

    div.save((err, div) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Division created successfully!" });
    });
};

exports.getDivisions = (req, res) => {
    Division.find((error, divs) => {
        if (error) {
            res.send({ message: "Error while getting divisions" })
            return;
        }
        res.status(200).send(divs);
    })
}

exports.getUnassignedDivisions = (req, res) => {
    Division.find({
        assigned: false
    }, (error, divs) => {
        if (error) {
            res.send({ message: "Error while getting divisions" })
            return;
        }
        res.status(200).send(divs);
    })
}

exports.deleteDivision = (req, res) => {
    let id = req.params.id
    Division.findByIdAndRemove(id, (error, div) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        res.status(200).send({ message: "Division deleted successfully" });
    })
}

exports.getDivision = (req, res) => {
    let id = req.params.id
    Division.findById(id, (error, div) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        res.status(200).send(div);
    })
}

exports.updateDivision = (req, res) => {
    Division.findByIdAndUpdate(req.params.id,
        {
            $set: {
                division: req.body.division,
                standard: req.body.standard,
                seat: req.body.seat,
                updateddate: req.body.updateddate
            }
        },
        {
            new: true
        },
        (err, div) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "Division updated successfully!" });
        });
};