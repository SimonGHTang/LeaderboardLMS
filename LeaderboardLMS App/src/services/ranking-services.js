import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var ranking_api = {
    get_ranking(course_id, ranking_id) {
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    },

    put_ranking(course_id, leaderboard_id, rankingInfo) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/ranking";

        var body = {
            "email": rankingInfo.email,
            "user_id": rankingInfo.user_id,
            "note": rankingInfo.note,
            "mark": rankingInfo.mark
        }

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        }

        return fetch(url, req).then((res) => res.json());
    },

    post_ranking(course_id, ranking_id, rankingInfo) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/ranking/" + ranking_id;

        var body = {
            "note": rankingInfo.note,
            "mark": rankingInfo.mark
        }

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        }

        return fetch(url, req).then((res) => res.json());
    },

    delete_ranking(course_id, ranking_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/ranking/" + ranking_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }
}

export default ranking_api;