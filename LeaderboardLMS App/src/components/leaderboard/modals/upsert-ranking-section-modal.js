import React from "react";
import {Modal, Button, Form, Label} from "semantic-ui-react";

import RankingSectionEntryAPI from "../../../services/ranking-section-entries-services";

export default class UpsertRankingSectionEntryModal extends React.Component {
    constructor(props) {
        super();

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            rankingSectionEntryFormList: [],
            rankingSectionEntryList: []
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    setErrorMessage(m){
        this.setState({successMessage: ""});
        this.setState({errorMessage: m});
    }

    setSuccessMessage(m){
        this.setState({successMessage: m});
        this.setState({errorMessage: ""});
    }

    componentWillMount(){
        this.generateRankingSectionEntryForms(this.props);
    }

    componentWillReceiveProps(props){
        this.generateRankingSectionEntryForms(props);
    }

    updateMark(e) {
        var newRankingSectionEntryList = this.state.rankingSectionEntryList;

        for(var i = 0; i < newRankingSectionEntryList.length; i++) {
            if(newRankingSectionEntryList[i].ranking_section_id === parseInt(e.target.id, 10)) {
                newRankingSectionEntryList[i].mark = e.target.value;
            }
        }

        this.setState({rankingSectionEntryList: newRankingSectionEntryList});
    }

    generateRankingSectionEntryForms(props) {
        this.state.rankingSectionEntryFormList = [];
        this.state.rankingSectionEntryList = [];
        if(!props.rankingSections) {
            this.state.rankingSectionEntryFormList.push(<div>No assessment sections</div>);
            this.forceUpdate();
            return;
        }

        if(!props.rankingSectionEntries) {
            for(var i = 0; i < props.rankingSections.length; i++) {
                var rankingSectionEntryForm = (
                    <Form.Group key={i}>
                        <Form.Input width={16} label={props.rankingSections[i].name} key={i} id={props.rankingSections[i].id} />
                    </Form.Group>
                );

                this.state.rankingSectionEntryFormList.push(rankingSectionEntryForm);
                this.state.rankingSectionEntryList.push({ranking_section_entry_id: 0, mark: 0, ranking_section_id: props.rankingSection[i].id });
                this.forceUpdate();
            }
            return;
        }

        for(var i = 0; i < props.rankingSections.length; i++) {
            var hasRankingSectionEntry = false;
            for(var j = 0; j < props.rankingSectionEntries.length; j ++) {
                if(props.rankingSections[i].id === props.rankingSectionEntries[j].ranking_section_id) {
                    this.state.rankingSectionEntryList.push({ ranking_section_entry_id: props.rankingSectionEntries[j].id, mark: props.rankingSectionEntries[j].mark, ranking_section_id: props.rankingSections[i].id });
                    var rankingSectionEntryForm = (
                        <Form.Group key={i}>
                            <Form.Input width={16} label={props.rankingSections[i].name} id={props.rankingSections[i].id} onChange={this.updateMark.bind(this)} />
                        </Form.Group>
                    );

                    this.state.rankingSectionEntryFormList.push(rankingSectionEntryForm);
                    hasRankingSectionEntry = true;
                    break;
                }
            }

            if(!hasRankingSectionEntry) {
                var rankingSectionEntryForm = (
                    <Form.Group key={i}>
                        <Form.Input width={16} label={props.rankingSections[i].name} id={props.rankingSenctions[i].id} onChange={this.updateMark.bind(this)} />
                    </Form.Group>
                );

                this.state.rankingSectionEntryList.push({ranking_section_id: 0, mark: 0, ranking_section_id: props.rankingSection[i].id });
                this.state.rankingSectionEntryFormList.push(rankingSectionEntryForm);
            }
        }

        this.forceUpdate();
    }

    insertRankingSectionEntry(){
        for(var i = 0; i < this.state.rankingSectionEntryList.length; i++) {
            var r = this.state.rankingSectionEntryList[i];
            if(r.ranking_section_entry_id === 0) {
                var rankingSectionEntryInfo = {
                    mark: r.mark,
                    ranking_section_id: r.ranking_section_id
                };

                RankingSectionEntryAPI.put_rankingSectionEntry(this.props.course_id, this.props.ranking_id, rankingSectionEntryInfo).then((res) => {
                    if (res.status === "success"){
                        this.setSuccessMessage(res.message);
                        this.closeModal();
                    } else {
                        this.setErrorMessage(res.message);
                    }
                });
            } else {
                var rankingSectionEntryInfo = {
                    mark: r.mark
                };

                RankingSectionEntryAPI.post_rankingSectionEntry(this.props.course_id, this.props.ranking_id, r.ranking_section_entry_id, rankingSectionEntryInfo).then((res) => {
                    if(res.status === "success") {
                        this.setSuccessMessage(res.message);
                        this.closeModal();
                    } else {
                        this.setErrorMessage(res.message);
                    }
                });
            }
        }
    }

    render() {
        return(
            <Modal
                onClose={this.closeModal}
                size="tiny"
                dimmer={false}
                open={this.state.modal}
                trigger={<Button onClick={this.openModal} primary>Update</Button>}
            >
                <Modal.Header>
                    Create/Update Assessment Section Entry
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            {this.state.rankingSectionEntryFormList}
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : ""}
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.insertRankingSectionEntry.bind(this)}>Save</Button>
                    <Button primary onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}