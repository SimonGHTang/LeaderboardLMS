import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var leaderboard_api = {
    get_leaderboard(course_id, leaderbaord_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    put_leaderboard(course_id, leaderboardInfo) {
        var url = api_domain + "/course/" + course_id + "/leaderboard";

        var body = {
            "name": leaderboardInfo.name,
            "blurb": leaderboardInfo.blurb,
            "weighting": leaderboardInfo.weighting
        }

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_leaderboard(course_id, leaderboard_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id;

        var body = {
            "name": leaderboardInfo.name,
            "blurb": leaderboardInfo.blurb,
            "weighting": leaderboardInfo.weighting
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

export default leaderboard_api;