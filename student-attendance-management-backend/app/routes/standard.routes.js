const { authJwt } = require("../middlewares");
const controller = require("../controllers/standard.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/standard", [authJwt.verifyToken, authJwt.isAdmin], controller.createStandard);
    app.get("/api/standard", [authJwt.verifyToken, authJwt.isAdmin], controller.getStandards);
    app.delete("/api/standard/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteStandard);
};