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
      currentUser: '',
      userData: null,
      authorized: true,
      view: 'login'
    }
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.logOut = this.logOut.bind(this);

  }

  changeView(option) {
    this.setState({
      view: option
    })
  }

  userLogin(option) {
    this.setState({
      currentUser: option
    })
  }

  logOut() {
    this.setState({
      currentUser: '',
      view: 'login'
    })
  }

  handleUsernameInput(e){
    this.setState({
      currentUser: e.target.value
    })
    console.log(this.state.currentUser);
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    Axios
      .get('/api/login/', {
        params: {
          username: this.state.currentUser
        }
      })
      .then((user)=>{
        console.log(user.data)
        this.setState({
          userData: user.data
        })
        this.changeView('employee')
      })
      .catch(err=> {
        console.log('error logging in', err);
      })
  }


  renderView() {
    if (this.state.view === 'login') {
      return <Login 
              currentUser={this.state.currentUser}
              viewChange={this.changeView}
              userLogin={this.userLogin}
              handleUsernameInput={this.handleUsernameInput}
              handleLoginSubmit={this.handleLoginSubmit}
              />;
    } else if (this.state.view === 'admin') {
      return <AdminView
              currentUser={this.state.currentUser}
              logOut={this.logOut}
              users={this.state.users} //pass down users to child component
              loading={this.state.loading}
              />
    } else if (this.state.view === 'employee') {
      return <EmployeeView 
              currentUser={this.state.currentUser}
              userData={this.state.userData}
              logOut={this.logOut}
              users={this.state.users} //pass down users to child component
              loading={this.state.loading}
              />;
    }
  }

  render() {
    return (
      <div id="webApp">
        <div 
        id="header"
        style={{
          borderBottom: "solid 1px #000"
        }}
        >
          <h3>Feed<span style={{border: "solid 1px #000"}}>Box</span></h3>
          <p>Employee Feedback WebApp</p>
        </div>
        <div id="body">
          {this.renderView()}
        </div>
      </div>
    )
  }
}

export default App;