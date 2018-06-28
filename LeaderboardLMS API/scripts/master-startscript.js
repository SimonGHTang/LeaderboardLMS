const userScript = require("./user-startScript.js");

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function () {
    var userList = userScript.startScript();

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };
}