import React from "react";

import {Label} from "semantic-ui-react";

import Editor from "./editor";

import RankingSectionEntryAPI from "../../../services/ranking-section-entries-services";

export default class RankingSectionEntryMarkEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            editor: false,
        }
    }

    update(mark) {
        this.setState({editor: !this.state.editor});
        
        let rankingSectionEntryInfo = {
            ranking_section_entry_id: this.props.rankingSectionEntry.id,
            mark: mark
        }

        RankingSectionEntryAPI.post_rankingSectionEntry(this.props.course_id, this.props.rankingSectionEntry.id, rankingSectionEntryInfo).then((res) => {
            if(res.status === "success") {
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
                <Editor info={this.props.rankingSectionEntry.mark} submit={this.update.bind(this)} />
            )
        } else {
            return (
                <div onClick={this.toggleEditor} className="cursor-pointer">
                    {isNaN( parseInt(this.props.rankingSectionEntry.mark, 10) ) ? <Label disabled>click here to edit</Label> : this.props.rankingSectionEntry.mark }
                </div>
            )
        }
    };
}
