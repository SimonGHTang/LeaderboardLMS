const AuthentiationService = require("../middleware/authentication-service");
const AnonymityController = require("../controllers/anonymity-settings-controller");

module.exports = function(app) {
    app.get("/course/:course_id/ranking/:ranking_id/anonymitysetting", AuthentiationService.isStudentOrAdminForCourse, AnonymityController.getAnonymitySetting);

    app.post("/course/:course_id/ranking/:ranking_id/anonymitysetting", AuthentiationService.isCurrentUser, AnonymityController.editAnonymitySetting);
}