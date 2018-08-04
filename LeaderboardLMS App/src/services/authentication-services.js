import "whatwg-fetch"

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var authentication_api = {
    get_currentUser() {
        var url = api_domain + "/auth/user";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    get_signout() {
        var url = api_domain + "/auth/signout";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    get_signup(invitation) {
        var url = api_domain + "/auth/signup/" + invitation;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_signup(signupInfo, invitation) {
        var url = api_domain + "/auth/signup/" + invitation;

        let body = {
            "email": signupInfo.email,
            "password": signupInfo.password
        };

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body),
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_signin(signinInfo) {
        var url = api_domain + "/auth/signin";

        let body = {
            "email": signinInfo.email,
            "password": signinInfo.password
        };

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default authentication_api;

