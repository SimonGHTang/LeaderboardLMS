import React from "react"
import {Header, Icon, Modal, Button} from "semantic-ui-react"

export default class DeleteLeaderboardModal extends React.Component {
    render() {
        return(
            <Modal
                basic
                size="small"
                trigger={<Button floated="right" basic color="red"><Icon name="trash"/>Delete Leaderboard</Button>}
            >
                <Header icon="trash outline" content="Delete File"/>
                    <Modal.Content>
                        <p>Are you sure you want to delete this leaderboard? It cannot be undone.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" inverted>
                            <Icon name="trash outline"/>Delete Leaderboard
                        </Button>
                        <Button color="green" inverted>
                            <Icon name="share"/>Go Back
                        </Button>
                    </Modal.Actions>
                </Modal>
        );
    }
}