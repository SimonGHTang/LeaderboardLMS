const AuthenticationService = require("../middleware/authentication-service");
const RankingSectionsController = require("../controllers/ranking-sections-controller");

module.exports = function(app) {
    app.put("/course/:course_id/leaderboard/:leaderboard_id/rankingSection", AuthenticationService.isAdminForCourse, RankingSectionsController.insertRankingSection);

    app.post("/course/:course_id/leaderboard/rankingSection/:ranking_section_id", AuthenticationService.isAdminForCourse, RankingSectionsController.editRankingSection);

    app.delete("/course/:course_id/leaderboard/rankingSection/:ranking_section_id", AuthenticationService.isAdminForCourse, RankingSectionsController.deleteRankingSection);
}