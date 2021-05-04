var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const models = require("../models/index");
const Attendance = models.attendance;
const Student = models.student;

exports.saveAttendance = (req, res) => {
    const data = req.body;

    Attendance.insertMany(data, (error, attendances) => {
        if (error) {
            res.status(500).send({ message: error })
        }
        res.status(200).send({ message: "Attendances added successfully." })
    })
}

exports.getAttendance = (req, res) => {
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Student.findOne({ userId: decoded.id }, (error, student) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }
            Attendance.find({ studentId: student._id }).populate("studentId", "-__v")
                .exec((err, reports) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send(reports);
                });
        })

        // Attendance.find({ studentId: decoded.id }, (error, user) => {
        //     if (error) {
        //         res.status(500).send({ message: error });
        //         return;
        //     }

        //     res.status(200).send(user);
        // })
    });
}