const { authJwt } = require("../middlewares");
const controller = require("../controllers/division.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/division", [authJwt.verifyToken, authJwt.isAdmin], controller.createDivision);
    app.get("/api/division", [authJwt.verifyToken, authJwt.isAdmin], controller.getDivisions);
    app.get("/api/unassigned-divisions", [authJwt.verifyToken, authJwt.isAdmin], controller.getUnassignedDivisions);
    app.delete("/api/division/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteDivision);
    app.get("/api/division/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.getDivision);
    app.put("/api/division/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateDivision);
};