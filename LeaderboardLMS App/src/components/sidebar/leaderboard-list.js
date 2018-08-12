import React from "react";
import {Menu, Icon} from "semantic-ui-react";

import InsertLeaderboardModal from "./modals/insert-leaderboard-modal";
import CourseAPI from "../../services/course-services";

export default class LeaderboardList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            leaderboardList: [],
            selectedLeaderboard: 0
        }
    }

    toggleLeaderboardListDisplay(e) {
        this.setState({hideLeaderboardList: !this.state.hideLeaderboardList});
    }


    selectLeaderboard(e){
        this.setState({selectedLeaderboard: e.currentTarget.id });
        this.props.selectLeaderboard(e.currentTarget.id);
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0) { return; };
        this.getLeaderboardList(props)
    }

    getLeaderboardList(props) {
        this.setState({ leaderboardList: [] });
        if(props.course_id) {}

        CourseAPI.get_courseLeaderboards(props.course_id).then((res) => {
            if(res.status === "success") {
                for(var i = 0; i < res.payload.Leaderboards.length; i++) {
                    let leaderboard = (
                        <Menu.Item key={i} id={res.payload.Leaderboards[i].id} className="leaderboard-menu" onClick={this.selectLeaderboard.bind(this)}>
                            {res.payload.Leaderboards[i].name}
                        </Menu.Item>
                    );

                    this.state.leaderboardList.push(leaderboard);
                }

                this.state.leaderboardList.push(
                    <InsertLeaderboardModal key={i + 1} course_id={props.course_id} getLeaderboardList={this.getLeaderboardList.bind(this)}/>
                );

                this.forceUpdate();
            } else {
                let message = "Leaderboards could not be loaded at this time";
                window.alert.error(message, {position: "top", effect: "stackslide", timeout: 2000})
            }
        });
    }

    render() {
        return (
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleLeaderboardListDisplay.bind(this)}> <Icon name="chevron right" /> LEADERBOARDS <Icon name="chart line" /> </div>
                <Menu.Menu className={this.state.hideLeaderboardList ? "void" : ""} >
                    <div>
                        {this.state.leaderboardList}
                    </div>
                </Menu.Menu>
            </Menu.Item>
        )
    }
}