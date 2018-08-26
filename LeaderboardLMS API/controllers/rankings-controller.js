const Models = require("../models");
const Responses = require ("../res/response");

exports.getRanking = function(req, res) {
    const course_id = req.params.course_id;
    const ranking_id = parseInt(req.params.ranking_id, 10);

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); return; }

    Models.Rankings.getRankingIncludingAnonymitySetting(ranking_id, Models).then(async function(ranking) {

        var user = await Models.Users.getUserIncludingCourseAndRole(req.user.id, course_id, Models);
        if(user.Courses[0].Roles.rank !== "admin") {
            if(ranking.AnonymitySettings.revealLeaderName === false) {
                ranking.User.email = "Anonymous",
                ranking.User.username = "Anonymous"
            }

            if(ranking.AnonymitySetting.revealRankingSections === false) {
                rankin.RankingSectionEntries = [];
                ranking.dataValues.RankingSectionEntries = [];
            }
        }

        if(!ranking) {
            Responses.fail(res, "No such ranking here", null); 
        } else {
            Responses.success(res, "Ranking found", ranking);
        }
    });
};

exports.editRanking = function (req, res) {
    const ranking_id = req.params.ranking_id;
    const mark = req.body.mark;
    const note = req.body.note;

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); return; }

    Models.Rankings.editRanking(ranking_id, mark, note).then(function(ranking) {
        if(!ranking) {
            Responses.fail(res, "Cannot update ranking at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking updated", ranking);
        }
    });
};

exports.insertRanking = async function (req, res) {
    const course_id = req.params.course_id;
    const leaderboard_id = req.params.leaderboard_id;
    const email = req. body.email;
    const user_id = req.body.user_id;
    const note = req.body.note;
    const mark = req.body.mark;

    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); return; }
    if(!email) { Responses.error(res, "Email can not be blank", null); return; }
    if(!mark) { Responses.error(res, "Mark cannot be empty", null); return; }

    var user = await Models.Users.getUserIncludingCourseAndRole(user_id, course_id, Models);
    if(!user){ Responses.fail(res, "This user's email does not exist", null); return; }
    if(!user.Roles){ Responses.fail(res, "This user is not registered to your course", null); return; }

    Models.Rankings.insertRanking(leaderboard_id, user_id, mark, note, Models).then(function(ranking) {
        if(!ranking) {
            Responses.fail(res, "Cannot create new ranking at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking created", ranking);
        }
    });
};

exports.deleteRanking = function (req, res) {
    const ranking_id = req.params.ranking_id;

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); return; }

    Models.Rankings.deleteRanking(ranking_id, Models).then(function(ranking) {
        if(!ranking) {
            Responses.fail(res, "Cannot delete ranking at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking deleted", ranking);
        }
    });
};