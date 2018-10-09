import React, { Component } from 'react';
import Group from '../elements/Group';
import {API_URL} from '../../constants';
const axios = require('axios');

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          devices: [],
          groups: []
        }
        axios.get(API_URL+"groups",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => (
                this.setState({groups: res.data})
            ));

        axios.get(API_URL+"devices",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => (
            	this.setState({devices: res.data})
            ));
        
    }

    render() {
        var devices = {
            0:[]
        };
        // console.log(this.state.devices.length);
        if(this.state.devices.length>=0&&this.state.groups.length>=0){
            this.state.groups.map(group => (
                devices[group._id] = []
            ));
            this.state.devices.map(device => {
                console.log(devices[device.group])
                if(devices[device.group]!=undefined){
                    devices[device.group].push(device);
                }else{
                    devices[0].push(device);
                }
            });
        }
        return (
            <div className="Home">
                {this.state.groups.map(group => (
                    <Group 
                    	key={group._id} 
                    	name={group.name} 
                    	devices={devices[group._id]} />
                ))}
                {(devices[0].length>0) ? (
                    <Group 
                    	key={0} 
                    	name="No Categories" 
                        devices={devices[0]} />
                ) : ''}
            </div>
        );
    }
}

export default Home;