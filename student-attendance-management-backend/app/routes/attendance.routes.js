const { authJwt } = require("../middlewares");
const controller = require("../controllers/attendance.controller")

module.exports = function(app){
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/mark-attendance', authJwt.isStaff, controller.saveAttendance);
    app.get('/api/attendance-report', controller.getAttendance);
}