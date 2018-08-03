import React from "react";
import {Modal, Button, Image, Label, Icon, Form, Input, Checkbox} from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";

export default class CourseInsertModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            name: "",
            coordinator: "",
            description: "",
            pictureLink: "",
            defaultPictureLink: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/book-icon.png",
            allowInvitations: false
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({errorMessage: ""});
        this.setState({successMessage: ""});
    };

    closeModal = () => this.setState({modal:false});

    updateName(e){
        this.setState({name: e.target.value});
    }

    updateCoordinator(e){
        this.setState({coordinator: e.target.value});
    }

    updateDescription(e){
        this.setState({description: e.target.value});
    }

    updatePictureLink(e){
        this.setState({pictureLink: e.target.value});
    }

    updateAllowInvitations(e){
        this.setState({allowInvitations: !this.state.allowInvitations});
    }

    async insertCourse(){
        if(!this.state.name) {
            this.setState({errorMessage: "You need to set a course name"});
            return;
        };

        if(!this.state.pictureLink) {
            await this.setState({pictureLink: "https://image.freepik.com/free-icon/electronic-circular-printed-circuit_318-50817.jpg"});
        };

        var courseInfo = {
            name: this.state.name,
            coordinator: this.state.coordinator,
            description: this.state.description,
            pictureLink: this.state.pictureLink,
        };

        CourseAPI.put_course(courseInfo).then((res) => {
            if(res.status === "success") {
                let message = "New course server ready to go!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });

                //race condition, the get course retrices courses faster than the new one can be inserted.
                setTimeout(function() {this.props.loadCourses()}.bind(this), 1000);
            } else {
                let message = res.message;
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 6000});
            }

            this.closeModal();
        });
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                closeIcon
                size="small"
                open={this.state.modal}
                trigger={<Icon className="add-course-icon" name="add square" style={{cursor: "pointer"}} onClick={this.openModal}/> }
            >
                <Modal.Header>
                    Create New Course
                </Modal.Header>
                <Modal.Content image>
                    <Image
                        bordered={true}
                        wrapped
                        size="small"
                        src={!this.state.pictureLink ? this.state.defaultPictureLink : this.state.pictureLink}
                    />

                    <Modal.Description style={{width: "70%"}}>
                        <Form>
                            <Form.Field width="16">
                                <Label>Name:</Label>
                                <Input onChange={this.updateName.bind(this)} value={this.state.name} placeholder="Name of your new course"/>
                            </Form.Field>
                            <Form.Field width="16">
                                <Label>Coordinator:</Label>
                                <Form.TextArea rows="7" onChange={this.updateCoordinator.bind(this)} value={this.state.coordinator} placeholder="Name of the coordinator for your new course"/>
                            </Form.Field>
                            <Form.Field width="16">
                                <Label>Description:</Label>
                                <Input onChange={this.updateDescription.bind(this)} value={this.state.description} placeholder="Description of your new course"/>
                            </Form.Field>
                            <Form.Field width="16">
                                <Label>Icon Link:</Label>
                                <Input onChange={this.updatePictureLink.bind(this)} value={this.state.pictureLink} placeholder="Link to icon picture for your course"/>
                            </Form.Field>
                            <Form.Group>
                                <Form.Field onChange = {this.updateAllowInvitations.bind(this)} controll={Checkbox} label="Allow Invitations"/>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic corlor="red" pointing="right">{this.state.errorMessage}</Label> : ""}
                    <Button primary onClick={this.insertCourse.bind(this)}>Create</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}