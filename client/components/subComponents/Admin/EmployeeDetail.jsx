import React, {Component} from 'react';
import Axios from 'axios';

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loading: true
    }
  }

  render() {
    return (
      <div> 
        Viewing detail for {this.props.users[this.props.userId].first_name}

      </div>
    )
  }

}

export default EmployeeDetail;