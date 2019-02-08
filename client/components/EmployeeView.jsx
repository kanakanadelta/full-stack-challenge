import React, {Component} from 'react';
import Axios from 'axios';

class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'employees'
    }
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