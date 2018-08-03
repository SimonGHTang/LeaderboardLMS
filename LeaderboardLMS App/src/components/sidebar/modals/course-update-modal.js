import React from "react";
import {Modal, Button, Image, Label, Form, Input, Checkbox, Segment} from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";

export default class CourseUpdateModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
            description: "",
            coordinator: "",
            pictureLink: "https://image.freepik.com/free-icon/electronic-circular-printed-circuit_318-50817.jpg",
            allowInvitations: false
        }
    }

    openModal = () => {
        this.setState({modal: true });
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => {
        this.setState({modal: false});
    }

    updateName(e){
        this.setState({name: e.target.value});
    }

    updateDescription(e){
        this.setState({description: e.target.value});
    }

    updateCoordinator(e){
        this.setState({coordinator: e.target.value});
    }

    updatePictureLink(e){
        this.setState({pictureLink: e.target.value});
    }

    updateAllowInvitations(e){
        this.setState({allowInvitations: e.target.value});
    }

    updateCourse() {
        if(!this.state.name) {
            this.setState({errorMessage: "Your course needs a name"});
            this.setState({successMessage: ""});
            return;
        }

        var courseInfo = {
            name: this.state.name,
            description: this.state.description,
            coordinator: this.state.coordinator,
            pictureLink: this.state.pictureLink,
            allowInvitations: this.state.allowInvitations
        }

        CourseAPI.post_updateCourse(this.props.course.id, courseInfo).then((res) => {
            if (res.status === "success") {
                this.setState({errorMessage: ""});
                this.setState({successMessage: res.message});
            } else if (res.status === "fail") {
                this.setState({errorMessage: res.message});
            }
        });
    }

    componentDidMount() {
        this.setState({name: this.props.course.name});
        this.setState({description: this.props.course.description});
        this.setState({coordinator: this.props.course.coordinator});
        this.setState({pictureLink: this.props.course.pictureLink});
        this.setState({allowInvitations: this.props.course.allowInvitations});
    }

    render() {
        return (
            <Modal
            closeIcon
            onClose={this.closeModal}
            size="large"
            dimmer={false}
            open={this.state.modal}
            trigger={<Button primary onClick={this.openModal}>Edit</Button>}
            >
                <Modal.Header>
                    Update Course Details
                </Modal.Header>
                <Modal.Content image>
                    <Image
                        bordered={true}
                        height="300px"
                        width="300px"
                        src={this.state.pictureLink}
                    />

                    <Modal.Description style={{width: "65%"}}>
                        <Segment>
                            <Form>
                                <Form.Field width="16">
                                    <Label>Name:</Label>
                                    <Input onChange={this.updateName.bind(this)} value={this.state.name} />
                                </Form.Field>
                                <Form.Field width="16">
                                    <Label>Coordinator:</Label>
                                    <Input onChange={this.updateCoordinator.bind(this)} value={this.state.coordinator} />
                                </Form.Field>
                                <Form.Field width="16">
                                    <Label>description:</Label>
                                    <Form.TextArea rows="9" onChange={this.updateDescription.bind(this)} value={this.state.description} />
                                </Form.Field>
                                <Form.Field width="16">
                                    <Label>Icon Link:</Label>
                                    <Input onChange={this.updatePictureLink.bind(this)} value={this.state.pictureLink} />
                                </Form.Field>
                                <Form.Group>
                                    <Form.Field onChange={this.updateAllowInvitations.bind(this)} control={Checkbox} label="Allow Invitations"/>
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : "" }
                    <Button primary onClick={this.updateCourse.bind(this)}>Save</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}