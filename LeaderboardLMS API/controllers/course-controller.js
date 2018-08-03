const Responses = require ("../res/response");
const Models = require("../models");

exports.getCourse = function(req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }

    Models.Courses.getCourse(course_id).then( function(course) {
        if(!course) {
            Responses.fail(res, "Course information could not be loaded", null);
        } else {
            Responses.success(res, "Course found", course);
        }
    });
};

exports.getCourseIncludingUser = function (req, res) {
    const user = req.params.term;
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }

    Models.Courses.getCourseIncludingUser(course_id, user, user, Models).then(function(course){
        if(!course) {
            Responses.fail(res, "There is no user here", null);
        } else {
            Responses.success(res, "Info retrieval successful", course);
        }
    });
};

exports.getCourseIncludingUsers = function (req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }

    Models.Courses.getCourseIncludingUsers(course_id, Models).then(function(course){
        if(!course) {
            Responses.fail(res, "Something is missing", null);
        } else {
            Responses.success(res, "Info retrieval successful", course);
        }
    });
};

exports.getCourseIncludingAdmins = function (req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }

    Models.Courses.getCourseIncludingUsersAndRank(course_id, "admin", Models).then(function(course) {
        if(!course) {
            Responses.fail(res, "Course information could not be loaded", null);
        } else {
            Responses.success(res, "Info retrival successful", course);
        }
    });
};

exports.getCourseIncludingStudents = function (req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }

    Models.Courses.getCourseIncludingUsersAndRank(course_id, "student", Models).then(function(course) {
        if(!course) {
            Responses.fail(res, "Course information could not be loaded", null);
        } else {
            Responses.success(res, "Info retrival successful", course);
        }
    });
};

exports.setUserAsAdmin = function(req,res) {
    const course_id = parseInt(req.params.course_id, 10);
    const user_id = parseInt(req.params.user_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }
    if (isNaN(user_id)){ Responses.error(res, "User ID is not a number", null); return; }

    Models.Courses.setUserAsAdmin(course_id, user_id, Models).then(function(course) {
        if(!course) {
            Responses.fail(res, "User could not be set as course admin", null);
        } else {
            Responses.success(res, "User set as admin of " + course.name, course);
        }
    });
} 

exports.setUserAsStudent = function(req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    const user_id = parseInt(req.params.user_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); return; }
    if (isNaN(user_id)){ Responses.error(res, "User ID is not a number", null); return; }

    Models.Courses.setUserAsStudent(course_id, user_id, Models).then(function(course) {
        if(!course) {
            Responses.fail(res, "User could not be set as student", null);
        } else {
            Responses.success(res, "User set as student of " + course.name, course);
        }
    })
}

exports.kickUser = function(req, res) {
    const user_id = req.params.user_id;
    const course_id = req.params.course_id;

    Models.Courses.kickUser(course_id, user_id, Models).then(function(user) {
        if(!user) {
            Responses.fail(res, "Failed to kick user. The user does not exist or they may not be registered anymore.", null);
        } else {
            Responses.success(res, user.email + " kicked", user);
        }
    });
}

exports.updateCourse = function ( req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    const name = req.body.name;
    const description = req.body.description;
    const coordinator = req.body.coordinator;
    const pictureLink = req.body.pictureLink;
    const allowInvitations = req.body.allowInvitations;

    if(!name) {
        Responses.fail (res, "Name cannot be empty", null);
        return;
    }

    Models.Courses.updateCourse(course_id, name, description, coordinator, pictureLink, allowInvitations).then(function(course) {
        if(!course) {
            Responses.fail(res, "Course update failed", null);
        } else {
            Responses.success(res, "Course updated", course);
        }
    });
};

exports.insertCourse = function(req, res) {
    const user_id = req.user.id;
    const email = req.user.email;
    const name = req.body.name;
    const description = req.body.description;
    const coordinator = req.body.coordinator;
    const pictureLink = req.body.pictureLink;
    const allowInvitations = req.body.allowInvitations;

    if(!name) { Responses.fail(res, "Name cannot be empty", null); return; }

    Models.Courses.insertCourse(user_id, email, name, description, coordinator, pictureLink, allowInvitations, Models).then(function(course) {
        if(!course) {
            Responses.fail(res, "Failed to create course", null);
        } else {
            Responses.success(res, "Course created", course);
        }
    })
}