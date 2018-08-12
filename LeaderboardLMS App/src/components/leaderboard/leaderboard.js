import React from "react";
import {Segment, Grid, Header, Divider, Table, Image} from "semantic-ui-react";

import LeaderboardAPI from "../../services/leaderboard-services";
import ChartModal from "./modals/chart-modal";

export default class Leaderboard extends React.Component{
    constructor(props) {
        super();

        this.state = {
            course_id: 0,
            leaderboard: null,
            rankingSections: [],
            rankings: [],
            averageMark: 0,
            totalRankings: 0
        }
    }

    componentWillMount() {
        if(!this.props.course_id){ return; }
        var leaderboard_id = this.props.match.params.leaderboard_id;

        this.retrieveLeaderboard(this.props.course_id, leaderboard_id);
    }

    componentWillReceiveProps(newProps) {
        if(!newProps.course_id) { return; }
        var leaderboard_id = newProps.match.params.leaderboard_id;

        this.retrieveLeaderboard(newProps.course_id, leaderboard_id);
    }

    retrieveLeaderboard(course_id, leaderboard_id) {
        this.state.rankings = [];
        LeaderboardAPI.get_leaderboard(course_id, leaderboard_id).then((res) => {
            if(res.status === "success") {
                
                var totalMarks = 0;
                this.setState({leaderboard: res.payload});
                this.setState({rankingSections: res.payload.rankingSections});

                for(var i = 0; i < res.payload.Rankings.length; i++) {
                    let r = res.payload.Rankings[i];
                    totalMarks = totalMarks + r.mark;

                    let ranking = (
                        <Table.Row key={i}>
                            <Table.Cell width={i}>#{i + 1}</Table.Cell>
                            <Table.Cell width={1}><Image src={r.User.profilePictureLink} size="mini"/> </Table.Cell>
                            <Table.Cell width={3}>{r.User.username ? r.User.username : r.User.email} </Table.Cell>
                            <Table.Cell width={7}>{r.note} </Table.Cell>
                            <Table.Cell width={1}>{r.mark} </Table.Cell>
                            <Table.Cell width={1}>
                            
                            </Table.Cell>
                            <Table.Cell width={1}>
                            
                            </Table.Cell>
                            <Table.Cell width={1}>
                            
                            </Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankings.push(ranking);
                }

                this.setState({totalRankings: res.payload.Rankings.length});
                this.setState({averageMark: totalMarks/res.payload.Rankings.length})
            }
        });
    }

    render() {
        if(!this.state.leaderboard){ return(""); }

        return(
            <div className="ui bottom attached pushable">
                <div className="pusher">
                    <Divider />
                    <Grid>
                        <Grid.Row stretched>
                            <Grid.Column width={4}>
                                <Segment color="blue"><Header>{this.state.leaderboard.name}</Header></Segment>
                                <Segment color="blue">
                                    <p><b>Weighting: {this.state.leaderboard.weighting}%</b></p>
                                    <p><b>Average Mark: {this.state.averageMark ? Math.round(this.state.averageMark) : 0 } </b></p>
                                    <p><b>Total Rankings: {this.state.totalRankings}</b></p>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Segment color="blue" style={{ minHeight: 100}}>
                                    <Header as="h3">Description </Header>
                                    <p>{this.state.leaderboard.blurb}</p>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment color="grey" >
                                    <Header>Audit</Header>
                                    <p>Leaderboard created: <i>{this.state.leaderboard.created_at.substring(0, 10) + " " + this.state.leaderboard.created_at.substring(11, 19)}</i></p>
                                    <p>Leaderboard updated: <i>{this.state.leaderboard.updated_at.substring(0, 10) + " " + this.state.leaderboard.updated_at.substring(11, 19)}</i></p>
                                    <p>Leaderboard ID: <i>{this.state.leaderboard.id}</i></p>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider/>
                    <Grid>
                        <Grid.Column width={15}>
                            <Table singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Rank</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>Notes</Table.HeaderCell>
                                        <Table.HeaderCell>Marks</Table.HeaderCell>
                                        <Table.HeaderCell>Sections</Table.HeaderCell>
                                        <Table.HeaderCell>Anon</Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.rankings}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>

                    <Divider/>
                    <Grid>
                        <Grid.Column width={15}>
                            <ChartModal leaderboard={this.state.leaderboard} />
                        </Grid.Column>
                    </Grid>
                    <Divider/>
                </div>
            </div>
        )
    }
}