import React from 'react';

// styled-components:
import Container from '../../../styles/EmployeeBox';

const EmployeeEntry = props => {
  return (
    <Container className="admin-employee-entry">
      <div 
        className="employee-name"
        onClick={()=> {
          console.log(`hello ${user.id}`)
          props.changeView(user.id)
        }}
        id={user.id}
      >
        {props.user.last_name}, {props.user.first_name}
      </div>
      <div>
        <div>username:{props.user.username}</div>
        <div>
          Reviews:
        </div>
      </div>
    </Container>
  )
}

export default EmployeeEntry;