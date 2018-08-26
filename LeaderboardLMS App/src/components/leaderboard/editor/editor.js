import React from "react";
import { Form, Grid, Label, Button} from "semantic-ui-react";

export default class Editor extends React.Component {
    constructor() {
        super();

        this.state = {
            info: ""
        }
    }

    componentWillMount(){
        this.setState({info: this.props.info})
    }

    updateInfo(e) {
        this.setState({info: e.target.value});
    }

    update() {
        this.props.submit(this.state.info);
    }

    toggleEditor = () => this.setState({editor: !this.state.editor});

    render() {
        return(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Form >
                            <Form.Input onChange={this.updateInfo.bind(this)} onBlur={this.update.bind(this)} value={this.state.info} />
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button icon="folder" color="blue" onClick={this.update.bind(this)} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    };
}
