module.exports.startScript = function() {
    var leaderboardList = {};

    leaderboardList.leaderboard001 = {
        name: "Assignment 1 | Leaderboard",
        blurb: "First assignment leaderboard",
        course_id: 1,
        weighting: 10
    };

    leaderboardList.leaderboard002 = {
        name: "Week 3 | Tutorials - Leaderboard",
        blurb: "Leaderboard for week 3's tutorial material",
        course_id: 1,
        weighting: 1
    };

    return leaderboardList;
}