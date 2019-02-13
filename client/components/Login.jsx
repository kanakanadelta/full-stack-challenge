import React, { Component } from 'react';
import axios from 'axios';

// react-components:
import EmployeeLogin from './EmployeeLoginForm';

// styled-components
import Button from '../styles/buttons/LoginButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      employeeLogin: false
    }
    this.toggleView = this.toggleView.bind(this);
  }

  ///////////////
  // methods: //

  toggleView(option) {
    this.setState({
      employeeLogin: !this.state.employeeLogin
    });
  }

  employeeLoginView() {
    if (this.state.employeeLogin === true) {
      return (
        <div>
          Loginform
        </div>
      )
    }
  }

  // End Methods //
  ////////////////


  //////////////
  // render: //
  render() {
    return (
      (this.state.employeeLogin ? 
      <EmployeeLogin 
        handleInput={this.props.handleUsernameInput}
        handleLoginSubmit={this.props.handleLoginSubmit}
        viewChange={this.toggleView}
      /> 
      : 
        <div>
          <h2
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            Log In as:
          </h2>
          <Button
          className="login-btn"
          onClick={()=>{
            this.props.viewChange('admin')
            this.props.userLogin('admin')
            }
          }
          >
            Admin
          </Button>
          <br />
          <Button
          className="login-btn"
          onClick={()=> this.toggleView()}
          >
            Employee
          </Button>
        </div>)
    );
  }
}

export default Login;