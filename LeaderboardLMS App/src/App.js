import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';


import Signup from './components/auth/signup'
import Signin from './components/auth/signin'
import Landing from './components/landing'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/landing" render={(props) => <Landing /> } />
        <Route path="/auth/signup/:invitation" component={Signup} />
        <Route path="/auth/signup" component={Signup} />
        <Route component={Signin} />
      </Switch>
    );
  }
}
