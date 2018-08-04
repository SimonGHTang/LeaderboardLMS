import React from "react";
import {Modal, Menu, Button, Image, Header, Segment} from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";
import CourseUpdateModal from "./course-update-modal";
import DeleteCourseModal from "./delete-course-modal";

export default class CourseModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            loading: true,
            course: null,
            name: "Loading...",
            description: "",
            coordinator: "",
            pictureLink: "https://image.freepik.com/free-icon/electronic-circular-printed-circuit_318-50817.jpg",
            allowInvitations: "",
            created_at: "",
            updated_at: ""
        }
    }

    openModal = () => {
    this.setState({modal: true});
    this.setState({successMessage: ""});
    this.setState({errorMessage: ""});
    }

    closeModal = () => this.setState({modal: false});

    getCourse(course_id) {
        CourseAPI.get_course(course_id).then((res) => {
            if(res.status === "success") {
                this.setState({course: res.payload});
                this.setState({name: res.payload.name});
                this.setState({description: res.payload.description});
                this.setState({coordinator: res.payload.coordinator});
                this.setState({pictureLink: res.payload.pictureLink});
                this.setState({allowInvitations: res.payload.allowInvitations});
                this.setState({created_at: res.payload.created_at});
                this.setState({updated_at: res.payload.updated_at});
                this.setState({loading: false});
            }
        });
    }

    componentWillMount() {
        if(this.props.course_id === 0) { return; }
        this.getCourse(this.props.course_id);
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0) { return; }
        this.getCourse(props.course_id);
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                size="small"
                open={this.state.modal}
                trigger=
                {
                    <Menu.Item className="course-info-menu" onClick={this.openModal}>
                        Course Details
                    </Menu.Item>
                }
            >

                <Modal.Header>Course Details</Modal.Header>
                <Modal.Content image>
                    <Image
                        src={this.state.pictureLink}
                        height="300px"
                        width="300px"
                        bordered={true}
                    />
                    <Modal.Description style={{width: "65%"}}>
                        <Segment loading={this.state.loading}>
                            <Header>Name</Header>
                            <p>{this.state.name}</p>
                            <Header>Description</Header>
                            <p>{this.state.description}</p>
                            <Header>Coordinator</Header>
                            <p>{this.state.coordinator}</p>
                        </Segment>
                    
                        <Segment>
                            <b>Course Icon Link:</b><p className="img-link">{this.state.pictureLink}</p>
                            <p><b>Allow Invitations</b> {this.state.allowInvitations.toString().toUpperCase()}</p>
                        </Segment>
                        
                        <Segment loading={this.state.loading}>
                            <Header>Audit</Header>
                            <p>Course created: <i>{this.state.created_at.substring(0, 10) + " " + this.state.created_at.substring(11, 19)}</i></p>
                            <p>Course updated: <i>{this.state.updated_at.substring(0, 10) + " " + this.state.updated_at.substring(11, 19)}</i></p>
                            <p>Course ID: <i> {this.props.course_id}</i></p>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <DeleteCourseModal course_id={this.props.course_id} course={this.state.course}/>
                    <CourseUpdateModal course_id={this.props.course_id} course={this.state.course} closeModal={this.closeModal} />
                    <Button onClick={this.closeModal} >Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
};



