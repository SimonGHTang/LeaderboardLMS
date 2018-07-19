const Models = require("../models");
const Responses = require("../res/response");

exports.getLeaderboard = function(req, res) {
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);

    Models.Leaderboards.getLeaderboard(leaderboard_id).then(function(leaderboard) {
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