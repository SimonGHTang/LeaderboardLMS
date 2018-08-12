import React from "react";
import {Modal, Button, Label, Form, Menu} from "semantic-ui-react";

import LeaderboardAPI from "../../../services/leaderboard-services";

export default class InsertLeaderboardModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
            blurb: "",
            weighting: 0
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
        this.setState({name: e.target.value});
    }

    updateBlurb(e) {
        this.setState({blurb: e.target.value});
    }

    updateWeighting(e) {
        this.setState({weighting: e.target.value});
    }

    insertLeaderboard(){
        if(!this.state.name) {
            this.setState({errorMessage: "Your leaderboard needs a name"});
            return;
        }


        let leaderboardInfo = {
            name: this.state.name,
            blurb: this.state.blurb,
            weighting: this.state.weighting
        };

        LeaderboardAPI.put_leaderboard(this.props.course_id, leaderboardInfo).then((res) => {
            if(res.status === "success") {
                this.setSuccessMessage(res.message);
                this.closeModal();
                this.props.getLeaderboardList(this.props);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                closeIcon
                size="small"
                open={this.state.modal}
                trigger={<Menu.Item className="leaderboard-menu" onClick={this.openModal}> <i>Add Leaderboard</i></Menu.Item>}
            >
                <Modal.Header>
                    Create New Leaderboard
                </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={13} label="Name:" onChange={this.updateName.bind(this)} value={this.state.name} placeholder="Name of your new leaderboard/assessment"/>
                                <Form.Input width={3} label="Weighting:" onChange={this.updateWeighting.bind(this)} value={this.state.weighting} placeholder="Weighting of your new assessment"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea width={16} label="Description:" onChange={this.updateBlurb.bind(this)} value={this.state.blurb} placeholder="Description of your new leaderboard"/>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.successMessage ? <Label basic color="green" pointing="right"> {this.state.successMessage}</Label> : ""}
                    {this.state.errorMessage ? <Label basic color="red" pointing="right"> {this.state.errorMessage}</Label> : ""}
                    <Button primary onClick={this.insertLeaderboard.bind(this)}>Create</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}