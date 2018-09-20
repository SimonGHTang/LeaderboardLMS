import React from "react";

import {Modal, Button, Icon, Table} from "semantic-ui-react";

import RankingSectionEntryEditorModal from "../editor/ranking-section-entry-editor";
import DeleteRankingSectionEntryModal from "./delete-ranking-section-entry-modal";
import InsertRankingSectionEntryModal from "./insert-ranking-section-entry-modal";

export default class RankingSectionEntryModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            rankingSectionEntryList: []
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    toggleModal = () => this.setState({modal: !this.state.modal}) 

    componentWillMount(){
        this.getRankingSectionEntries(this.props);
    }

    getRankingSectionEntries(props) {
        for(var i = 0; i < props.rankingSections.length; i++) {
            for( var j = 0; j < props.ranking.RankingSectionEntries.length; j++) {
                if(props.rankingSections[i].id === props.ranking.RankingSectionEntries[j].ranking_section_id) {
                    let rankingSectionEntry = (
                        <Table.Row key={i}>
                            <Table.Cell width={6}>
                                {props.rankingSections[i].name}
                            </Table.Cell>
                            <Table.Cell width={6}>
                                {/* {props.ranking.RankingSectionEntries[j].mark} */}
                                <RankingSectionEntryEditorModal rankingSectionEntry={props.ranking.RankingSectionEntries[j]} course_id={this.props.course_id} />
                            </Table.Cell>
                            <Table.Cell width={2}>
                                <DeleteRankingSectionEntryModal course_id={this.props.course_id} id={this.props.ranking.RankingSectionEntries[j].id}  />
                            </Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankingSectionEntryList.push(rankingSectionEntry);
                }
            }

            this.forceUpdate();
        }
    }

    render() {
        if(this.state.rankingSectionEntryList.length === 0) {
            return(
                <Modal
                    onClose={this.toggleModal}
                    size="small"
                    open={this.state.modal}
                    trigger={
                        <Icon name="tasks" className="cursor-pointer  teal-hover icon-blue" size="large" onClick={this.toggleModal}/>
                    }
                >
                    <Modal.Header> {this.props.leaderboardName} </Modal.Header>
                    <Modal.Content>
                        <div>This student has chosen to remain to keep their marks hidden or there is no ranking sections added </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <InsertRankingSectionEntryModal course_id={this.props.course_id} ranking={this.props.ranking} rankingSections={this.props.rankingSections} />
                        <Button onClick={this.toggleModal}>Close</Button>
                    </Modal.Actions>
                </Modal>
            )
        }

        return(
            <Modal
                onClose={this.toggleModal}
                size="small"
                open={this.state.modal}
                trigger={
                    <Icon name="tasks" className="cursor-pointer  teal-hover icon-blue" size="large" onClick={this.toggleModal}/>
                }
            >
                <Modal.Header> {this.props.leaderboardName} </Modal.Header>
                <Modal.Content>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={9} >Assessment Section Name</Table.HeaderCell>
                                <Table.HeaderCell width={6} >Mark</Table.HeaderCell>
                                <Table.HeaderCell width={1} ></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.rankingSectionEntryList}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <InsertRankingSectionEntryModal leaderboard_id={this.props.leaderboard_id} course_id={this.props.course_id} ranking={this.props.ranking} rankingSections={this.props.rankingSections} />
                    <Button onClick={this.toggleModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}