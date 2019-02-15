import React, {Component} from 'react';
import Axios from 'axios';

// react components
import EmployeeEntry from './subComponents/Admin/EmployeeEntry';
import EmployeeDetail from './subComponents/Admin/EmployeeDetail';

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1, //replace;
      view: 'employees',
      loading: true,
      users: [],
    }
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate() {
    console.log(this.state.users)
  }

  changeView(option) {
    console.log(`changing view to user: ${option}`)
    this.setState({
      view: option
    })
  }

  getUsers() {
    Axios
      .get('/api/allUsers')
      .then(({data}) =>{
        this.setState({
          users: data,
          loading: false
        }),
        ()=>{
          console.log('successfully retrieved users')
        }
      })
      .catch(err=> {
        console.log('error getting users, see error:', err)
      })
  }

  renderUsers() {
    if (!!this.state.loading) {
      return <div>Loading...</div>
    } else {
      return ( 
        <div>
          {this.state.users.map(user=>{
            return(
              //make a functional stateless component
              <EmployeeEntry
                key={user.id}
                user={user}
                changeView={this.changeView}
              />
            )
          })}
        </div>
      )
    }
  }

  renderView(option) {
    if (this.state.view === "employees") {
      return (
        <div 
        className="employee-list"
        >
        Employees:
          {this.renderUsers()}
        </div>
      )
    } else {
      return (
        <EmployeeDetail 
          users={this.state.users}
          userData={this.state.userData}
          userId={this.state.view}
          changeView={this.changeView}
        />
      )
    }
  }

  render() {
    return(
      <div>
        <div>
          Hello {this.props.currentUser}.
        </div>
        <div>
          <a 
          style={{
            cursor: "pointer",
            color: "blue"
          }}
          onClick={()=>this.props.logOut()}>
            Log Out
          </a>
        </div>
        <br/>
        <div> 
          {this.renderView()}
        </div>
        {/* End Component */}
      </div>
    )
  }
}

export default AdminView;