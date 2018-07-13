const Responses = require("../res/response");
const InvitationsController = require("../controllers/invitations-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.get("/course/:course_id/invitations", AuthenticationService.isStudentOrAdminForCourse, InvitationsController.getAllLinksForCourse);
}