const { authJwt } = require("../middlewares")
const controller = require("../controllers/leave.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/leave-request', [authJwt.verifyToken, authJwt.isStudent], controller.addLeave)
    app.get('/api/leave-request', [authJwt.verifyToken, authJwt.isStudent], controller.getLeaves)
    app.get('/api/all-leave', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllLeaves)
    app.get('/api/approval-leave-request', [authJwt.verifyToken, authJwt.isStaff], controller.getApprovalLeaves)
    app.put('/api/approval-leave-request/:id', [authJwt.verifyToken, authJwt.isStaff], controller.updateLeaveByApprover)
    app.put('/api/cancel-leave-request/:id', [authJwt.verifyToken, authJwt.isStudent], controller.cancelLeave)
}