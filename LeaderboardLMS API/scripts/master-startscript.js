const userScript = require("./user-startScript.js");
const courseScript = require("./course-startScript.js");

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function () {
    var courseList = courseScript.startScript();
    var userList = userScript.startScript();

    for (var key in courseList) {
        var course = courseList[key];
        Models.Courses.create(course);
    }

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };
}