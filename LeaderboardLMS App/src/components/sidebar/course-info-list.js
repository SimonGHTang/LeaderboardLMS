import React from "react";
import {Menu, Icon} from "semantic-ui-react";

import CourseModal from "./modals/course-modal";
import AdminListModal from "./modals/admin-list-modal";
import StudentListModal from "./modals/student-list-modal";
import InvitationListModal from "./modals/invitation-list-modal";

export default class CourseInfoList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            hideCourseInfoList: false,
            courseInfoList: []
        }
    }

    toggleCourseInfoListDisplay() {
        this.setState({hideCourseInfoList: !this.state.hideCourseInfoList});
    }

    render() {
        return(
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleCourseInfoListDisplay.bind(this)}><Icon name="chevron right"/> COURSE INFO <Icon disabled name="newspaper"/></div>
                <br/>
                <div className={(this.state.hideCourseInfoList || this.props.course_id === 0 ) ? "void" : ""}>
                    <CourseModal course_id={this.props.course_id}/>
                    <AdminListModal course_id={this.props.course_id}/>
                    <StudentListModal course_id={this.props.course_id}/>
                    <InvitationListModal course_id={this.props.course_id}/>
                </div>
            </Menu.Item>
        );
    }
}