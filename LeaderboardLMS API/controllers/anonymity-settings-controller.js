const Responses = require("../res/response");
const Models = require("../models");

exports.getAnonymitySetting = function(req, res) {
    const AnonymitySetting_id = parseInt(req.params.AnonymitySetting_id, 10);

    Models.AnonymitySettings.getAnonymitySetting(AnonymitySetting_id).then(function(AnonymitySetting) {
        if(!AnonymitySetting) {
            Responses.fail(res, "No such student anonymity setting here", null);
        } else {
            Responses.success(res, "student anonymity setting found", AnonymitySetting);
        }
    });
};

exports.editAnonymitySetting = function (req, res) {
    const AnonymitySetting_id = req.params.AnonymitySetting_id;
    const revealLeaderboardName = req.body.revealLeaderboardName;
    const revealAnonymitySettingSections = req.body.revealAnonymitySettingSections;

    if (isNaN(AnonymitySetting_id)){ Responses.error(res, "Anonymity setting ID is not a number", null); return; }

    Models.AnonymitySettings.editAnonymitySetting(AnonymitySetting_id, revealLeaderboardName, revealAnonymitySettingSections).then(function(AnonymitySetting) {
        if(!AnonymitySetting) {
            Responses.fail(res, "Cannot update anonymity setting at this time, try again?", null);
        } else {
            Responses.success(res, "Anonymity setting updated", AnonymitySetting);
        }
    });
};