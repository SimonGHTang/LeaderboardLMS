const InvitationController = require("../controllers/invitation-controller");

module.exports = function(app) {
    app.put("/course/:course_id/invitation", InvitationController.insertInvitation);
    app.delete("/course/:course_id/invitation/:invitation_id", InvitationController.deleteInvitation);
}