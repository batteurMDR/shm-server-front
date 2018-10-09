import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {API_URL} from '../../constants';
const axios = require('axios');

class UsersAdd extends Component {

    constructor(props){
        super(props);
        this.state = {
          user : {
              email : '',
              password : '',
              isRoot : false,
              permissions : {
                  devices : [],
                  groups : []
              }
          },
          me : {},
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
    
    componentDidMount() {
        
        axios.get(API_URL+"user/me",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => this.setState({me: res.data}));
    }

    handleEmail= (e) =>{
        var user = this.state.user;
        user.email = e.target.value;
        this.setState({user:user});
    }

    handlePassword= (e) =>{
        var user = this.state.user;
        user.password = e.target.value;
        this.setState({user:user});
    }

    handleRoot= (e) =>{
        var user = this.state.user;
        user.isRoot = !user.isRoot;
        this.setState({user:user});
    }

    handleDevices= (e) =>{
        var user = this.state.user;
        var options = e.target.options;
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        user.permissions.devices = values;
        this.setState({user:user});
    }

    handleGroups= (e) =>{
        var user = this.state.user;
        var options = e.target.options;
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        console.log(values);
        user.permissions.groups = values;
        this.setState({user:user});
    }

    handleAdd= (e) =>{
        var user = this.state.user;
        if(user.email!=''&&user.password!=''){
            console.log(user);
            axios.post(API_URL+"users",user,{headers: {
                "x-access-token": localStorage.getItem('token')
              }})
                .then(res => {
                    console.log(res);
                    this.props.history.push("/users");
                });
        }
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' onChange={this.handleEmail}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' onChange={this.handlePassword}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Is a Root User ?' onChange={this.handleRoot}/>
                </Form.Field>
                <Form.Field>
                    <label>Devices autoriser</label>
                    <select multiple={true} style={{ marginTop: '1em',  marginBottom: '1em'  }} className="ui fluid dropdown" onChange={this.handleDevices}>
                        {this.state.devices.map(device => (
                            <option key={device._id} value={device._id}>{device.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Groupes autoriser</label>
                    <select multiple={true} style={{ marginTop: '1em',  marginBottom: '1em'  }} className="ui fluid dropdown" onChange={this.handleGroups}>
                        {this.state.groups.map(group => (
                            <option key={group._id} value={group._id}>{group.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Button primary type='submit' onClick={this.handleAdd}>Ajouter</Button>
            </Form>
        );
    }
}

export default UsersAdd;