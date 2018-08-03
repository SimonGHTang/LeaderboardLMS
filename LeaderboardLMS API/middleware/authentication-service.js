const Models = require("../models");
const Passport = require("passport");
const Responses = require("../res/response");

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){ return next(); }
    return Responses.fail(res, "User not logged in");
}

exports.isNotLoggedIn = function (req, res, next) {
    if(!req.isAuthenticated()){ return next(); }
    return Responses.fail(res, "User already logged in");
}

exports.isPublicPage = function(req, res, next) {
    if(req.method === "OPTIONS") { return next(); }

    if(req.isAuthenticated()) { return next(); }

    switch(req.path) {
        case "/auth/signup":
        case "/auth/signin":
        case "/auth/signout":
        case "/auth/user":
            return next();
            break;
    }

    switch(req.path.substring(0, 12)) {
        case "/auth/signup":
            return next();
            break;
    }

    Responses.error(res, "Authentication failure: Not authenticated", null);
}

exports.isCurrentUser = function(req, res, next) {
    const user_id = req.params.user_id;

    Models.Users.getUserIncludingPassword(user_id, user_id, Models).then(function(user) {
        if (user.email == req.user.email) {
            return next();
        } else {
            return Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error updating profile", e);
    });
}

exports.isStudentOrAdminForCourse = function(req, res, next){
    var course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Response.error(res, "Error authenticating. Course id is not a number", null); }

    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user) {
        if(user.Courses.length === 0) { return Responses.fail(res, "You are not registered to this course", null); }
        if(user.Courses[0].Roles.rank === "student" || user.Courses[0].Roles.rank === "admin"){
            return next();
        } else {
            return Responses.fail(res, " You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e)
        return Responses.error(res, "Error verifying your request", e);
    });
}

exports.isAdminForCourse = function(req, res, next) {
    var course_id = parseInt(req.params.course_id, 10);
    if(isNaN(course_id)){ Response.error(res, "Error authenticating. Course id is not a number", null); }

    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user) {
        if(user.Courses.length !== 0 && user.Courses[0].Roles.rank === "admin") {
            return next();
        } else {
            Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e=> {
        return Responses.error(res, "Error verifying your request", e);
    });
}