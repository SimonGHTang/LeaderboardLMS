import React from "react";

import {Label} from "semantic-ui-react";

import Editor from "./editor";

import RankingAPI from "../../../services/ranking-services";

export default class RankingNoteEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            editor: false,
        }
    }

    update(note) {
        this.setState({editor: !this.state.editor});
        let rankingInfo = {
            note: note,
            mark: this.props.ranking.mark
        }

        RankingAPI.post_ranking(this.props.course_id, this.props.ranking.id, rankingInfo).then((res) => {
            if(res.status === "success") {
                this.props.retrieveLeaderboard(this.props.course_id, this.props.leaderboard_id);
                window.Alert.success(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            } else {
                window.Alert.error(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        });
    }

    toggleEditor = () => this.setState({editor: !this.state.editor});

    render() {
        if(this.state.editor) {
            return(
                <Editor info={this.props.ranking.note} submit={this.update.bind(this)} />
            )
        } else {
            return (
                <div onClick={this.toggleEditor} className="cursor-pointer">
                    {this.props.ranking.note ? this.props.ranking.note : <Label disabled>click here to edit</Label>}
                </div>
            )
        }
    };
}
