const Responses = require("../res/response");
const InvitationsController = require("../controllers/invitations-controller");

module.exports = function(app) {
    app.get("/course/:course_id/invitations", InvitationsController.getAllLinksForCourse);
}