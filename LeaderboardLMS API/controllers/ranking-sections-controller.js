const Models = require("../models");
const Responses = require("../res/response");

exports.getAllRankingSections = function(req, res) {
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);

    Models.RankingSections.getRankingSection(leaderboard_id).then(function(rankingSection) {
        if(!rankingSection) {
            Responses.fail(res, "No such rankingSection here", null);
        } else {
            Responses.success(res, "RankingSection found", rankingSection);
        }
    });
};

exports.editRankingSection = function (req, res) {
    const ranking_section_id = req.params.ranking_section_id;
    const name = req.body.name;

    Models.RankingSections.editRankingSection(ranking_section_id, name).then(function(rankingSection) {
        if(!rankingSection) {
            Responses.fail(res, "Cannot edit ranking section at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section updated", rankingSection);
        }
    });
};

exports.insertRankingSection = function (req, res) {
    const leaderboard_id = req.params.leaderboard_id;
    const name = req.body.name;

    Models.RankingSections.insertRankingSection(leaderboard_id, name).then(function(rankingSection) {
        if(!rankingSection) {
            Responses.fail(res, "Cannot create new ranking section at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section created", rankingSection);
        }
    });
};

exports.deleteRankingSection = function (req, res) {
    const ranking_section_id = req.params.ranking_section_id;

    Models.RankingSections.deleteRankingSection(ranking_section_id).then(function(rankingSection) {
        if(!rankingSection) {
            Responses.fail(res, "Cannot delete ranking section at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section deleted", rankingSection);
        }
    });
}
