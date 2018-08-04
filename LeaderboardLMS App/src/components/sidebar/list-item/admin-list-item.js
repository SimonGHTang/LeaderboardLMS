import React from "react";
import { Image, Segment, Grid, Icon, Transition} from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";

export default class AdminListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: true,
            animation: "fade",
            duration: 200
        }
    }

    setUserAsStudent() {
        CourseAPI.post_setUserAsStudent(this.props.course_id, this.props.user.user_id).then((res) => {
            if(res.status === "success") {
                this.setState({visiblity: !this.state.visibility});
                this.props.setSuccessMessage(res.message);
            } else {
                this.props.setErrorMessage(res.message);
            }
        });
    }

    render() {
        return(
            <Transition
                animation={this.state.animation}
                duration={this.state.duration}
                visible={this.state.visiblity}
            >
                <div className="div-avatar-list">
                    <Segment>
                        <Grid columns={3} divided>
                            <Grid.Column width={7}>
                                <Image
                                    src={this.props.user.profilePictureLink}
                                    avatar
                                    width="50px"
                                    height="50px"
                                    className="avatar-list"
                                />
                                <span> {this.props.user.username ? this.props.user.username : this.props.user.email}</span>
                            </Grid.Column>
                            <Grid.Column className="avatar-list-text-padding" width={7}>
                                <span>Joined: <i>{this.props.user.Roles.created_at.substring(0, 10) + " " + this.props.user.Roles.created_at.substring(11, 19)} </i> </span>
                            </Grid.Column>
                            <Grid.Column width={2} className="avatar-list-text-padding">
                                <span><Icon name="toggle down" size="large" className="cursor-pointer icon-red maroon-hover" onClick={this.setUserAsStudent.bind(this)} /></span>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>
            </Transition>
        );
    }
}