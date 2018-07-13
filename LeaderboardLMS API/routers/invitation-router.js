const InvitationController = require("../controllers/invitation-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.put("/course/:course_id/invitation", AuthenticationService.isAdminForCourse, InvitationController.insertInvitation);
    app.delete("/course/:course_id/invitation/:invitation_id", AuthenticationService.isAdminForCourse, InvitationController.deleteInvitation);
}