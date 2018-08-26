import React from "react";
import {Modal, Button, Label, Form, TextArea, Icon} from "semantic-ui-react"

import LeaderboardAPI from "../../../services/leaderboard-services";

export default class UpdateLeaderboardModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
            description: "",
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

    updateDescription(e) {
        this.setState({description: e.target.value});
    }

    updateWeighting(e) {
        this.setState({weighting: e.target.value});
    }

    updateLeaderboard() {
        if(!this.state.name) {
            this.setState({errorMessage: "Your leaderboard needs a name" });
            return;
        }

        let leaderboardInfo = {
            name: this.state.name,
            description: this.state.description,
            weighting: this.state.weighting
        };

        LeaderboardAPI.post_leaderboard(this.props.course_id, this.props.leaderboard.id, leaderboardInfo).then((res) => {
            if(res.status === "success") {
                this.setSuccessMessage(res.message);
                setTimeout(this.props.retrieveLeaderboard(this.props.course_id, this.props.leaderboard.id), 2000)
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    componentWillMount(){
        this.setState({name: this.props.leaderboard.name});
        this.setState({description: this.props.leaderboard.description ? this.props.leaderboard.description : ""});
        this.setState({weighting: this.props.leaderboard.weighting ? this.props.leaderboard.weighting : ""});
    }

    componentWillReceiveProps(props) {
        this.setState({name: props.leaderboard.name});
        this.setState({description: props.leaderboard.description ? props.leaderboard.description : ""});
        this.setState({weighting: props.leaderboard.weighting ? props.leaderboard.weighting : ""});
    }

    render() {
        return (
            <Modal 
                closeIcon
                onClose={this.closeModal}
                size="small"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button floated="left" onClick={this.openModal}><Icon name="edit"/>Edit Leaderboard</Button>}
            >
                <Modal.Header>
                    Update Leaderboard
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={14} label="Name:" onChange={this.updateName.bind(this)} value={this.state.name} />
                                <Form.Input width={2} label="weighting:" onChange={this.updateWeighting.bind(this)} value={this.state.weighting} />
                            </Form.Group>
                            <Form.Field>
                                <Label>Description: </Label>
                                <TextArea onChange={this.updateDescription.bind(this)} value={this.state.description}/>
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right"> {this.state.errorMessage}</Label> : ""}
                    {this.state.successMessage ? <Label basic color="green" pointing="right"> {this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.updateLeaderboard.bind(this)}>Save</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}