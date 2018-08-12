const CourseController = require("../controllers/course-controller");
const AuthenticationService = require("../middleware/authentication-service");

module.exports = function(app) {
    app.get("/course/:course_id", AuthenticationService.isLoggedIn, CourseController.getCourse);
    app.get("/course/:course_id/users", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUsers);
    app.get("/course/:course_id/admins", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingAdmins);
    app.get("/course/:course_id/students", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseIncludingStudents);
    app.get("/course/:course_id/user/:term", AuthenticationService.isAdminForCourse, CourseController.getCourseIncludingUser);

    app.get("/course/:course_id/leaderboards", AuthenticationService.isStudentOrAdminForCourse, CourseController.getCourseLeaderboards);
    
    app.put("/course", AuthenticationService.isLoggedIn, CourseController.insertCourse);
    
    app.post("/course/:course_id", AuthenticationService.isAdminForCourse, CourseController.updateCourse);
    app.post("/course/:course_id/admin/:user_id", AuthenticationService.isAdminForCourse, CourseController.setUserAsAdmin);
    app.post("/course/:course_id/student/:user_id", AuthenticationService.isAdminForCourse, CourseController.setUserAsStudent);

    app.delete("/course/:course_id", AuthenticationService.isAdminForCourse, CourseController.deleteCourse);
    app.delete("/course/:course_id/user/:user_id", AuthenticationService.isAdminForCourse, CourseController.kickUser);
}