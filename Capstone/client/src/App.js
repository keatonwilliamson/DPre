import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';
import Home from './components/Home';
import { getUser, removeUser } from './API/userManager';
import './App.css';

class App extends Component {
  state = {
    user: getUser(),
  }

  logout = () => {
    this.setState({ user: null });
    removeUser();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/login" render={() => (
            <Login onLogin={(user) => this.setState({ user })} />
          )} />
          <Route exact path="/register" render={() => (
            <Register onLogin={(user) => this.setState({ user })} />
          )} />
          <Route exact path="/" render={(props) => (
            <>
            <Header user={this.state.user} logout={this.logout} {...props} />
              <Landing />
              {/* <Header user={this.state.user} logout={this.logout} {...props} />
            {this.state.user ? ( <Home /> ) : <Landing />} */}
            </>
          )} />

          <Route path={["/home", "/explore", "/bank", "/design"]} render={(props) => (
            <Header user={this.state.user} logout={this.logout} {...props} />
          )} />
          <Route exact path="/home" render={() => (
            <Home />
          )} />
        </Router>
      </div>
    );
  }
}

export default App;
