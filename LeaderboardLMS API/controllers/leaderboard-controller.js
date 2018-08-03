const Models = require("../models");
const Responses = require("../res/response");

exports.getLeaderboard = function(req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);

    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); return; }

    Models.Leaderboards.getLeaderboardIncludingRankings(leaderboard_id, Models).then(async function(leaderboard) {

        for (var key in leaderboard.Rankings){
            var r = leaderboard.Rankings[key];

            var user = await Models.Users.getUserIncludingCourseAndRole(req.user.id, course_id, Models);
            if(user.Courses[0].Roles.rank === "admin") {
                break;
            }

            if(req.user.id === r.User.user_id){
                break;
            }

            if(r.AnonymitySetting.revealLeaderboardName === false && req.user.email !== r.User.email) {
                r.User.id = 0;
                r.User.dataValues.id = 0;
                r.User.email = "Anonymous";
                r.User.username = "Anonymous";
                r.User.profilePictureLink = "https://www.uts.edu.au/sites/default/files/styles/wysiwyg_generic_large_x1/public/2018-01/sci-advanced-tissue-unknown-female.jpg";
            }

            if(r.AnonymitySetting.revealRankingSections === false) {
                r.RankingSectionEntries = [];
                r.dataValues.RankingSectionEntries = [];
            }
        }

        if(!leaderboard) {
            Responses.fail(res, "No such leaderboard here", null);
        } else {
            Responses.success(res, "Leaderboard found", leaderboard);
        }
    });
};

exports.editLeaderboard = function (req, res) {
    const course_id = req.params.course_id;
    const name = req.body.name;
    const weighting = parseInt(req.body.weighting, 10);
    const description = req.body.description;

    if (isNaN(weighting)){ Responses.error(res, "Weighting is not a number", null); return; }

    Models.Leaderboards.editLeaderboard(course_id, name, weighting, description, Models).then(function(leaderboard) {
        if(!leaderboard) {
            Responses.fail(res, "cannot create new leaderboard at this time, try again?", null);
        } else {
            Responses.success(res, "Leaderboard created", leaderboard);
        }
    });
};

exports.insertLeaderboard = function (req, res) {
    const course_id = req.params.course_id;
    const name = req.body.name;
    const weighting = parseInt(req.body.weighting, 10);
    const description = req.body.description;

    if (isNaN(weighting)){ Responses.error(res, "Weighting is not a number", null); return; }

    Models.Leaderboards.insertLeaderboard(course_id, name, weighting, description, Models).then(function(leaderboard) {
        if(!leaderboard) {
            Responses.fail(res, "cannot create new leaderboard at this time, try again?", null);
        } else {
            Responses.success(res, "Leaderboard created", leaderboard);
        }
    });
};