import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Device from '../elements/Device';
const axios = require('axios');

class Group extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="Group">
                <h1>{this.props.name}</h1>
                <Card.Group>
                    {this.props.devices.map(device => (
                        <Device key={device._id} offline={device.offline} name={device.name} id={device._id} />
                    ))}
                </Card.Group>
            </div>
        );
    }
}

export default Group;