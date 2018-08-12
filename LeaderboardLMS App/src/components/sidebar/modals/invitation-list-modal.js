import React from "react";
import {Modal, Button, Label, Menu} from "semantic-ui-react";

import InvitationAPI from "../../../services/invitation-services";
import InvitationListItem from "../list-item/invitation-list-item";

export default class InvitationListModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            invitationsList: [],
            errorMessage: "",
            successMessage: ""
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessasge: ""});
        this.setState({errorMessage: ""});
        this.getInvitationList(this.props.course_id);
    };

    closeModal = () => this.setState({modal: false});

    setErrorMessage(m) {
        this.setState({successMessage: ""});
        this.setState({errorMessage: m});
    }

    setSuccessMessage(m) {
        this.setState({successMessage: m});
        this.setState({errorMessage: ""});
    }

    componentWillReceiveProps(props){
        if (props.course_id === 0){ return; }
        this.getInvitationList(props.course_id);
    }

    getInvitationList(course_id) {
        this.state.invitationsList = [];
        InvitationAPI.get_invitations(course_id).then((res) => {
            if(res.status === "success") {
                for(var i = 0; i < res.payload.length; i++) {
                    let invitation = (
                        <InvitationListItem
                            invitation={res.payload[i]}
                            course_id={course_id}
                            key={i}
                            setErrorMessage={this.setErrorMessage.bind(this)}
                            setSuccessMessage={this.setSuccessMessage.bind(this)}
                        />
                    )
                    this.state.invitationsList.push(invitation);
                }

                this.forceUpdate();
            } else {
                this.setState({errorMessage: res.message});
            }
        });
    }

    putInvitation() {
        InvitationAPI.put_invitation(this.props.course_id).then((res) => {
            if(res.status === "success") {
                this.setState({errorMessage: ""});
                this.setState({successMessage: res.message});
                this.getInvitationList(this.props.course_id);
            } else {
                this.setState({errorMessage: res.message});
                this.setState({successMessage: ""});
            }
        });
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                size="small"
                open={this.state.modal}
                trigger={
                    <Menu.Item className="course-info-menu" onClick={this.openModal}>
                        Invitations
                    </Menu.Item>
                }
            >
                <Modal.Header>Course Invitations</Modal.Header>
                <Modal.Content>
                    {this.state.invitationsList}
                </Modal.Content>

                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green">{this.state.successMessage}</Label> : ""}
                    <Button onClick={this.putInvitation.bind(this)} primary>Generate Invitation </Button>
                    <Button onClick={this.closeModal}> Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}