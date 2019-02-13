import React from 'react';

const EmployeeLogin = props => {
  return (
    <div id="employee-login">
      Hello from employee login
      <div 
      className="go-back"
      style={{cursor: "pointer", color:"blue"}}
      onClick={()=> props.viewChange()}
      >
        Go Back
      </div>
      <div id="employee-login-form">
        <form
          onSubmit={e=> props.handleLoginSubmit(e)}
        >
          <input 
          type="text" 
          onKeyUp={props.handleInput}/>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin;