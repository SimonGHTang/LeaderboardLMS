import React from "react";

import Editor from "./editor";

import RankingAPI from "../../../services/ranking-services";

export default class RankingMarkEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            editor: false,
        }
    }

    update(mark) {
        this.setState({editor: !this.state.editor});
        let rankingInfo = {
            note: this.props.ranking.note,
            mark: mark
        }

        RankingAPI.post_ranking(this.props.course_id, this.props.ranking.id, rankingInfo).then((res) => {
            if(res.status === "success") {
                this.props.retrieveLeaderboard(this.props.course_id, this.props.leaderboard_id);
                window.Alert.success(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            } else {
                window.Alert.error(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        })
    }

    toggleEditor = () => this.setState({editor: !this.state.editor});

    render() {
        if(this.state.editor) {
            return(
                <Editor info={this.props.ranking.mark} submit={this.update.bind(this)} />
            )
        } else {
            return (
                <div onClick={this.toggleEditor} className="cursor-pointer">
                    {this.props.ranking.mark}
                </div>
            )
        }
    };
}
