import React, { Component } from 'react';
import { Label, Button, Header } from 'semantic-ui-react';
import {Line} from 'react-chartjs-2';
import openSocket from 'socket.io-client';
import Toggle from 'react-toggle';
import { SOCKET_URL,API_URL } from '../../constants';
const axios = require('axios');

class Device extends Component {

    constructor(props){
        super(props);
        this.state = {
            live: true,
          device : {
              name : this.props.match.params.id,
              system : '',
              hardware : '',
              release : '',
              version : '',
              arch : '',
              cpu : '',
              group : '',
              offline: false,
          },
          ressourcesData:{

          },
          netData:{

          },
          tempData:{

          },
          groups:[]
        }
        
        axios.get(API_URL+"device/"+this.props.match.params.id,{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(device => {
                axios.get(API_URL+"group/"+device.data.group,{headers: {
                    "x-access-token": localStorage.getItem('token')
                  }})
                    .then(group => {
                        device.data.group = group.data;
                        this.setState({device: device.data});
                    });
            });
        axios.get(API_URL+"groups",{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => {
                var groups = [];
                res.data.forEach(function(group){
                    groups.push({id:group._id,name:group.name});
                });
                this.setState({groups: groups});
            });

    }
    
    componentDidMount() {
        axios.get(API_URL+"states/"+this.props.match.params.id,{headers: {
            "x-access-token": localStorage.getItem('token')
          }})
            .then(res => {
                const states = res.data;
                let cpu = [];
                let ram = [];
                let disk = [];
                let tempCpu = [];
                let tempGpu = [];
                let pingSys = [];
                let pingExt = [];
                let instants = [];
                states.forEach(element => {
                    cpu.unshift(element.cpu);
                    ram.unshift(element.ram);
                    disk.unshift(element.disk);
                    tempCpu.unshift(element.tempCpu);
                    tempGpu.unshift(element.tempGpu);
                    pingSys.unshift(element.pingSys);
                    pingExt.unshift(element.pingExt);
                    instants.unshift(new Date(element.created).toLocaleDateString('fr-FR',{hour:'numeric',minute:'numeric',second:'numeric'}));
                });
                this.setState({ 
                    ressourcesData: {
                        labels: instants,
                        datasets:[
                            {
                                label:'CPU',
                                data: cpu ,
                                backgroundColor:[
                                    'rgba(255,105,145,0.6)'
                                ]
                            },
                            {
                                label:'RAM',
                                data: ram ,
                                backgroundColor:[
                                    'rgba(155,100,210,0.6)'
                                ]
                            },
                            {
                                label:'DISK',
                                data: disk ,
                                backgroundColor:[
                                    'rgba(90,178,255,0.6)'
                                ]
                            },
                        ]
                    },
                    netData: {
                        labels: instants,
                        datasets:[
                            {
                                label:'Ping SYSLOG',
                                data: pingSys ,
                                backgroundColor:[
                                    'rgba(255,105,145,0.6)'
                                ]
                            },
                            {
                                label:'Ping Extérieur',
                                data: pingExt ,
                                backgroundColor:[
                                    'rgba(155,100,210,0.6)'
                                ]
                            },
                        ]
                    },
                    tempData: {
                        labels: instants,
                        datasets:[
                            {
                                label:'Température CPU',
                                data: tempCpu ,
                                backgroundColor:[
                                    'rgba(255,105,145,0.6)'
                                ]
                            },
                            {
                                label:'Température GPU',
                                data: tempGpu ,
                                backgroundColor:[
                                    'rgba(155,100,210,0.6)'
                                ]
                            }
                        ]
                    }
                });
            });     

        const  socket = openSocket(SOCKET_URL);
        socket.on('update', state => {
            if(this.state.live){
                window.location.reload();
            }
        });
    }

    delete = (e) => {
        if(confirm("Supprime la device ?")){
            axios.delete(API_URL+"device/"+this.props.match.params.id)
            .then(res => {
                console.log(res);
                this.props.history.push('/devices');
            });
        }
    }

    logs = (e) => {
        this.props.history.push('/logs/'+this.props.match.params.id);
    }

    changeGroup = (e) => {
        if(confirm("Changer la device de groupe ?")){
            const params = new URLSearchParams();
            params.append('group', e.target.value);
            axios.put(API_URL+"device/"+this.props.match.params.id, params)
            .then(res => {
                this.props.history.push("/");
            });
        }
    }
    
    handleLive = (e) => {
        this.setState({live:!this.state.live});
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <a href="/">&lt; Retour</a>
                <Header as='h1' color={this.state.device.offline ? "red" : "green"}>
                    Device Num : {this.state.device.name}
                </Header> 
                <Label tag>
                    {this.state.device.group.name}
                </Label>   
                <ul>
                    <li>{this.state.device.name}</li>
                    <li>{this.state.device.system}</li>
                    <li>{this.state.device.hardware}</li>
                    <li>{this.state.device.release}</li>
                    <li>{this.state.device.version}</li>
                    <li>{this.state.device.arch}</li>
                    <li>{this.state.device.cpu}</li>
                </ul>
                <Line
                    data={this.state.ressourcesData}
                    width={100}
                    height={50}
                    options={{
                        animation: false
                    }}
                />
                <Line
                    data={this.state.netData}
                    width={100}
                    height={50}
                    options={{
                        animation: false
                    }}
                />
                <Line
                    data={this.state.tempData}
                    width={100}
                    height={50}
                    options={{
                        animation: false
                    }}
                />
                <Button style={{ marginTop: '1em',  marginBottom: '1em'  }} color='blue' onClick={this.logs}>Voir les logs</Button>
                <br/>
                <label style={{ marginTop: '1em',  marginBottom: '1em'  }} >
                    <Toggle
                        defaultChecked={this.state.live}
                        aria-label='Live Update'
                        onChange={this.handleLive} />
                        <span style={{"verticalAlign":"top","marginLeft":"10px"}}>Live Update</span>
                </label>
                <select style={{ marginTop: '1em',  marginBottom: '1em'  }} className="ui fluid dropdown" onChange={this.changeGroup} value={this.state.device.group._id}>
                    {this.state.groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <Button style={{ marginTop: '1em',  marginBottom: '1em'  }} negative onClick={this.delete}>Supprimer la machine</Button>
            </div>
        );
    }
}

export default Device;