import React, {Component} from 'react';
import Axios from 'axios';

class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'employees'
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    Axios
      .get('/api/allUsers', {
        // params: {}
      })
      .then(({data}) =>{
        console.log(data),
        ()=>{
          console.log('successfully retrieved users')
        }
      })
      .catch(err=> {
        console.log('error getting users, see error:', err)
      })
  }

  render() {
    return(
      <div>
        Hello from employee view
      </div>
    )
  }
}

export default EmployeeView;