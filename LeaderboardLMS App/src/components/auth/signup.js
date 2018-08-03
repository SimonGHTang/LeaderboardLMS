import React from "react";
import {Button, Image, Icon, Form} from "semantic-ui-react/dist/commonjs";

import AuthAPI from "../../services/authentication-services";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invitationValidity: true,
            signupComplete: false,
            email: "",
            password: "",
            passwordCheck: ""
        }
    }

    loadUser() {
        AuthAPI.get_currentUser().then((res) => {
            if(res.status === "success") {
                var invitation = this.props.match.params.invitation;
                let signupInfo = {
                    email: res.payload.email,
                    password: "asdf"
                };

                AuthAPI.put_signup(signupInfo, invitation).then((res) => {
                    if(res.status === "success") {
                        let message = "You've successfully registered to a new course!";
                        window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });

                        this.setState({ signupComplete: true });
                        setTimeout(function() { this.props.history.replace("/landing"); }.bind(this), 4000);
                    } else if (res.status === "fail") {
                        let message  = "You are already registered to this course";
                        window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });
                    }
                });
            }
        });
    }

    signin() {
        this.props.history.replace('/');
    }

    signup() {
        if(this.state.password !== this.state.passwordCheck) {
            let message = "The passwords you have entered do not match";
            window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
            return;
        }

        let signupInfo = {
            email: this.state.email,
            password: this.state.password
        }

        var invitation = this.props.match.params.invitation;
        AuthAPI.put_signup(signupInfo, invitation).then((res) => {
            if(res.status === "success") {
                let message = "Successfully registered and signed in - welcome to LeaderboardLMS!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });

                this.setState({  signupComplete: true });
                setTimeout(function() { this.props.history.replace("/landing"); }.bind(this), 4000 );
            } else if (res.status === "fail") {
                let message = "That email is already taken.";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
            } else {
                let message = "There was an issue with signing up."
                window.Alert.error(message, { position: "top", effect: "stackslide", timeout: 4000 });
            }
        });
    }

    updateEmail(e) {
        this.setState({ email: e.target.value});
    }

    updatePassword(e) {
        this.setState({ password: e.target.value});
    }

    updatePasswordCheck(e) {
        this.setState({ passwordCheck: e.target.value});
    }

    componentWillMount() {
        this.loadUser();
    }

    componentDidMount() {
        var invitation = this.props.match.params.invitation;
        if (!invitation) {
            let message = "No invitation link provided.";
            window.Alert.error( message, {position: "top", effect: "stackslide", timeout: 4000 });
            this.setState({ invitationValidity: false });
            return;
        }
        AuthAPI.get_signup(invitation).then((res) => {
            if(res.status === "success") {
                let message = "You have been invited to join an academic server in LeaderboardLMS. You will need to sign up first.";
                window.Alert.success( message, {position: "top", effect: "stackslide", timeout: 4000 });
                this.setState({ invitationValidity: true })
                return;
            } else if (res.status === "fail") {
                let message = "This invitation is not valid. It may have been deleted or expired.";
                window.Alert.error( message, {position: "top", effect: "stackslide", timeout: 4000 });
                this.setState({ invitationValidity: false })
                return;
            }
        });
    }

    render() {
        return (
            <div className="text-centre">
                <div className={(this.state.signupComplete) ? "appear intro-signup" : "disappear intro-signup"}>
                    <Icon.Group size="huge" className="icon-group">
                        <Icon className="white-color" size="big" name="checkmark"/>
                    </Icon.Group>
                    <h4 className="intro-h4"> Welcome to Leaderboard Learning Management System</h4>
                    <h5 className="intro-h4"> Signing you up! </h5>
                </div>

                <div className={(this.state.signupComplete) ? "disappear intro-signing-up" : "appear intro-signing-up"}>
                    <Image 
                        centered = {true}
                        src="/img/icons/icon.png"
                        size="small"
                        shape="rounded"
                        stype={{display:"inline-block"}}
                    />
                    <h4 className ="intro-h4"> Welcome to Leaderboard Learning Management System</h4>
                    <div className={(this.state.invitationValidity) ? "visibility-hidden": ""}>
                        <h5 className="error-h4 red">This invitation is invalid :c</h5>
                    </div>
                    <h5 className={(this.state.invitationValidity) ? "intro-h4" : "visibility-hidden"}>You've been invted to join a course with other peers</h5>
                    <Form className="intro-form">
                        <Form.Group widths = "equal">
                            <Form.Input id="form-subcomponent-shorthand-input-user-name" onChange={this.updateEmail.bind(this)} placeholder="Email" value={this.state.email} />
                        </Form.Group>
                        <Form.Group widths = "equal">
                            <Form.Input type="password" id="form-subcomponent-shorthand-input-password" onChange={this.updatePassword.bind(this)} placeholder="Password" value={this.state.password}/>
                        </Form.Group>
                        <Form.Group widths = "equal">
                            <Form.Input type="password" onChange={this.updatePasswordCheck.bind(this)} placeholder="Confirm Password" value={this.state.passwordCheck}/>
                        </Form.Group>
                        <Button positive className={(this.state.invitationValidity) ? "width-full" : "width-full disabled"} onClick={this.signup.bind(this)}>Sign up and accept invitation</Button>
                        <Button positive className="width-full margin-top-small" onClick={this.signup.bind(this)}>Sign in here</Button>
                    </Form>
                </div>
            </div>
        )
    }
}