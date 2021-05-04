const config = require("../config/auth.config");
const models = require("../models");
const Student = models.student;
const User = models.user;
const Role = models.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createStudent = (req, res) => {
    let user = new User({
        username: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    Role.findOne({ name: "student" }, (err, role) => {
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
                const student = new Student({
                    rollno: req.body.rollno,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    dateofbirth: req.body.dateofbirth,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    city: req.body.city,
                    pincode:  req.body.pincode,
                    gender: req.body.gender,
                    createddate: req.body.createddate,
                    updateddate: req.body.updateddate,
                    division: req.body.division,
                    standard: req.body.standard,
                    userId: user._id
                });

                student.save(err => {
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

                    res.send({ message: "User and student created successfully!" });
                });
            }
        });
    });
};

exports.getStudents = (req, res) => {
    Student.find((error, members) => {
        if (error) {
            res.send({ message: error })
            return;
        }
        res.status(200).send(members);
    })
}

exports.deleteStudent = (req, res) => {
    let id = req.params.id
    Student.findByIdAndRemove(id, (error, student) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        if (student) {
            User.findByIdAndRemove(student.userId, (error, student) => {
                if (error) {
                    res.status(500).send({ message: error })
                    return;
                }
            })
        }
        res.status(200).send({ message: "Student deleted successfully" });
    })
}