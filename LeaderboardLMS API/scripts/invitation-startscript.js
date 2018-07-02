module.exports.startScript = function(){
    var invitationList = {};

    invitationList.invitation001 = {
        link: "aaaaaaaaa",
        course_id: 1
    }

    invitationList.invitation002 = {
        link: generateInviteLink(),
        course_id: 1
    }

    invitationList.invitation003 = {
        link: generateInviteLink(),
        course_id: 2
    }

    invitationList.invitation004 = {
        link: "bbbbbbbbb",
        course_id: 2
    }
    
    return invitationList;
}

function generateInviteLink(){
    return Math.random().toString(36).substring(3,12);
}