import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';
import Home from './components/Home';
import Design from './components/Design';
import Bank from './components/Bank';
import { getUser, removeUser } from './API/userManager';
import './App.css';
import './Knob.css';
import './Rocker.css';
import './Labels.css';
import './RangeSlider.css';
import { debounce } from 'lodash';
import { Loader, Dimmer, Button, Icon, Modal } from 'semantic-ui-react'

class App extends Component {

  state = {
    saving: false,
    scroll: 600,
    sidebarScroll: 0,
    user: getUser(),
    sidebarIsVisible: false,
    sidebarIsDisplayed: false,
  }

  handleScroll = debounce((position) => {
    this.setState({ scroll: position });
    // console.log(position)
  }, 40);

  handleSidebarScroll = debounce((position) => {
    this.setState({ sidebarScroll: position });
    console.log(position)
  }, 40);

  renderSavingLoader = () => {
    console.log("rendersavingfrom app")
    this.setState({ saving: true });
  }
  closeSavingLoader = () => {
    this.setState({ saving: false });
  };


  showSidebar = () => {
    this.setState({ sidebarIsDisplayed: true });
    this.viewSidebar()
  }
  viewSidebar = debounce(() => {
    this.setState({ sidebarIsVisible: true,  });
  }, 40);

  hideSidebar = () => {
    this.setState({ sidebarIsVisible: false });
    this.cleanupSidebar()
  }
  cleanupSidebar = debounce(() => {
    this.setState({ sidebarIsDisplayed: false });
  }, 480);


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

          <Route path={["/home", "/explore", "/bank", "/design", "/preset"]} render={(props) => (
            <Header user={this.state.user} logout={this.logout} {...props} />
          )} />
          <Route exact path="/home" render={() => (
            <Home handleScroll={this.handleScroll}/>
          )} />
          <Route path="/design" render={(props) => (
            <Design 
                scroll={this.state.scroll}
                handleScroll={this.handleScroll}
                sidebarScroll={this.state.sidebarScroll}
                handleSidebarScroll={this.handleSidebarScroll}
                renderSavingLoader={this.renderSavingLoader}
                saving={this.state.saving}
                showSidebar={this.showSidebar}
                hideSidebar={this.hideSidebar}
                cleanupSidebar={this.cleanupSidebar}
                sidebarIsVisible={this.state.sidebarIsVisible}
                sidebarIsDisplayed={this.state.sidebarIsDisplayed}
                {...props} />
          )} />
          <Route path="/bank" render={(props) => (
            <Bank {...props} />
          )} />
          <Route path="/preset/:presetId(\d+)" render={(props) => {
            // return <Edit presetId={parseInt(props.match.params.presetId)} {...props}/>
            return <Design 
                      scroll={this.state.scroll}
                      handleScroll={this.handleScroll}
                      sidebarScroll={this.state.sidebarScroll}
                      handleSidebarScroll={this.handleSidebarScroll}
                      renderSavingLoader={this.renderSavingLoader}
                      closeSavingLoader={this.closeSavingLoader}
                      saving={this.state.saving}
                      presetId={parseInt(props.match.params.presetId)}
                      showSidebar={this.showSidebar}
                      hideSidebar={this.hideSidebar}
                      cleanupSidebar={this.cleanupSidebar}
                      sidebarIsVisible={this.state.sidebarIsVisible}
                      sidebarIsDisplayed={this.state.sidebarIsDisplayed}
                      {...props} />
          }} />
        </Router>

        {this.state.saving &&
          <Dimmer active>
            <div style={{ fontSize: '32px'}} className="ui huge text loader">saving to bank...</div>
          </Dimmer>
        }

      </div>
    );
  }
}

export default App;
