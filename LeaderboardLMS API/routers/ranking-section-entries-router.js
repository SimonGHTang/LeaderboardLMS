const AuthenticationService = require("../middleware/authentication-service");
const RankingSectionEntriesController = require("../controllers/ranking-section-entries-controller");

module.exports = function(app) {
    app.put("/course/:course_id/ranking/:ranking_id/rankingSectionEntry", AuthenticationService.isAdminForCourse, RankingSectionEntriesController.insertRankingSectionEntry);

    app.post("/course/:course_id/ranking/rankingSectionEntry/:ranking_section_entry_id", AuthenticationService.isAdminForCourse, RankingSectionEntriesController.editRankingSectionEntry);

    app.delete("/course/:course_id/ranking/rankingSectionEntry/:ranking_section_entry_id", AuthenticationService.isAdminForCourse, RankingSectionEntriesController.deleteRankingSectionEntry);
}