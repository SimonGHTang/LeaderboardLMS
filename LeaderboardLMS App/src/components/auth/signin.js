import React from 'react';
import {Button, Image, Icon, Form} from "semantic-ui-react";
 import AuthAPI from "../../services/authentication-services";

export default class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signinComplete: false,
            email: "",
            password: ""
        };
    }

    signin() {
        let signinInfo = {
            email: this.state.email,
            password: this.state.password
        }
        AuthAPI.post_signin(signinInfo).then((res => {
            if(res.status === "success") {
                let message= "Successfully signed in - welcome back!";
                window.Alert.success(message, { position: "top", effect: "stackslide", timout: 2000 });

                this.setState({ signinComplete: true });
                setTimeout( function(){ this.props.history.replace('/landing'); }.bind(this), 2000);
            } else {
                let message = "Sign in failed. Check your email and password please.";
                window.Alert.error(message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        }))
    }

    componentWillMount() {
        AuthAPI.get_currentUser().then((res) => {
            if(res.status === "success") {
                let message = "You are already signed in " + res.payload.username + "!";
                window.Alert.success(message, {position:"top", effect: "stackslide", timeout: 4000 });

                this.setState({ signinComplete: true });
                setTimeout(function() {
                    this.props.history.replace('/landing');
                }.bind(this), 4000);
            }
        });
    }

    updateEmail(e){
        this.setState({email: e.target.value});
    }

    updatePassword(e){
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className = "text-centre">
                <div className = {(this.state.signinComplete) ? "appear intro-logo" : "disappear intro-logo"}>
                    <Icon.Group size="huge" className="icon-group">
                        <Icon className="white-color" size="big" name="checkmark" />
                    </Icon.Group>
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                </div>

                <div className = {(this.state.signinComplete) ? "disappear intro-logging-in" : "appear intro-logging-in"}>
                    <Image
                        src="/img/icons/icon.png"
                        size="small"
                        shape="rounded"
                        style={{display:"inline-block"}}
                    />
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <Form className="intro-form">
                        <Form.Group widths="equal">
                            <Form.Input id="form-subcomponent-shorthand0input-user-name" onChange={this.updateEmail.bind(this)} placeholder="Email" value={this.state.email} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" id="form-subcomponent-shorthand-input-password" onChange={this.updatePassword.bind(this)} placeholder="Password" value={this.state.password}/>
                        </Form.Group>
                        <Button positive className="width-full" onClick={this.signin.bind(this)}>Sign In</Button>
                    </Form>
                </div>
            </div>
        );
    }
}