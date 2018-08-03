const Express = require("express");
const BodyParser  = require("body-parser");
const Passport = require("passport");
const Session = require("express-session");
const App = Express();

const startScript = require("./scripts/master-startscript.js");
const Models = require("./models");
const AuthenticationService = require("./middleware/authentication-service.js");

App.use(function(req, res, next) {

    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

App.use(Session({ secret: "secret_seed", resave:false, saveUninitialized: false, secure: false, rolling: true }));
App.use(Passport.initialize());
App.use(Passport.session());
App.use(BodyParser.urlencoded({ extended: true}));
App.use(BodyParser.json());
App.use(AuthenticationService.isPublicPage);

require("./routers/authentication-router.js")(App, Passport);
require("./passport/passport.js")(Passport, Models.Users);

require("./routers/user-router.js")(App);
require("./routers/users-router.js")(App);
require("./routers/course-router.js")(App);
require("./routers/invitation-router.js")(App);
require("./routers/invitations-router.js")(App);
require("./routers/leaderboard-router.js")(App);
require("./routers/rankings-router.js")(App);
require("./routers/ranking-sections-router.js")(App);
require("./routers/ranking-section-entries-router.js")(App);
require("./routers/anonymity-setting-router.js")(App);

Models.sequelizeCredentials.sync({ force: false }).then(() => {
    //startScript.startScript();

    App.listen(11000, () => {
        console.log("Leaderboard LMS API active on port 11000!");
    });
}).catch(e => {
    console.error(e);
});
