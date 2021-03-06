const userScript = require("./user-startscript.js");
const courseScript = require("./course-startscript.js");
const roleScript = require("./role-startscript.js");
const invitationScript = require("./invitation-startscript.js")
const leaderboardScript = require("./leaderboard-startscript.js")
const rankingScript = require("./ranking-startscript.js");
const rankingSectionScript = require("./ranking-section-startscript.js");
const rankingSectionEntryScript = require("./ranking-section-entry-startscript.js");

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function () {
    var courseList = courseScript.startScript();
    var userList = userScript.startScript();
    var roleList = roleScript.startScript();
    var invitationList = invitationScript.startScript();
    var leaderboardList = leaderboardScript.startScript();
    var rankingList = rankingScript.startScript();
    var rankingSectionList = rankingSectionScript.startScript();
    var rankingSectionEntryList = rankingSectionEntryScript.startScript();

    for (var key in courseList) {
        var course = courseList[key];
        Models.Courses.create(course);
    }

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };

    for (var key in roleList){
        var role = roleList[key];
        Models.Roles.create(role);     
    };

    for (var key in invitationList){
        var invitation = invitationList[key];
        Models.Invitations.create(invitation);     
    };

    for (var key in leaderboardList){
        var leaderboard = leaderboardList[key];
        Models.Leaderboards.create(leaderboard);     
    };

    for (var key in rankingList) {
        var ranking = rankingList[key];
        Models.Rankings.insertRanking(ranking.leaderboard_id, ranking.user_id, ranking.mark, ranking.note, Models);
    };

    for (var key in rankingSectionList) {
        var rankingSection = rankingSectionList[key];
        Models.RankingSections.create(rankingSection);
    };

    for (var key in rankingSectionEntryList) {
        var rankingSectionEntry = rankingSectionEntryList[key];
        Models.RankingSectionEntries.create(rankingSectionEntry);
    };
}