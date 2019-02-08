import React, {Component} from 'react';
import Axios from 'axios';

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'employees',
      loading: true,
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
        // console.log(data)
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
              <p key={user.id}>{user.first_name}</p>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        Hello from admin view
        {this.renderUsers()}
      </div>
    )
  }
}

export default AdminView;