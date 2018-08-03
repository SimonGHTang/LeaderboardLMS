import React from "react";
import { Popup, Transition, Image } from "semantic-ui-react";

export default class UserPopupInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: true,
            duration: 500
        }
    }

    toggleVisibility = () => { this.setState({visibility: !this.state.visibility})};

    render() { 
        return (
            <Popup
                position ="right center"
                trigger ={
                    <div>
                        <Transition animation="pulse" duration={this.state.duration} visible={this.state.visibility}>
                            <Image
                                src={this.props.user.profilePictureLink}
                                height="55px"
                                width="55px"
                                onMouseEnter ={this.toggleVisibility}
                                className="user-profile-icon"
                            />
                        </Transition>
                    </div>
                }
            >

                <Popup.Header>
                    {(this.props.user.username) ? this.props.user.username : this.props.user.email }
                </Popup.Header>
                <Popup.Header>
                    Click here to edit your profile!
                </Popup.Header>
            </Popup>
        );
    }
}