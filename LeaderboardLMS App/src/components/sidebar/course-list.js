import React from "react";
import{Image, Menu, Divider} from "semantic-ui-react/dist/commonjs";

import UserProfileModal from "./modals/user-profile-modal";
import CourseInsertModal from "./modals/course-insert-modal";
import UserAPI from "../../services/user-services";
import CoursePopupInfo from "./popups/course-popup-info";

export default class CourseList extends React.Component {
    constructor(props) {
        super();

        this.state = {
            selectedCourse: 0,
            menuList: [],
            courseList: []
        }
    }

    signout() {
        this.props.signout();
    }

    selectCourse(e) {
        this.setState({ selectedCourse: e.currentTarget.id}, this.loadCourses());
        this.props.selectCourse(e.currentTarget.id);
    }

    loadMenu() {
        this.state.menuList.push(
            <div key={-1}>
                <Menu.Item>
                    <UserProfileModal
                        user={this.props.user}
                        signout={this.signout.bind(this)}
                        loadUser={this.props.loadUser}
                        loadCourses={this.loadCourses.bind(this)}
                    />
                </Menu.Item>
            </div>
        );

        this.state.menuList.push(
            <div key={-2}>
                <Menu.Item>
                    <Image
                        src="http://xycletracx.nl/images/1784.jpg"
                        width="60px"
                        height="5px"
                    />
                </Menu.Item>
            </div>
        );
    }

    loadCourses() {
        this.state.courseList = [];
        this.state.menuList = [];
        // await this.setStateAsync({courseList: [] });
        // await this.setStateAsync({menuList: [] });

        this.loadMenu();
        this.state.courseList = this.state.menuList;
        // await this.setStateAsync({courseList: this.state.menuList});

        UserAPI.get_userIncludingCourses(this.props.user.id).then((res) => {
            for(var i = 0; i < res.payload.Courses.length; i++) {
                let courseIcon = (
                    <div key={i} onClick={this.selectCourse.bind(this)} id={res.payload.Courses[i].id} className={this.state.selectedCourse === res.payload.Courses[i].id ? "selected-course" : ""}>
                        <Menu.Item>
                            <CoursePopupInfo course={res.payload.Courses[i]} />
                        </Menu.Item>
                    </div>
                );

                this.state.courseList.push(courseIcon);
            }

            this.state.courseList.push(
                <div key={res.payload.Courses.length + 1}>
                    <Divider/>
                        <CourseInsertModal loadCourses={this.loadCourses.bind(this)}/>
                    <Divider/>
                </div>
            )

            this.forceUpdate();
        });
    }

    componentWillMount() {
        this.loadMenu();
        this.loadCourses();
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    render() {
        return (
            <div>
                {this.state.courseList}
            </div>
        );
    }
}