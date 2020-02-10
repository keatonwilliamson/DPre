import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';
import Home from './components/Home';
import Design from './components/Design';
import Bank from './components/Bank';
import Edit from './components/Edit';
import { getUser, removeUser } from './API/userManager';
import './App.css';
import './Knob.css';
import './Rocker.css';
import './Labels.css';
import './RangeSlider.css';
import {debounce} from 'lodash';

class App extends Component {

  state = {
    scroll: 496,
    user: getUser(),
  }

  handleScroll = debounce((position) => {
    this.setState({ scroll: position });
    console.log(position)
  }, 40);


  logout = () => {
    this.setState({ user: null });
    removeUser();
  }
  // handleScroll = (position) => {
  //   console.log(position)
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/login" render={(props) => (
            <Login user={this.state.user} onLogin={(user) => this.setState({ user })} {...props} />
          )} />
          <Route exact path="/register" render={(props) => (
            <Register user={this.state.user} onLogin={(user) => this.setState({ user })} {...props} />
          )} />
          <Route exact path="/" render={(props) => (
            <>
              <Header user={this.state.user} logout={this.logout} {...props} />
              <Landing user={this.state.user} {...props} />
              {/* <Header user={this.state.user} logout={this.logout} {...props} />
            {this.state.user ? ( <Home /> ) : <Landing />} */}
            </>
          )} />

          <Route path={["/home", "/explore", "/bank", "/design", "/edit"]} render={(props) => (
            <Header user={this.state.user} logout={this.logout} {...props} />
          )} />
          <Route exact path="/home" render={() => (
            <Home />
          )} />
          <Route path="/design" render={(props) => (
            <Design scroll={this.state.scroll} handleScroll={this.handleScroll} {...props}/>
          )} />
          <Route path="/bank" render={(props) => (
            <Bank {...props} />
          )} />
          <Route path="/edit/:presetId(\d+)" render={(props) => {
            // return <Edit presetId={parseInt(props.match.params.presetId)} {...props}/>
            return <Design scroll={this.state.scroll} handleScroll={this.handleScroll} presetId={parseInt(props.match.params.presetId)} {...props} />
          }} />
        </Router>
      </div>
    );
  }
}

export default App;
