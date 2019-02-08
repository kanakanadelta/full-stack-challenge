import React, { Component } from 'react';
import Axios from 'axios';

//React Components
import Login from './Login';
import EmployeeView from './EmployeeView';
import AdminView from './AdminView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      view: 'admin'
    }
    this.renderView = this.renderView.bind(this);
  }

  renderView() {
    if (this.state.view === 'login') {
      return <Login />;
    } else if (this.state.view === 'admin') {
      return <AdminView
              users={this.state.users} //pass down users to child component
              loading={this.state.loading}
              />
    } else if (this.state.view === 'employee') {
      return <EmployeeView 
              
            />;
    }
  }

  render() {
    return (
      <div id="body">
        {this.renderView()}
      </div>
    )
  }
}

export default App;