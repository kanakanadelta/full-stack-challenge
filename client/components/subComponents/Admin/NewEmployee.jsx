import React, {Component} from 'react';
import Axios from 'axios';

class NewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state ={
      newUsername: '',
      newFirstName: '',
      newLastName: '',
      newPassword: ''
    }
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this)
    this.handleLastName = this.handleLastName.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
  }

  handleUpdateSubmit(e) {
    e.preventDefault();

    let user = this.state;
    Axios
      .post(`/api/user/`, {user})
      .then(data=>{
        console.log(data);
      })
      .catch(err=>{
        console.log('error', err);
      })
  }

  handleUsername(e) {
    this.setState({
      newUsername: e.target.value
    })
    console.log(this.state.newUsername)
  }

  handleFirstName(e) {
    this.setState({
      newFirstName: e.target.value
    })
    console.log(this.state.newFirstName)
  }

  handleLastName(e) {
    this.setState({
      newLastName: e.target.value
    })
    console.log(this.state.newLastName)
  }

  handlePassword(e) {
    this.setState({
      newPassword: e.target.value
    })
    console.log(this.state.newPassword)
  }


  render() {
    return (
      <div>
        
        <form className="new-employee-form">
          Enter New Employee Information:
          <br/>
          <button 
            onClick={()=> this.props.toggleView('detail')}>
            cancel
          </button>
          <br/>
          Username:
          <div>
            <input 
              type="text" 
              placeholder="New Username"
              onKeyUp={this.handleUsername}
              />
          </div>
          First Name:
          <div>
            <input 
              type="text" 
              placeholder="New First Name"
              onKeyUp={this.handleFirstName}
              />
          </div>
          Last Name:
          <div>
            <input 
              type="text" 
              placeholder="New Last Name"
              onKeyUp={this.handleLastName}
              />
          </div>
          <br/>
          <br/>
          Password:
          <div>
            <input 
              type="password" 
              placeholder="New Password"
              required
              onKeyUp={this.handlePassword}
              />
          </div>
          Re-enter Password:
          <div>
            <input 
              type="password" 
              placeholder="Re-type Password"
              onKeyUp={this.handlePassword}
              />
          </div>
          <div>
            <button
              type="submit"
              onClick={this.handleUpdateSubmit}
            >Add Employee</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewEmployee;