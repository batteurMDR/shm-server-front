import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './interfaces/Home';
import Device from './interfaces/Device';
import Logs from './interfaces/Logs';
import Groups from './interfaces/Groups';
import Users from './interfaces/Users';
import UsersAdd from './interfaces/UsersAdd';

const Main = () => (
  <main>
    <BrowserRouter />
    <Route exact path='/' component={Home} />
    <Route exact path='/devices' component={Home} />
    <Route exact path='/groups' component={Groups} />
    <Route exact path='/users' component={Users} />
    <Route exact path='/users/add' component={UsersAdd} />
    <Route exact path='/device/:id' component={Device} />
    <Route exact path='/logs/:id' component={Logs} />
    <Route exact path='/dashboard' component={Home} />
    <Route exact path='/shot' component={Home} />
  </main>
);

export default Main;
