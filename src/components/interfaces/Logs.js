import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Log from "../elements/Log";
import {API_URL} from '../../constants';
const axios = require('axios');

class Device extends Component {

    constructor(props){
        super(props);
        this.state = {
          device : {
              name : '',
              system : '',
              hardware : '',
              release : '',
              version : '',
              arch : '',
              cpu : ''
          },
          logs : []
        }

    }
    
    componentDidMount() {
        
        axios.get(API_URL+"device/"+this.props.match.params.id,{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => this.setState({device: res.data}));

        axios.get(API_URL+"logs/"+this.props.match.params.id,{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => this.setState({logs: res.data}));
    }

    render() {
        return (
            <div>
                <a href={"/device/"+this.props.match.params.id}>&lt; Retour</a>
                <h1>Device Num : {this.props.match.params.id}</h1>
                <ul>
                    <li>{this.state.device.name}</li>
                    <li>{this.state.device.system}</li>
                    <li>{this.state.device.hardware}</li>
                    <li>{this.state.device.release}</li>
                    <li>{this.state.device.version}</li>
                    <li>{this.state.device.arch}</li>
                    <li>{this.state.device.cpu}</li>
                </ul>
                {this.state.logs.map(log => (
                    <Log key={log._id} log={log}/>
                ))}
            </div>
        );
    }
}

export default Device;