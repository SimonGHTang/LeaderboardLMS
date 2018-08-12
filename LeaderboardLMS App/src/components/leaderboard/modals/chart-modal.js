import React from "react";
import{Modal, Button, Icon} from "semantic-ui-react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default class ChartModal extends React.Component {
    constructor(props) {
        super();

        this.state = {
            modal: false,
            lineChartOptions: {
                title: {text: "Mark Distribution" },
                xAxis: {
                    categories: []
                },
                series: [
                    {
                        type: "line",
                        name: "students",
                        data: []
                    }
                ]
            },
            barChartOptions: {
                title: { text: "Mark Distribution"},
                xAxis: {
                    categories: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
                },
                yAxis: [{
                    title: {
                        text: "Nmber of Students"
                    }
                }],
                series: [
                    {
                        type: "column",
                        name: "Marks",
                        data: []
                    }
                ]
            }
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({errorMessage: ""});
        this.setState({successMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    componentWillMount() {
        var marks = [];
        var username = [];
        var distribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for(var i = 0; i < this.props.leaderboard.Rankings.length; i++) {
            var m = this.props.leaderboard.Rankings[i].mark;
            marks.push(m);
            if(!this.props.leaderboard.Rankings[i].User.username) {
                username.push(this.props.leaderobard.Rankings[i].User.username);
            } else {
                username.push(this.props.leaderboard.Rankings[i].email);
            }

            //barchart
            if(m <= 20) {
                distribution[0] = distribution[0] + 1;
            } else if (m > 10 && m <= 20) {
                distribution[1] = distribution[1] + 1;
            } else if (m > 20 && m <= 30) {
                distribution[2] = distribution[2] + 1;
            } else if (m > 30 && m <= 40) {
                distribution[3] = distribution[3] + 1;
            } else if (m > 40 && m <= 50) {
                distribution[4] = distribution[4] + 1;
            } else if (m > 50 && m <= 60) {
                distribution[5] = distribution[5] + 1;
            } else if (m > 60 && m <= 70) {
                distribution[6] = distribution[6] + 1;
            } else if (m > 70 && m <= 80) {
                distribution[7] = distribution[7] + 1;
            } else if (m > 80 && m <= 90) {
                distribution[8] = distribution[8] + 1;
            } else if (m > 90) {
                distribution[9] = distribution[9] + 1;
            }
        }

        var barChartOptions = this.state.barChartOptions;
        barChartOptions.series[0].data = distribution;
        this.setState({barChartOptions: barChartOptions});

        var lineChartOptions = this.state.lineChartOptions;
        lineChartOptions.series[0].data = marks.reverse();
        lineChartOptions.xAxis.categories = username.reverse();
        this.setState({options: lineChartOptions});
    }

    render() {
        return (
            <Modal
                closeIcon
                onClose={this.closeModal}
                size="large"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button floated="left" onClick={this.openModal}> <Icon name="area chart"/> Charts</Button>}
            >
                <Modal.Header>
                    leaderboard Charts
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.lineChartOptions}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.barChartOptions}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}