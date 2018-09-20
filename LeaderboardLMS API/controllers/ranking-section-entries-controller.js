const Models = require("../models");
const Responses = require("../res/response");

exports.getRankingSectionEntry = function(req, res) {
    const ranking_section_entry_id = parseInt(req.body.ranking_section_entry_id, 10);

    Models.rankingSectionEntries.getRankingSectionEntry(ranking_section_entry_id).then(function(rankingSectionEntry) {
        if(!rankingSectionEntry) {
            Responses.fail(res, "No such ranking section entry here", null);
        } else {
            Responses.success(res, "ranking section entry found", rankingSectionEntry);
        }
    });
};

exports.editRankingSectionEntry = function (req, res) {
    const ranking_section_entry_id = req.body.ranking_section_entry_id;
    const mark = req.body.mark;


    Models.RankingSectionEntries.editRankingSectionEntry(ranking_section_entry_id, mark).then(function(rankingSectionEntry) {
        if(!rankingSectionEntry) {
            Responses.fail(res, "cannot create new ranking section entry at this time, try again?", null);
        } else {
            Responses.success(res, "rankingSectionEntry created", rankingSectionEntry);
        }
    });
};

exports.insertRankingSectionEntry = function (req, res) {
    const ranking_id = req.params.ranking_id;
    const ranking_section_id = parseInt(req.body.ranking_section_id, 10);
    const mark = req.body.mark;
    const user_id = req.body.user_id;

    Models.RankingSectionEntries.insertRankingSectionEntry(ranking_id, ranking_section_id, user_id, mark, Models).then(function(rankingSectionEntry) {
        if(!rankingSectionEntry) {
            Responses.fail(res, "cannot create new ranking section entry at this time, try again?", null);
        } else {
            Responses.success(res, "ranking section entry created", rankingSectionEntry);
        }
    });
};

exports.deleteRankingSectionEntry = function (req, res) {
    const ranking_section_entry_id = req.params.ranking_section_entry_id;

    if (isNaN(ranking_section_entry_id)){ Responses.error(res, "Ranking Section Entry ID is not a number", null); return; }

    Models.RankingSectionEntries.deleteRankingSectionEntry(ranking_section_entry_id).then(function(rankingSectionEntry) {
        if(!rankingSectionEntry) {
            Responses.fail(res, "Cannot delete ranking section entry at this time, try again?", null);
        } else {
            Responses.success(res, "Ranking section entry deleted", rankingSectionEntry);
        }
    });
}