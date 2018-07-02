const userScript = require("./user-startscript.js");
const courseScript = require("./course-startscript.js");
const roleScript = require("./role-startscript.js");
const invitationScript = require("./invitation-startscript.js")

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function () {
    var courseList = courseScript.startScript();
    var userList = userScript.startScript();
    var roleList = roleScript.startScript();
    var invitationList = invitationScript.startScript();

    for (var key in courseList) {
        var course = courseList[key];
        Models.Courses.create(course);
    }

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };

    for (var key in roleList){
        var role = roleList[key];
        Models.Roles.create(role);     
    };

    for (var key in invitationList){
        var invitation = invitationList[key];
        Models.Invitations.create(invitation);     
    };
}