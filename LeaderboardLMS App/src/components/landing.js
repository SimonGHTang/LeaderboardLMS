import React from "react";
import {Sidebar, Menu, Input, Divider} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";

import AuthAPI from "../services/authentication-services";

import CourseList from "./sidebar/course-list";
import CourseInfoList from "./sidebar/course-info-list";

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            course_id: 0
        };
    }

    signout() {
        AuthAPI.get_signout().then((res) => {
            if(res.status === "success") {
                this.props.history.replace('/');
                let message = "Signed out from Leaderboard LMS. See you later, check back soon!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
        });
    }

    loadUser() {
        AuthAPI.get_currentUser().then((res) => {
            if(res.status !== "success") {
                this.props.history.replace('/');
                let message = "You're not signed in on Leaderboard LMS, you need to sign in.";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
            this.setState({ user: res.payload });
        });
    }

    selectLeaderboard(i) {
        this.props.history.replace("/landing/leaderboard/" + i);
    }

    selectCourse(i) {
        this.setState({course_id: i});
    }

    componentWillMount() {
        this.loadUser();
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar as={Menu} visible={true} icon="labeled" vertical inverted>
                        {this.state.user.email ? <CourseList user={this.state.user} signout={this.signout.bind(this)} loadUser={this.loadUser.bind(this)} selectCourse={this.selectCourse.bind(this)} /> : <Menu.Item>loading...</Menu.Item>}
                    </Sidebar>
                    <Sidebar.Pusher className="main">
                        <Sidebar as={Menu} visible={true} icon="labeled" className="course-menu" vertical inverted>
                            <Menu inverted vertical className="course-menu">
                                <Divider/>
                                <Menu.Item >
                                    <Input placeholder="Search..." />
                                </Menu.Item>
                                <Divider/>
                                <Divider/>
                                    <CourseInfoList course_id={this.state.course_id} />
                                <Divider/>
                            </Menu>
                        </Sidebar>

                        <Sidebar.Pusher style={{height: "100vh", width:"80%" }}>
                            <Switch>
                                
                            </Switch>
                        </Sidebar.Pusher>
                    
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}