module.exports.startScript = function() {
    var courseList = {};

    courseList.course001 = {
        name: "INFO1103",
        description: "Introductory programming course",
        coordinator: "Dong Yuan",
        pictureLink: "http://logodatabases.com/wp-content/uploads/2012/03/java-logo-wallpaper.jpg",
        allowInvitations: true
    };

    courseList.course002 = {
        name: "INFO1105",
        description: "Data Structures",
        coordinator: "Dong Yuan",
        pictureLink: "https://pbs.twimg.com/profile_images/943919605814214656/3-UIm1if_400x400.jpg",
        allowInvitations: true
    };

    return courseList;
}