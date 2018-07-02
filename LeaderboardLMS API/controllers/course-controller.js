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