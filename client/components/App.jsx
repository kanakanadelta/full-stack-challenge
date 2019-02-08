import React, { Component } from 'react';
import Login from './Login';
import EmployeeView from './EmployeeView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'employees'
    }
    this.renderView = this.renderView.bind(this);
  }

  renderView() {
    if (this.state.view === 'login') {
      return <Login />;
    } else if (this.state.view === 'employees') {
      return <EmployeeView />;
    }
  }

  render() {
    return (
      <div id="body">
        <EmployeeView/>
      </div>
    )
  }
}

export default App;