import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react';

class Device extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Card color={this.props.offline ? "red" : "green"} as={Link} to={`/device/${this.props.id}`}>
                <Card.Content header={this.props.name} />
                <Card.Content description={this.props.id} />
            </Card>
        );
    }
}

export default Device;