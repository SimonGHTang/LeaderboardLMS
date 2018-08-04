import React from "react";
import {Modal, Menu, Button, Label}  from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";
import AdminListItem from "../list-item/admin-list-item";

export default class AdminListModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            courseName: "",
            adminsList: [],
            errorMessage: "",
            successMesssage: ""
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
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

    getAdminList(course_id) {
        this.state.adminsList = [];
        CourseAPI.get_CourseIncludingAdmins(course_id).then((res) => {
            if(res.status === "success") {
                this.setState({courseName: res.payload[0].name})

                for(var i = 0; i < res.payload[0].Users.length; i++) {
                    let admin = (
                        <AdminListItem
                            user={res.payload[0].Users[i]}
                            course_id={res.payload[0].id}
                            key={i}
                            setErrorMessage={this.setErrorMessage.bind(this)}
                            setSuccessMessage={this.setErrorMessage.bind(this)}
                        />
                    )
                    this.state.adminsList.push(admin);
                }

                this.forceUpdate();
            } else {
                let message = res.message;
                window.alert.error(message, {position: "top", effort: "stackslide", timeout: 2000});
                this.closeModal();
            }
        });
    }

    componentWillMount() {
        if(this.props.course_id === 0){ return; }
        this.getAdminList(this.props.course_id);
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0){ return; }
        this.getAdminList(props.course_id);
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                size="tiny"
                open={this.state.modal}
                trigger={
                    <Menu.Item className="course-info-menu" onClick={this.openModal}>
                        Admins
                    </Menu.Item>
                }
            >
                <Modal.Header>Admins of {this.state.courseName}</Modal.Header>
                <Modal.Content>
                    {this.state.adminsList}
                </Modal.Content>

                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMesssage ? <Label basic color="green">{this.state.successMesssage}</Label> : "" }
                    <Button onClick={this.closeModal} >Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}