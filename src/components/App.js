import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Menu,
  Button, 
  Form
} from 'semantic-ui-react';
import Main from './Main';
import {API_URL} from '../constants';
const axios = require('axios');

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        token : localStorage.getItem("token")
      }
  }

  handleLogin = (e) => {
    axios.post(API_URL+"user/me",{email:this.state.email,password:this.state.password})
      .then(res => {
          if(res.data.auth){
            localStorage.setItem("token",res.data.token);
          }
          location.reload();
      });
  }

  handleLogout = (e) => {
    localStorage.clear("token");
    location.reload();
  }

  handleChangeEmail= (e) =>{
    this.setState({email: e.target.value});
  }

  handleChangePassword= (e) =>{
    this.setState({password: e.target.value});
  }

  render() {
      if(this.state.token==null){
        return (
          <Grid columns='equal'>
              <Grid.Row>
                  <Grid.Column></Grid.Column>
                  <Grid.Column>
                      <h1>SHM</h1>
                      <Form>
                          <Form.Field>
                              <label>E-mail</label>
                              <input placeholder='E-mail' onChange={this.handleChangeEmail}/>
                          </Form.Field>
                          <Form.Field>
                              <label>Password</label>
                              <input placeholder='Password' type="password" onChange={this.handleChangePassword}/>
                          </Form.Field>
                          <Button type='submit' onClick={this.handleLogin}>Login</Button>
                      </Form>
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
              </Grid.Row>
          </Grid>
        );
      }else{
        return (
          <div>
            <Menu fixed='top' inverted>
              <Container>
                <Menu.Item as='a' header>
                  SHM
                </Menu.Item>
                <Menu.Item as={Link} to="/devices">Devices</Menu.Item>
                <Menu.Item as={Link} to="/groups">Groupes</Menu.Item>
                <Menu.Item as={Link} to="/users">Utilisateurs</Menu.Item>
                <Menu.Item as={Link} to="#" onClick={this.handleLogout}>Déconnexion</Menu.Item>
              </Container>
            </Menu>
        
            <Container text style={{ marginTop: '7em',  marginBottom: '.5em'  }}>
              <Main />
            </Container>
          </div>
        );
      }
  }
}
export default App;

