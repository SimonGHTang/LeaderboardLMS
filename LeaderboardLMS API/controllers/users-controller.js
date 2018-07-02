const Models = require("../models");
const Responses = require("../res/response");

exports.getUsersByUsername = function(req, res) {
    const username = req.params.term;

    Models.Users.getUsersByUsername(username).then(function(users) {
        if(!users ) {
            Responses.fail(res, "No users found", null);
        } else {
            var message = users.length == 0 ? "No users found" : "Users found";
            Responses.success(res, message, users);
        }
    });

};