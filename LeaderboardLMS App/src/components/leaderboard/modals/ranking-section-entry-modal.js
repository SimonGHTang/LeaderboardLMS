import React from "react";
import {Modal, Button, Icon, Table} from "semantic-ui-react";

import UpsertRankingSectionEntryModal from "./upsert-ranking-section-modal";


export default class RankingSectionEntryModal extends React.Component {
    constructor(props) {
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

    componentWillMount(){
        this.getRankingSectionEntries(this.props);
    }

    getRankingSectionEntries(props) {
        for(var i = 0; i < props.rankingSections.length; i++) {
            for( var j = 0; j < props.ranking.RankingSectionEntries.length; j++) {
                if(props.rankingSections[i].id === props.ranking.RankingSectionEntries[j].ranking_section_id) {
                    let rankingSectionEntry = (
                        <Table.Row key={i}>
                            <Table.Cell width={8}>
                                {props.rankingSections[i].name}
                            </Table.Cell>
                            <Table.Cell width={8}>
                                {props.ranking.RankingSectionEntries[j].mark}
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
                    onClose={this.closeModal}
                    size="small"
                    open={this.state.modal}
                    trigger={
                        <Icon name="tasks" className="cursor-pointer  teal-hover icon-blue" size="large" onClick={this.openModal}/>
                    }
                >
                    <Modal.Header> {this.props.leaderboardName} </Modal.Header>
                    <Modal.Content>
                        <div>This student has chosen to remain to keep their marks hidden or there is no ranking sections added </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <UpsertRankingSectionEntryModal
                            rankingSections={this.props.rankingSections}
                            course_id={this.props.course_id}
                            ranking_id={this.props.ranking.id}
                        />
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Actions>
                </Modal>
            )
        }

        return(
            <Modal
                onClose={this.closeModal}
                size="small"
                open={this.state.modal}
                trigger={
                    <Icon name="tasks" className="cursor-pointer  teal-hover icon-blue" size="large" onClick={this.openModal}/>
                }
            >
                <Modal.Header> {this.props.leaderboardName} </Modal.Header>
                <Modal.Content>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Assessment Section Name</Table.HeaderCell>
                                <Table.HeaderCell>Mark</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.rankingSectionEntryList}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <UpsertRankingSectionEntryModal
                        rankingSections={this.props.rankingSections}
                        course_id={this.props.course_id}
                        ranking_id={this.props.ranking.id}
                        rankingSectionEntries={this.props.ranking.RankingSectionEntries}
                    />
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}