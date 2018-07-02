const Responses = require("../res/response");
const Models = require("../models");

exports.insertInvitation = function (req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    if(isNaN(course_id)){Response.error(res, "Course ID is not a number", null); return; }

    Models.Invitations.insert(course_id).then(function(invitation) {
        if(!invitation) {
            Responses.error(res, "Invitation could not be created", null);
        } else {
            Responses.error(res, "Invitation generated", invitation);
        }
    });
};

exports.deleteInvitation = function(req, res) {
    const course_id = parseInt(req.params.course_id, 10);
    const invitation_id = parseInt(req.params.invitation_id, 10);
    if(isNaN(invitation_id)){ Response.error(res, "Invitation ID is not a number"); return; }

    Models.Invitations.delete(course_id, invitation_id).then(function(numberOfInvitationsDeleted){
        if(numberOfInvitationsDeleted != 1) {
            Responses.error(res, "Error with deleting invitation", null);
        } else {
            Responses.success(res, "Invitation deleted successfully", null);
        }
    });
}