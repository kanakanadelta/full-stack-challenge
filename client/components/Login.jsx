import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render() {
    return (
      <div>
        Username: <input name="username"/>
        <br/>
        Password: <input name="password" type="password"/>
      </div>
    );
  }
}

export default Login;