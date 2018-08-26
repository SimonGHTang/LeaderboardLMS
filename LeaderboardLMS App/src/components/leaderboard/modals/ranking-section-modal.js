import React from "react";

import {Modal, Button, Icon, Table, Label} from "semantic-ui-react";

import InsertRankingSectionModal from "./insert-ranking-section-modal";

import RankingSectionAPI from "../../../services/ranking-section-services";

export default class RankingSectionModal extends React.Component {
    constructor(props) {
        super();

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            rankingSectionList: []
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({errorMessage: ""});
        this.setState({successMessage: ""});
    }

    closeModal = () => this.setState({modal: false});

    setErrorMessage(m) {
        this.setState({errorMessage: m});
        this.setState({successMessage: ""});
    }

    setSuccessMessage(m) {
        this.setState({errorMessage: ""});
        this.setState({successMessage: m});
    }

    updateName(e) {
        this.setState({name: e.target.value})
    }

    componentWillMount() {
        this.setState({rankingSectionList: []}, () => {this.renderRankingSectionList(this.props)});
    }

    componentWillReceiveProps(props) {
        this.setState({rankingSectionList: []}, () => {this.renderRankingSectionList(props)});
    }

    deleteRankingSection(e) {
        RankingSectionAPI.delete_rankingSection(this.props.course_id, this.props.leaderboard_id, e.target.id).then((res) => {
            if (res.status === "success"){
                this.setSuccessMessage(res.message);
                this.props.retrieveLeaderboard(this.props.course_id, this.props.leaderboard_id);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    renderRankingSectionList(props) {
        for(var i = 0; i < props.rankingSections.length; i++) {
            var rankingSection = (
                <Table.Row key={i}>
                    <Table.Cell width={14}>
                        {props.rankingSections[i].name}
                    </Table.Cell>
                    <Table.Cell width={2}>
                        <Icon
                            name="delete"
                            size="large"
                            className="cursor-pointer maroon-hover icon-red"
                            id={props.rankingSections[i].id}
                            onClick={this.deleteRankingSection.bind(this)}
                        />
                    </Table.Cell>
                </Table.Row>
            )

            this.state.rankingSectionList.push(rankingSection);
        }

        this.forceUpdate();
    }

    render() {
        return (
            <Modal
                closeIcon
                onClose= {this.closeModal}
                size="tiny"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button onClick={this.openModal} floated="right"><Icon name="tasks"/>Assessment Section</Button>}
            >
                <Modal.Header>
                    Assessment Sections
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Assessment Section Name</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.rankingSectionList}
                        </Table.Body>
                    </Table>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red"> {this.state.errorMessage}</Label> : ""}
                    {this.state.successMessage ? <Label basic color="green"> {this.state.successMessage}</Label> : ""}
                    <InsertRankingSectionModal leaderboard_id={this.props.leaderboard_id} course_id={this.props.course_id} retrieveLeaderboard={this.props.retrieveLeaderboard.bind(this)} />
                </Modal.Actions>
            </Modal>
        )
    }
}