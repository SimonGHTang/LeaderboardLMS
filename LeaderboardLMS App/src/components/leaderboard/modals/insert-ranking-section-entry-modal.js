import React from "react";

import {Modal, Divider, Button, Dropdown} from "semantic-ui-react";

import Editor from "../editor/editor"

import RankingSectionEntryAPI from "../../../services/ranking-section-entries-services";

export default class InsertRankingSectionEntryModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            rankingSectionOptions: [],
            selectedRankingSection: null
        }
    }

    updateSelectedRankingSection = (event, data) => {
        console.log("EVENT", event);
        console.log("DATA", data);
        this.setState({selectedRankingSection: data.value})
    }

    toggleModal = () => this.setState({modal: !this.state.modal});

    insertEntry(mark) {
        var rankingSectionEntryInfo = {
            "ranking_section_id": this.state.selectedRankingSection,
            "user_id": this.props.ranking.User.id,
            "mark": mark
        }

        RankingSectionEntryAPI.put_rankingSectionEntry(this.props.course_id, this.props.ranking.id, rankingSectionEntryInfo).then((res) => {
            if(res.status === "success") {
                window.Alert.success(res.message, { position: "top", effect: "stackslide", timout: 2000 });
            } else {
                window.Alert.error(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        });

        this.forceUpdate();
    }

    loadInsertInterface(props) {
        this.setState({insertEntryInterface: [] });

        for(var i = 0; i < props.rankingSections.length; i++) {
            let rankingSection = {
                text: this.props.rankingSections[i].name,
                value: this.props.rankingSections[i].id
            }

            this.state.rankingSectionOptions.push(rankingSection);
        }
    }

    componentWillMount() {
        this.loadInsertInterface(this.props);
    }

    render() {
        return(
            <Modal
                open={this.state.modal}
                onClose={this.toggleModal}
                trigger={
                    <Button onClick={this.toggleModal} >Insert Ranking Section Entry</Button>
                }
            >
                <Modal.Header>Insert Ranking Section Entry</Modal.Header>
                <Modal.Content>
                    <div>
                    <Dropdown placeholder='Select Entry' fluid selection options={this.state.rankingSectionOptions} onChange={this.updateSelectedRankingSection} />
                    </div>
                    <Divider/>
                    <div> 
                        <Editor info={''} submit={this.insertEntry.bind(this)} />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}