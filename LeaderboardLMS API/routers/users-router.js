const UsersController = require("../controllers/users-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function( app) {
    app.get("/users/:term", AuthenticationService.isStudentOrAdminForCourse, UsersController.getUsersByUsername);
}