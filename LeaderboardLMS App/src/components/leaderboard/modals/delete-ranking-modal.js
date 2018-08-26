import React from "react";

import {Modal, Button, Icon, Header} from "semantic-ui-react";

import RankingAPI from "../../../services/ranking-services";

export default class DeleteRankingModal extends React.Component{
    constructor(props) {
        super();

        this.state = {
            modal: false
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    deleteRanking() {
        RankingAPI.delete_ranking(this.props.course_id, this.props.ranking.id).then((res) => {
            if(res.status === "success") {
                window.Alert.success(res.message, { position: "top", effect: "stackslide", timout: 2000 });
            } else {
                window.Alert.error(res.message, {position: "top", effect: "stackslide", timout: 4000 });
            }
        });

        this.setState({modal: false});
    }

    render() {
        return (
            <Modal
                closeIcon
                basic
                onClose={this.closeModal}
                open={this.state.modal}
                size="small"
                trigger={<Icon name="trash" className="icon-red cursor-pointer" size="large" onClick={this.openModal}/>}
            >
                <Header icon="trash outline" content="Delete File"/>
                <Modal.Content>
                    <p>Are you sure you want to delete this ranking? It cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted onClick={this.deleteRanking.bind(this)}>
                        <Icon name="trash outline"/>Delete Ranking
                    </Button>
                    <Button color="green" inverted onClick={this.closeModal}>
                        <Icon name="share"/>Go Back
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}