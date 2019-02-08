import React, { Component } from 'react';
import Login from './Login';
import EmployeeView from './EmployeeView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login'
    }
  }

  render() {
    return (
      <Login />
    )
  }
}

export default App;