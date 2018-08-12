import "whatwg-fetch"

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var course_api = {
    get_course(course_id) {
        var url = api_domain + "/course/" + course_id;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_CourseIncludingUsers(course_id) {
        var url = api_domain + "/course/" + course_id + "/users";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_CourseIncludingAdmins(course_id) {
        var url = api_domain + "/course/" + course_id + "/admins";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_CourseIncludingStudents(course_id) {
        var url = api_domain + "/course/" + course_id + "/students";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_CourseIncludingUser(course_id, term) {
        var url = api_domain + "/course/" + course_id + "/user/" + term;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_courseLeaderboards(course_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboards";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_course(courseInfo) {
        var url = api_domain + "/course";

        let body = {
            "name": courseInfo.name,
            "description": courseInfo.description,
            "coordinator": courseInfo.coordinator,
            "pictureLink": courseInfo.pictureLink,
            "allowInvitation": courseInfo.allowInvitation
        };

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_updateCourse(course_id, courseInfo) {
        var url = api_domain + "/course/" + course_id;

        let body = {
            "name": courseInfo.name,
            "description": courseInfo.description,
            "coordinator": courseInfo.coordinator,
            "pictureLink": courseInfo.pictureLink,
            "allowInvitation": courseInfo.allowInvitation
        }

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        }

        return fetch(url, req).then((res) => res.json());
    },

    delete_course(course_id) {
        var url = api_domain + "/course/" + course_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        }
        return fetch(url, req).then((res) => res.json());
    },

    post_setUserAsAdmin(course_id, user_id) {
        var url = api_domain + "/course/" + course_id + "/admin/" + user_id;

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }, 

    post_setUserAsStudent(course_id, user_id) {
        var url = api_domain + "/course/" + course_id + "/student/" + user_id;

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    delete_kickUser(course_id, user_id) {
        var url = api_domain + "/course/" + course_id + "/user/" + user_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }
}

export default course_api;