const { authJwt } = require("../middlewares");
const controller = require("../controllers/student.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/student", [authJwt.verifyToken, authJwt.isAdmin], controller.createStudent);
    app.get("/api/student", [authJwt.verifyToken, authJwt.isAdmin], controller.getStudents);
    app.delete("/api/student/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteStudent);
};