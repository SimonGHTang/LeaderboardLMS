const Models = require("../models");
const Responses = require("../res/response");

exports.getUser = function(req, res) {
    const email = req.params.term;
    var user_id = parseInt(req.params.term, 10);
    user_id = isNaN(user_id) ? null : user_id;

    Models.Users.getUser(user_id, email).then(function(user) {
        if(!user) {
            Responses.fail(res, "No user found", null);
        } else {
            Responses.success(res, "User found", user);
        }
    });
};