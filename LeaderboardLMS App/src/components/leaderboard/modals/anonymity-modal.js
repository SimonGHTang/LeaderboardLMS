import React from "react"
import {Modal, Button, Grid, Label, Icon} from "semantic-ui-react"

import AnonymityAPI from "../../../services/student-anonymity-settings-services"

export default class AnonymityModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            revealLeaderboardName: false,
            revealRankingSections: false,
            revealMark: false,
            errorMessage: "",
            successMessage: ""
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

    componentWillMount(){
        this.setState({revealLeaderboardName: this.props.Anonymity.revealLeaderboardName});
        this.setState({revealRankingSections: this.props.Anonymity.revealRankingSections});
    }

    componentWillReceiveProps(newProps){
        this.setState({revealLeaderboardName: newProps.Anonymity.revealLeaderboardName});
        this.setState({revealRankingSections: newProps.Anonymity.revealRankingSections});
    }

    toggleLeaderboardName() {
        this.setState({revealLeaderboardName: !this.state.revealLeaderboardName});
    }

    toggleRankingSections() {
        this.setState({revealRankingSections: !this.state.revealRankingSections});
    }

    toggleMark() {
        this.state({revealMark: !this.state.revealMark });
    }

    save() {
        let studentAnonmymitySettingsInfo = {
            revealLeaderboardName: this.state.revealLeaderboardName,
            revealRankingSections: this.state.revealRankingSections
        };

        AnonymityAPI.post_studentAnonymitySettings(this.props.course_id, this.props.ranking_id, studentAnonmymitySettingsInfo).then((res) => {
            if(res.status === "success") {
                this.setSuccessMessage(res.message);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render() {
        return(
            <Modal
                onClose={this.closeModal}
                size="tiny"
                open={this.state.modal}
                trigger={
                    <Icon name="hide" className="icon-blue teal-hover cursor-pointer" size="large" onClick={this.openModal}/>
                }
            >
                <Modal.Header>Anonymity settings</Modal.Header>
                <Modal.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={2} />
                            <Grid.Column width={14} >
                                <Button.Group>
                                    <Button style={{width: "210px"}}>Reveal Leaderboard Name</Button>
                                    <Button color={!this.state.revealLeaderboardName ? "teal" : "red"} onClick={this.toggleLeaderboardName.bind(this)}>Reveal Name? </Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}/>
                            <Grid.Column width={14}>
                                <Button.Group>
                                    <Button style={{width:"210px"}}>Reveal Ranking Sections</Button>
                                    <Button color={!this.state.revealRankingSections ? "teal" : "red"} onClick={this.toggleRankingSections.bind(this)}>Reveal Ranking Section? </Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right"> {this.state.errorMessage}</Label> : ""}
                    {this.state.successMessage ? <Label basic color="green" pointing="right"> {this.state.successMessage}</Label>  : "" }
                    <Button onClick={this.save.bind(this)} primary> Save </Button>
                    <Button onClick={this.closeModal}> Close </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}