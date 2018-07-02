const Express = require("express");
const BodyParser  = require("body-parser");
const BCrypt = require("bcrypt-nodejs");
const Passport = require("passport");
const Session = require("express-session");
const App = Express();

const startScript = require("./scripts/master-startscript.js");
const Models = require("./models");

App.use(BodyParser.urlencoded({ extended: true}));
App.use(BodyParser.json());

require("./routers/user-router.js")(App);
require("./routers/users-router.js")(App);
require("./routers/course-router.js")(App);

Models.sequelizeCredentials.sync({ force: true }).then(() => {
    startScript.startScript();

    App.listen(11000, () => {
        console.log("Leaderboard LMS API active on port 11000!");
    });
}).catch(e => {
    console.error(e);
});
