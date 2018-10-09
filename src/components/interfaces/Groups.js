import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon, Table, Button, Input } from 'semantic-ui-react';
import {API_URL} from '../../constants';
const axios = require('axios');

class Groups extends Component {

    constructor(props){
        super(props);
        this.state = {
          groups: [],
          name: '',
          me: {}
        }
        axios.get(API_URL+"groups",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => (
                this.setState({groups: res.data})
            ));
        axios.get(API_URL+"user/me",{headers: {
            "x-access-token": localStorage.getItem('token')
            }})
            .then(res => this.setState({me: res.data}));
        
    }

    handleChange= (e) =>{
      this.setState({name: e.target.value});
    }

    handleAdd = (e) => {
        axios.post(API_URL+"groups",{name:this.state.name},{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => {
                this.props.history.push("/");
            });
    }

    handleDelete = (e) =>{
        if(this.state.me.isRoot){
            if(confirm("Delete this Group ?")){
                axios.delete(API_URL+"group/"+e.target.id,{headers: {
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
                {this.state.me.isRoot ? (
                    <div>
                        <Input placeholder="Nouveau Groupe" onChange={this.handleChange}/><Button onClick={this.handleAdd} primary style={{"marginLeft":"10px"}}>Ajouter</Button>
                    </div>
                ) : ''}
                <Table celled structured textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan='2'>ID</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>Nom</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.groups.map(group => (
                            <Table.Row key={group._id}>
                                <Table.Cell>{group._id}</Table.Cell>
                                <Table.Cell>{group.name}</Table.Cell>
                                <Table.Cell>
                                    <Icon onClick={this.handleDelete} name='delete' id={group._id}/>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Groups;