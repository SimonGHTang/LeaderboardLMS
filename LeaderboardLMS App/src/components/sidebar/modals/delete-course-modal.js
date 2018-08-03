import React from "react";
import {Modal, Button, Icon, Header} from "semantic-ui-react";

import CourseAPI from "../../../services/course-services";

export default class DeleteCourseModal extends React.Component{
    render() {
        return (
            <Modal
                trigger={<Button color="red" floated="left">Delete</Button>}
                basic
                size="small"
            >
                <Header icon="trash outline" content="Delete Course"/>
                <Modal.Content>
                    <p>Are you sure you want to delete this course? It cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted>
                        <Icon name="trash outline" />Delete Course
                    </Button>
                    <Button color="green" inverted>
                        <Icon name="share"/>Go Back
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}