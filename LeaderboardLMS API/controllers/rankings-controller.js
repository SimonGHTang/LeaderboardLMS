const Models = require("../models");
const Responses = require ("../res/response");

// exports.getRanking = function(req, res) {
//     const ranking_id = parseInt(req.params.ranking_id, 10);

//     Models.Rankings.getRanking(ranking_id).then(function(ranking) {
//         if(!ranking) {
//             Responses.fail(res, "No such ranking here", null);
//         } else {
//             Responses.success(res, "Ranking found", ranking);
//         }
//     });
// };

exports.editRanking = function (req, res) {
    const ranking_id = req.params.ranking_id;
    const mark = req.body.mark;

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); return; }

    Models.Rankings.editRanking(ranking_id, mark).then(function(ranking) {
        if(!ranking) {
            Responses.fail(res, "Cannot update ranking at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section updated", ranking);
        }
    });
};

exports.insertRanking = function (req, res) {
    const leaderboard_id = req.params.leaderboard_id;
    const user_id = req.body.user_id;
    const mark = req.body.mark;

    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); return; }

    Models.Rankings.insertRanking(leaderboard_id, mark).then(function(ranking) {
        if(!ranking) {
            Responses.fail(res, "Cannot create new ranking at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section created", ranking);
        }
    });
};

// exports.deleteRanking = function (req, res) {
//     const ranking_id = req.params.ranking_id;

//     if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); return; }

//     Models.Rankings.deleteRanking(ranking_id).then(function(ranking) {
//         if(!ranking) {
//             Responses.fail(res, "Cannot delete ranking at this time, try again?", null);
//         } else {
//             Responses.success(res, "Ranking section deleted", ranking);
//         }
//     });
// }