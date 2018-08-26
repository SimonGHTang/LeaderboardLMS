import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var ranking_section_entry_api = {
    get_rankingSectionEntries(course_id, ranking_id){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/rankingsectionentries";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_rankingSectionEntry(course_id, ranking_id, rankingSectionEntryInfo){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/rankingsectionentry";

        let body = {
            "mark": rankingSectionEntryInfo.mark,
            "ranking_section_id": rankingSectionEntryInfo.ranking_section_id
        };

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_rankingSectionEntry(course_id, ranking_id, ranking_section_entry_id, rankingSectionEntryInfo){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/rankingsectionentry/" + ranking_section_entry_id;

        let body = {
            "mark": rankingSectionEntryInfo.mark
        };

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    delete_rankingSectionEntry(course_id, ranking_id, ranking_section_entry_id){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/rankingsectionentry/" + ranking_section_entry_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include",
        }

        return fetch(url, req).then((res) => res.json());
    }
}

export default ranking_section_entry_api;