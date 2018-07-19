const AuthenticationService = require("../middleware/authentication-service");
const RankingsController = require("../controllers/rankings-controller");

module.exports = function(app) {
    app.put("/course/:course_id/leaderboard/:leaderboard_id/ranking", AuthenticationService.isAdminForCourse, RankingsController.insertRanking);

    app.post("/course/:course_id/leaderboard/ranking/:ranking_id", AuthenticationService.isAdminForCourse, RankingsController.editRanking);

    // app.delete("/course/:course_id/leaderboard/ranking/:ranking_id", AuthenticationService.isAdminForCourse, RankingsController.deleteRanking);
}