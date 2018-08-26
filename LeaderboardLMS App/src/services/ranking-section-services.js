import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
}

var ranking_sections_api = {
    get_rankingSection (course_id, leaderboard_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingSections"

        var req = {
            method: "GET",
            headers: headers,
            crendentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_rankingSection(course_id, leaderboard_id, rankingSectionInfo) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingSection";

        let body = {
            "name": rankingSectionInfo.name
        }

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        }

        return fetch(url, req).then((res) => res.json());
    },

    post_rankingSection(course_id, leaderboard_id, ranking_section_id, rankingSectionInfo) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingSection/" + ranking_section_id;
        
        let body = {
            "name": rankingSectionInfo.name
        }

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        }

        return fetch(url, req).then((res) => res.json());
    },

    delete_rankingSection(course_id, ranking_section_id) {
        var url = api_domain + "/course/" + course_id + "/leaderboard/rankingSection/" + ranking_section_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }  
}

export default ranking_sections_api;