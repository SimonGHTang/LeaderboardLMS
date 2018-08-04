import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var invitation_api = {
    get_invitations(course_id){
        var url = api_domain + "/course/" + course_id + "/invitations";
        
        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    put_invitation(course_id) {
        var url = api_domain + "/course/" + course_id + "/invitation";

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    delete_invitation(course_id, invitation_id) {
        var url = api_domain + "/course/" + course_id + "/invitation/" + invitation_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }
}

export default invitation_api;