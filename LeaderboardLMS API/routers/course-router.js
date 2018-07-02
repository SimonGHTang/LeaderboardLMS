const CourseController = require("../controllers/course-controller");

module.exports = function(app) {
    app.get("/course/:course_id", CourseController.getCourse);
    app.get("/course/:course_id/users", CourseController.getCourseIncludingUsers);
    app.post("/course/:course_id", CourseController.updateCourse);
}