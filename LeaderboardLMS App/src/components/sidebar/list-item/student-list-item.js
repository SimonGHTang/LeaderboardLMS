import React from "react";
import { Image, Segment, Grid, Icon, Transition } from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";

export default class StudentListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: true,
            animation: "fade",
            duration: 200
        }
    }

    setUserAsAdmin(){
        CourseAPI.post_setUserAsAdmin(this.props.course_id, this.props.user.user_id).then((res) => {
            if(res.status === "success") {
                this.setState({visibility: !this.state.visibility});
                this.props.setSuccessMessage(res.message);
            } else {
                this.props.setErrorMessage(res.message);
            }
        });
    }

    kickUser() {
        CourseAPI.delete_kickUser(this.props.course_id, this.props.user.user_id).then((res) => {
            if (res.status === "success") {
                this.setState({visibility: !this.state.visibility});
                this.props.setSuccessMessage(res.message);
            } else {
                this.props.setErrorMessage(res.message);
            }
        });
    }

    render() {
        return (
            <Transition
                animation={this.state.animation}
                duration={this.state.duration}
                visible={this.state.visibility}
            >
                <div className="div-avatar-list">
                    <Segment>
                        <Grid columns={3} divided>
                            <Grid.Column width={8}>
                                <Image
                                    src={this.props.user.profilePictureLink}
                                    avatar
                                    width="50px"
                                    height="50px"
                                    className="avatar-list"
                                />
                                <span> {this.props.user.username ? this.props.user.username  :this.props.user.email} </span>
                            </Grid.Column>
                            <Grid.Column className="avatar-list-text-padding" width={5}>
                                <span>Joined: <i>{this.props.user.Roles.created_at.substring(0, 10) + " " + this.props.user.Roles.created_at.substring(11, 19)}</i></span>
                            </Grid.Column>
                            <Grid.Column width={3} className="avatar-list-text-padding">
                                <span> <Icon name="toggle up" size="large" className="cursor-pointer teal-hover icon-blue" onClick={this.setUserAsAdmin.bind(this)} /> </span>
                                <span> <Icon name="delete" size="large" className="cursor-pointer maroon-hover icon-red" onClick={this.kickUser.bind(this)} /> </span>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>
            </Transition>
        );
    }
}