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

exports.updateUser = function ( req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    const email = req.body.email;
    const username = req.body.username;
    const profilePictureLink = req.body.profilePictureLink;

    if(!email) {
        Responses.fail(res, "Email cannot be empty", null);
    } else if (!username) {
        Responses.fail (res, "Username cannot be empty", null);
    }

    Models.Users.updateUser(user_id, email, username, profilePictureLink).then(function(user) {
        if(!user) {
            Responses.fail(res, "Profile update failed", null);
        } else {
            Responses.success(res, "Profile updated",  user);
        }
    });
};