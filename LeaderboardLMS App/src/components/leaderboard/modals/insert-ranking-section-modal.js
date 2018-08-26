import React from "react";
import {Modal, Button, Label, Form, Icon} from "semantic-ui-react"

import RankingSectionAPI from "../../../services/ranking-section-services";

export default class InsertRankingSectionModal extends React.Component {
    constructor(props) {
        super();

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: ""
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({errorMessage: ""});
        this.setState({successMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    setErrorMessage(m){
        this.setState({errorMessage: m});
        this.setState({successMessage: ""});
        
    }

    setSuccessMessage(m){
        this.setState({errorMessage: ""});
        this.setState({successMessage: m});
    }

    updateName(e){
        this.setState({name: e.target.value});
    }    

    insertRankingSection() {
        let rankingSectionInfo = {
            name: this.state.name
        }

        RankingSectionAPI.put_rankingSection(this.props.course_id, this.props.leaderboard_id, rankingSectionInfo).then((res) => {
            if(res.status === "success"){
                this.setSuccessMessage(res.message);
            } else {
                this.setErrorMessage(res.message);
            }
        });

        this.forceUpdate();
    }

    render() {
        return(
            <Modal
                closeIcon
                onClose={this.closeModal}
                size="tiny"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button onClick={this.openModal}><Icon name="edit"/>Add Section</Button>}
            >
                <Modal.Header>
                    Add Assessment Section
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={16} label="Assessment Section Name:" onChange={this.updateName.bind(this)} value={this.state.name}/>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right"> {this.state.errorMessage}</Label> : ""}
                    {this.state.successMessage ? <Label basic color="green" pointing="right"> {this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.insertRankingSection.bind(this)}>Save</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}