const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const models = require("../models")
const Leave = models.leave
const Staff = models.staff
const Student = models.student

exports.addLeave = (req, res) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        Student.findOne({ userId: decoded.id }, (error, student) => {
            if (error) {
                return res.status(500).send({ message: error })
            }

            const leave = new Leave({
                name: student.firstname + " " + student.lastname,
                standard: student.standard,
                division: student.division,
                rollno: student.rollno,
                reason: req.body.reason,
                leavestartdate: req.body.leavestartdate,
                leaveenddate: req.body.leaveenddate,
                status: req.body.status,
                duration: req.body.duration,
                requesteddate: req.body.requesteddate,
                studentId: student._id,
                createddate: req.body.createddate,
                updateddate: req.body.updateddate,
            })

            leave.save((error, data) => {
                if (error) {
                    return res.status(500).send({ message: error })
                }
                res.status(200).send({ message: "Leave request added successfully." })
            })
        })
    })
}

exports.getLeaves = (req, res) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        Student.findOne({ userId: decoded.id }, (error, student) => {
            if (error) {
                return res.status(500).send({ message: error })
            }

            Leave.find({ studentId: student._id }, (error, data) => {
                if (error) {
                    return res.status(500).send({ message: error })
                }
                res.status(200).send(data)
            })
        })
    })
}

exports.getAllLeaves = (req, res) => {
    Leave.find((error, leaves) => {
        if (error) {
            res.status(500).send({ message: error })
            return;
        }
        res.status(200).send(leaves)
    })
}

exports.getApprovalLeaves = (req, res) => {
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Staff.findOne({ userId: decoded.id }, (error, staff) => {
            if (error) {
                res.send({ message: "Error while getting staff member" })
                return;
            }
            if (staff) {
                Leave.find(
                    {
                        standard: staff.standard,
                        division: staff.division,
                        status: "Pending"
                    }, (error, leaves) => {
                        if (error) {
                            res.send({ message: "Error while getting leaves" })
                            return;
                        }
                        res.status(200).send(leaves);
                    })
            }
        })
    });
}

exports.updateLeaveByApprover = (req, res) => {
    const leaveId = req.params.id
    Leave.findByIdAndUpdate(leaveId,
        {
            $set: {
                status: req.body.status,
                approvermessage: req.body.message,
                approveddate: req.body.approvedDate,
                updateddate: req.body.updateddate
            }
        },
        {
            new: true
        },
        (error, leave) => {
            if (error) {
                console.log("Error while updating leave");
            }
            if (leave) {
                res.status(200).send({ message: "Leave updated successfully" });
            }
        });
}

exports.cancelLeave = (req, res) => {
    const leaveId = req.params.id
    Leave.findByIdAndUpdate(leaveId,
        {
            $set: {
                status: req.body.status,
                updateddate: req.body.updateddate
            }
        },
        {
            new: true
        },
        (error, leave) => {
            if (error) {
                console.log("Error while updating leave");
            }
            if (leave) {
                res.status(200).send({ message: "Leave updated successfully" });
            }
        });
}