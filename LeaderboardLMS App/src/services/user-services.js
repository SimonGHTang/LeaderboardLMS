import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var user_api = {
    
    get_user(term) {
        var url = api_domain + "/user/" + term;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_UserIncludingCourse(term, course_id) {
        var url = api_domain + "/user/" + term + "/course/" + course_id;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_userIncludingCourses(term){
        var url = api_domain + "/user/" + term + "/courses";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_updateUser(user_id, userInfo) {
        var url = api_domain + "/user/" + user_id;

        let body = {
            "email": userInfo.email,
            "username": userInfo.username,
            "profilePictureLink": userInfo.profilePictureLink
        }

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default user_api;