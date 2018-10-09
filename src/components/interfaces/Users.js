import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon, Table, Button } from 'semantic-ui-react';
import {API_URL} from '../../constants';
const axios = require('axios');

class Users extends Component {

    constructor(props){
        super(props);
        this.state = {
          users : [],
          me : {}
        }
    }
    
    componentDidMount() {
        
        axios.get(API_URL+"user/me",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => this.setState({me: res.data}));
        
        axios.get(API_URL+"users",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => this.setState({users: res.data}));
    }

    handleDelete = (e) =>{
        if(this.state.me.isRoot){
            if(confirm("Delete this User ?")){
                axios.delete(API_URL+"user/"+e.target.id,{headers: {
                    "x-access-token": localStorage.getItem('token')
                  }})
                    .then(res => {
                        console.log(res);
                        this.props.history.push('/');
                    });
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.me.isRoot ? (<Button as={Link} to="/users/add" primary>Ajouter</Button>) : ''}
                <Table celled structured textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>Permissions</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>Actions</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Devices</Table.HeaderCell>
                            <Table.HeaderCell>Groups</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.users.map(user => (
                            <Table.Row key={user._id}>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>
                                    <ul>
                                        {user.isRoot ? (<li>*</li>) : ''}
                                        {user.permissions.devices.map(device => (
                                            <li key={device}>{device}</li>
                                        ))}
                                    </ul>
                                </Table.Cell>
                                <Table.Cell>
                                    <ul>
                                        {user.isRoot ? (<li>*</li>) : ''}
                                        {user.permissions.groups.map(group => (
                                            <li key={group}>{group}</li>
                                        ))}
                                    </ul>
                                </Table.Cell>
                                <Table.Cell>
                                    <Icon name='edit outline' />
                                    <Icon  id={user._id} onClick={this.handleDelete} name='delete' />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Users;