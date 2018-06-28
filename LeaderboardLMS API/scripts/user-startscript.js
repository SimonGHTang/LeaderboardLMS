const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function (){
    var userList = {};

    userList.user001 = {
        email: "yuan@gmail.com",
        username: "Dong",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "http://www.isa.org.usyd.edu.au/homeimg/USYD_LOGO_New.jpg"
    };

    return userList;
};

function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}