module.exports.startScript = function() {
    var roleList = {};

    roleList.user001course001 = {
        user_id: 1,
        course_id: 1,
        rank: "admin"
    };

    roleList.user001course002 = {
        user_id: 1,
        course_id: 2,
        rank: "admin"
    };

    roleList.user002course001 = {
        user_id: 2,
        course_id: 1,
        rank: "student"
    };

    roleList.user002course002 = {
        user_id: 2,
        course_id: 2,
        rank: "student"
    }

    roleList.user003course002 = {
        user_id: 3,
        course_id: 1,
        rank: "student"
    };

    roleList.user004course002 = {
        user_id: 4,
        course_id: 1,
        rank: "student"
    };

    return roleList;
}