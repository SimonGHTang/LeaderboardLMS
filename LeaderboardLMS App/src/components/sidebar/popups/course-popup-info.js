import React from "react";
import { Popup, Transition, Image } from "semantic-ui-react/dist/commonjs";

export default class CoursePopupInfo extends React.Component {
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
                position = "right center"
                trigger = {
                    <div>
                        <Transition animation="pulse" duration={this.state.duration} visible={this.state.visibility}>
                            <Image
                                src={this.props.course.pictureLink}
                                height="50px"
                                width="50px"
                                onMouseOver={this.toggleVisibility}
                                rounded={true}
                                style={{display:"inline-block", cursor: "pointer"}}
                            />
                        </Transition>
                    </div>
                }
            >
                <Popup.Header> {this.props.course.name}</Popup.Header>
                <Popup.Content>
                    {this.props.course.description}
                </Popup.Content>
            </Popup>
        );
    }
}