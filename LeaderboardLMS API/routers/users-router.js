const UsersController = require("../controllers/users-controller");

module.exports = function( app) {
    app.get("/users/:term", UsersController.getUsersByUsername);
}