import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';

class Landing extends Component {
  state = {
    values: [],
  }

  componentDidMount() {
    // const authHeader = createAuthHeaders();
    // fetch('/api/v1/values', {
    //   headers: authHeader
    // })
    //   .then(response => response.json())
    //   .then(values => {
    //     this.setState({ values: values });
    //   });
  }

  render() {
    return (
      <>
        <h1>Landing Page WOOOOOO</h1>
        <ul>
          {/* {
            this.state.values.map(value => <li>{value}</li>)
          } */}
        </ul>
      </>
    )
  }
}

export default Landing;