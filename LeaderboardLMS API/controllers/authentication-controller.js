const Responses = require("../res/response");
const Models = require("../models");

exports.getCurrentUser = function(req, res) {
    if (req.user.email) {
        Models.Users.getUser(req.user.id, req.user.email).then(function(user) {
            if(!user) {
                Responses.fail(res, "No user found", null);
            } else {
                Responses.success(res, "User found", user);
            }
        });
    } else {
        Responses.fail(res, "You are not logged in", null);
    }
}

exports.signUp = function(req, res) {
    Models.Invitations.getByLink(req.params.link).then(function(invitation) {
        if(!invitation) {
            Responses.fail(res, "Invalid invite link", null);
        } else {
            Responses.success( res, "Valid invite link", invitation);
        }
    });
}

exports.signedUp = function(req, res) {
    Responses.success(res, "Successfully signed up", null);
}

exports.signedIn = function(req, res) {
    Responses.success(res, "Successfully signed in", null);
}

exports.signOut = function(req, res) {
    req.logout();
    req.session.destroy( function(){
        res.clearCookie('connect.sid');
        Responses.success(res, "Sign-out", null);
    });
}