const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.staff = require("./staff.model");
db.division = require("./division.model");
db.standard = require("./standard.model");
db.student = require("./student.model");
db.attendance = require("./attendance.model");
db.leave = require("./leave.model");

db.ROLES = ["admin", "staff", "student"];

module.exports = db;