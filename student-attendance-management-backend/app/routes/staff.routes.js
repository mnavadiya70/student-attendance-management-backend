const { authJwt } = require("../middlewares");
const controller = require("../controllers/staff.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/add",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createStaffMember
    );

    app.get(
        "/api/staff",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getStaffMember
    );

    app.delete(
        "/api/staff/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteStaffMember
    );

    app.get(
        "/api/students",
        [authJwt.verifyToken, authJwt.isStaff],
        controller.getStudents
    );
};