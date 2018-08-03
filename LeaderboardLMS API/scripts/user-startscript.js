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

    userList.user005 = {
        email: "asdf@gmail.com",
        username: "Asdf Qwerty",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "https://vignette.wikia.nocookie.net/casuallyexplained/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/150?cb=20171203035936"
    }

    userList.user006 = {
        email: "darren@gmail.com",
        username: "Darren",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "https://images.techhive.com/images/article/2016/01/thinkstockphotos-481493125-100638928-large.jpg"
    }

    userList.user007 = {
        email: "Brendan@gmail.com",
        username: "BrendanT",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active",
        profilePictureLink: "https://ih0.redbubble.net/image.387863594.5073/flat,800x800,075,f.jpg"
    }

    return userList;
};

function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}