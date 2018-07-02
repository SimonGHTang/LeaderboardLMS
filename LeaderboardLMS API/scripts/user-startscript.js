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

    userList.user002 = {
        email: "tk@gmail.com",
        username: "TKTang",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "https://vignette.wikia.nocookie.net/epicbattlefantasy/images/6/66/Lance%27s_face.png/revision/latest?cb=20120506031800"
    };

    userList.user003 = {
        email: "kitty@gmail.com",
        username: "Kitty",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "https://img00.deviantart.net/bd82/i/2014/353/6/4/fluttershy___oh__yes__by_ajvl-d65tdq6.jpg"
    }

    userList.user004 = {
        email: "tael@gmail.com",
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