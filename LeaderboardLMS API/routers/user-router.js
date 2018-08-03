const UserController = require("../controllers/user-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.get("/user/:term", AuthenticationService.isLoggedIn, UserController.getUser);
    app.get("/user/:term/courses", AuthenticationService.isLoggedIn, UserController.getUserIncludingCourses);
    app.get("/user/:term/course/:course_id", AuthenticationService.isLoggedIn, UserController.getUserIncludingCourse);
    app.post("/user/:user_id", AuthenticationService.isCurrentUser, UserController.updateUser);
}