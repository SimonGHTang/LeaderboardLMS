import React from "react";
import {Modal, Button, Image, Header, Segment} from "semantic-ui-react/dist/commonjs";

import UserPopupInfo from "../popups/user-popup-info";
import UserProfileUpdateModal from "./user-profile-update-modal";

export default class UserProfileModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal:false
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    signout() {
        this.props.signout();
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                size="small"
                open={this.state.modal}
                trigger=
                {
                    <div onClick={this.openModal}>
                        <UserPopupInfo user={this.props.user} />
                    </div>
                }
            >
                <Modal.Header>{(this.props.user.username) ? this.props.user.username + "'s" : "Your" } Profile</Modal.Header>
                <Modal.Content image>
                    <Image
                        wrapped
                        size="small"
                        src={this.props.user.profilePictureLink}
                        bordered={true}
                    />
                    <Modal.Description style={{width: "65%"}}>
                        <Segment>
                            <Header>Email</Header>
                            <p>{this.props.user.email}</p>
                            <Header>Username</Header>
                            <p>{this.props.user.username}</p>
                        </Segment>

                        <Segment>
                            <Header>Audit</Header>
                            <p>Profile created: <i>{this.props.user.created_at.substring(0, 10) + " " + this.props.user.created_at.substring(11, 19)}</i></p>
                            <p>Profile updated: <i>{this.props.user.created_at.substring(0, 10) + " " + this.props.user.created_at.substring(11, 19)}</i></p>
                            <p>User ID: <i>{this.props.user.id}</i></p>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" floated="left" onClick={this.signout.bind(this)}>Sign out</Button>
                    <UserProfileUpdateModal user={this.props.user} loadUser={this.props.loadUser} loadCourses={this.props.loadCourses} />
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>        
        );
    }
}