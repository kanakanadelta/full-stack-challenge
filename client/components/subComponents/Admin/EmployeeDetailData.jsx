import React from 'react';

const EmployeeDetailData = props => {
  return(
    <div>
      <div>
        {console.log('usersDatadata:', props.usersData)}
        Viewing detail for {props.usersData[props.userId].first_name}. 
        <div>
          <button 
          onClick={()=> props.toggleView('userUpdate')}>
            edit
          </button>
        </div>
        <br/>
        Username: {props.usersData[props.userId].username}
        <br/>
        User Id No.: {props.usersData[props.userId].id}
        <br/>
        First Name: {props.usersData[props.userId].first_name}
        <br/>
        Last Name: {props.usersData[props.userId].last_name}
      </div>
      <div>
        <div>Performance Review:</div>
        <div>
          {props.renderReviews()}
        </div>
        <br/>
        <div></div>
        <div>
          <form
            className="review-form"
            onSubmit={e=> props.submitReview(e)}
          >
            <input 
            type="text" 
            onKeyUp={props.handleInput}
            />
          </form>
        </div>
        <button
          onClick={(e)=> props.submitReview(e)}
        >
          New Review
        </button>
      </div>
    </div>
  )
}

export default EmployeeDetailData;