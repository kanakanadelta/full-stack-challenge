import React, {Component} from 'react';
import Axios from 'axios';

// react components
import EmployeeEntry from './subComponents/Employee/EmployeeEntry';

class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'employees',
      users: []
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate() {
    console.log(this.state.users)
  }

  
  getUsers() {
    Axios
      .get('/api/allUsers', {
        // params: {}
      })
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
              />
            )
          })}
        </div>
      )
    }
  }


  render() {
    return(
      <div>
        <div>
          Hello {this.props.currentUser}!
        </div>
        <div>
          <a 
          style={{
            cursor: "pointer",
            color: "blue"
          }}
          onClick={()=>  this.props.logOut()}>
            Log Out
          </a>
        </div>
        <br/>
        <div> 
          Employees: 
        </div>

        <div className="employee-list">
          {this.renderUsers()}
        </div>

      {/* end component */}
      </div>
    )
  }
}

export default EmployeeView;