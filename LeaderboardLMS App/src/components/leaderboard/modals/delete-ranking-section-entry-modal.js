import React from "react";

import {Modal, Button, Icon, Header} from "semantic-ui-react";

import RankingSectionEntryAPI from "../../../services/ranking-section-entries-services";

export default class DeleteRankingSectionEntryModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
        }
    }

    toggleModal = () => this.setState({modal: !this.state.modal});

    deleteEntry() {
        RankingSectionEntryAPI.delete_rankingSectionEntry(this.props.course_id, this.props.id).then((res) => {
            if(res.status === "success") {
                window.Alert.success(res.message, { position: "top", effect: "stackslide", timout: 2000 });
            } else {
                window.Alert.error(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        });

        this.setState({modal: false});
    }

    render() {
        return(
            <Modal
                basic
                open={this.state.modal}
                onClose={this.toggleModal}
                trigger={
                    <Icon name="delete" size="large" className="cursor-pointer maroon-hover icon-red" onClick={this.toggleModal} />
                }
            >
                <Header icon="trash outline" content="Delete File"/>
                <Modal.Content>
                    <p>Are you sure you want to delete this ranking section entry? It cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted onClick={this.deleteEntry.bind(this)}>
                        <Icon name="trash outline"/>Delete Entry
                    </Button>
                    <Button color="green" inverted onClick={this.toggleModal}>
                        <Icon name="share"/>Go Back
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}