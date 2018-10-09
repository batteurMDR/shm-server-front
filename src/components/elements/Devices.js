import React, { Component } from 'react';
import Device from '../elements/Device';
import {API_URL} from '../../constants';
const axios = require('axios');

class Devices extends Component {

    constructor(props){
        super(props);
        this.state = {
          devices: []
        }
        axios.get(API_URL+"devices",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => (
                this.setState({devices: res.data})
            ));
        
    }

    render() {
        return (
            <div>
                {this.state.devices.map(device => (
                    <Device key={device._id} name={device.name} id={device._id} />
                ))}
            </div>
        );
    }
}

export default Devices;