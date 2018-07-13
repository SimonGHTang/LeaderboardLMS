const CourseController = require("../controllers/course-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.get("/course/:course_id", AuthenticationService.isLoggedIn, CourseController.getCourse);
    app.get("/course/:course_id/users", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUsers);
    app.get("/course/:course_id/admins", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingAdmins);
    app.get("/course/:course_id/students", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingStudents);
    app.get("/course/:course_id/user/:term", AuthenticationService.isAdminForCourse, CourseController.getCourseIncludingUser);
    app.put("/course/:course_id/admin/:user_id", AuthenticationService.isAdminForCourse, CourseController.setUserAsAdmin);
    app.post("/course/:course_id", AuthenticationService.isAdminForCourse, CourseController.updateCourse);

}