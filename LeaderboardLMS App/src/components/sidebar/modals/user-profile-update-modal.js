import React from "react";
import {Modal, Button, Image, Header, Label, Form, Input, Segment} from "semantic-ui-react";

import UserAPI from "../../../services/user-services";

export default class UserProfileUpdateModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            email: this.props.user.email,
            username: this.props.user.username,
            profilePictureLink: this.props.user.profilePictureLink,
            successMessage: "",
            errorMessage: ""
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({sucessMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    updateEmail(e) {
        this.setState({email: e.target.value});
    }

    updateUsername(e) {
        this.setState({username: e.target.value});
    }

    updateProfilePictureLink(e) {
        this.setState({profilePictureLink: e.target.value});
    }

    updateUser() {
        var userInfo = {
            email: this.state.email,
            username: this.state.username,
            profilePictureLink: this.state.profilePictureLink
        }

        UserAPI.post_updateUser(this.props.user.id, userInfo).then((res) => {
            if(res.status === "success") {
                this.setState({successMessage: res.message});
                setTimeout(function(){ this.props.loadUser(); }.bind(this), 500);
                setTimeout(function(){ this.props.loadCourses(); }.bind(this), 1000);
            } else if (res.status === "fail") {
                this.setState({ errorMessage: res.message});
            }
        });
    }

    render() {
        return(
            <Modal
                closeIcon
                size="small"
                dimmer={false}
                trigger={<Button primary onClick={this.openModal}> Edit </Button>}
            >
                <Modal.Header>
                    {(this.props.user.username) ? this.props.user.username + "'s" : "Your" } Profile
                </Modal.Header>

                <Modal.Content image>
                    <Image
                        bordered={true}
                        wrapped
                        size="medium"
                        src={this.state.profilePictureLink}
                    />

                    <Modal.Description style={{width: "50%"}}>
                        <Segment>
                            <Header>Edit your user profile here:</Header>
                        </Segment>
                        <Segment>
                            <Form>
                                <Form.Field width="16">
                                    <Label>Email:</Label>
                                    <Input onChange={this.updateEmail.bind(this)} value={this.state.email} />
                                </Form.Field>
                                <Form.Field width="16">
                                    <Label>Username:</Label>
                                    <Input onChange={this.updateUsername.bind(this)} value={this.state.username} />
                                </Form.Field>
                                <Form.Field width="16">
                                    <Label>Profile Picture:</Label>
                                    <Input onChange={this.updateProfilePictureLink.bind(this)} value={this.state.profilePictureLink} />
                                </Form.Field>
                            </Form>
                            <br/>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : "" }
                    <Button primary onClick={this.updateUser.bind(this)}>Save</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
