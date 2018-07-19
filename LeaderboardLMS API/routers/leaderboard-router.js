const LeaderboardController = require("../controllers/leaderboard-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.get("/course/:course_id/leaderboard/:leaderboard_id", AuthenticationService.isStudentOrAdminForCourse, LeaderboardController.getLeaderboard);
    
    app.put("/course/:course_id/leaderboard", AuthenticationService.isAdminForCourse, LeaderboardController.insertLeaderboard)

    app.post("/course/:course_id/leaderboard/:leaderboard_id", AuthenticationService.isAdminForCourse, LeaderboardController.editLeaderboard)
}
