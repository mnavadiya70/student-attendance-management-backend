const config = require("../config/auth.config");
const models = require("../models");
const Staff = models.staff;
const User = models.user;
const Role = models.role;
const Division = models.division;
const Student = models.student;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createStaffMember = (req, res) => {
    let user = new User({
        username: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    Role.findOne({ name: "staff" }, (err, role) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        user.roles = [role._id];
        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                const staff = new Staff({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    experience: req.body.experience,
                    qualification: req.body.qualification,
                    dateofbirth: req.body.dateofbirth,
                    joiningdate: req.body.joiningdate,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    city: req.body.city,
                    pincode: req.body.pincode,
                    gender: req.body.gender,
                    createddate: req.body.createddate,
                    updateddate: req.body.updateddate,
                    standard: req.body.standard,
                    division: req.body.division,
                    userId: user._id
                });

                staff.save(err => {
                    if (err) {
                        User.findByIdAndRemove(user._id, (error, user) => {
                            if (error) {
                                res.status(500).send({ message: err });
                                return;
                            }
                        })
                        res.status(500).send({ message: err });
                        return;
                    }

                    Division.findOne({ division: req.body.division, standard: req.body.standard },
                        (error, division) => {
                            if (error) {
                                console.log("Error while getting div");
                            }
                            if (division) {
                                Division.findByIdAndUpdate(division.id,
                                    {
                                        $set: {
                                            assigned: req.body.assigned,
                                        }
                                    },
                                    {
                                        new: true
                                    },
                                    (error, div) => {
                                        if (error) {
                                            console.log("Error while updating div");
                                        }
                                        if (div) {
                                            res.send({ message: "User and staff member created successfully!" });
                                        }
                                    });
                            }
                        });

                });
            }
        });
    });
};

exports.getStaffMember = (req, res) => {
    Staff.find((error, members) => {
        if (error) {
            res.send({ message: "Error while getting staff members" })
            return;
        }
        res.status(200).send(members);
    })
}

exports.deleteStaffMember = (req, res) => {
    let id = req.params.id
    Staff.findByIdAndRemove(id, (error, member) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        if (member) {
            User.findByIdAndRemove(member.userId, (error, user) => {
                if (error) {
                    res.status(500).send({ message: error })
                    return;
                }
                Division.findOne({ division: member.division, standard: member.standard },
                    (error, division) => {
                        if (error) {
                            console.log("Error while getting div");
                        }
                        if (division) {
                            Division.findByIdAndUpdate(division.id,
                                {
                                    $set: {
                                        assigned: false,
                                    }
                                },
                                {
                                    new: true
                                },
                                (error, div) => {
                                    if (error) {
                                        console.log("Error while updating div");
                                    }
                                    if (div) {
                                        res.status(200).send({ message: "Staff member deleted successfully" });
                                    }
                                });
                        }
                    });
            })
        }

    })
}

exports.getStudents = (req, res) => {
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Staff.findOne({ userId: decoded.id }, (error, staff) => {
            if (error) {
                res.send({ message: "Error while getting staff member" })
                return;
            }
            if (staff) {
                Student.find(
                    {
                        standard: staff.standard,
                        division: staff.division
                    }, (error, students) => {
                        if (error) {
                            res.send({ message: "Error while getting students" })
                            return;
                        }
                        res.status(200).send(students);
                    })
            }
        })
    });
}