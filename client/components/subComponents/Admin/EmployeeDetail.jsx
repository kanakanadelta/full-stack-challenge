import React, {Component} from 'react';
import Axios from 'axios';

// React Components:
import EmployeeData from  './EmployeeDetailData';
import EmployeeUpdate from './EmployeeUpdate';

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      userData: this.props.users[this.props.userId],
      userId: this.props.userId,
      users: this.props.users,
      loading: true,
      newComment: '',
      reviews: [],
      view: 'detail'
    }
    this.submitReview = this.submitReview.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.reviewFetch = this.reviewFetch.bind(this);
    this.removeReview = this.removeReview.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option
    })
  }

  renderView(option) {
    if (this.state.view === "userUpdate") {
      return (
        <EmployeeUpdate
          userData={this.state.userData}
          toggleView={this.changeView}
        />
      )
    } else {
      return (
        <EmployeeData 
          userData={this.state.userData}
          usersData={this.state.users}
          userId={this.props.userId}
          renderReviews={this.renderReviews}
          handleInput={this.handleInput}
          submitReview={this.submitReview}
          toggleView={this.changeView}
        />
      )
    }
  }


  reviewFetch() {
    console.log('review fetching...')
    Axios
      .get('/api/review', {
        params: {
          user_id: this.props.users[this.props.userId].id
        }
      })
      .then(({data}) =>{
        this.setState({
          reviews: data,
          loading: false
        }),
        ()=>{
          console.log('successfully retrieved reviews');
          this.renderReviews();
        }
      })
      .catch(err=> {
        console.log('error getting reviews, see error:', err)
      })
  }

  renderReviews() {
    const users = this.props.users

    if (!!this.state.loading) {
      return <div>Loading...</div>
    } else {
      return ( 
        <ol>
          {this.state.reviews.map(review=>{
            return(
              //make a functional stateless component
              <li
                key={review.id}
              >
                {review.comment} - {users[review.reviewer-1].username}
                <button>edit</button>
                <button
                  onClick={()=> this.removeReview(review.id)}
                >
                  delete
                </button>
              </li>
            )
          })}
        </ol>
      )
    }
  }

  
  componentDidMount() {
    this.reviewFetch();
  }
  
  submitReview(e) {
    e.preventDefault();

    let comment = this.state.newComment;
    let user_reviewed = this.props.users[this.props.userId].id;
    let reviewer = 1;

    Axios
      .post('/api/review', {
        comment, user_reviewed, reviewer
      })
      .then(res=> {
        this.reviewFetch();
        console.log('success: new performance review', res);
      })
      .catch(err=> console.log(err))
  }

  removeReview(e) {

    let review_id = e;

    Axios
      .delete('/api/review/', {
        params: {
          review_id: review_id
        }
      })
      .then(this.reviewFetch())
      .catch(err => console.log(err))
  }

  handleInput(e){
    this.setState({
      newComment: e.target.value
    })
    console.log(this.state.newComment);
  }


  render() {
    return (
      <div className="employee-detail-view"> 
        <button onClick={()=>this.props.changeView('employees')}>Employees View</button>
        <br/>
        <br/>
          {this.renderView()}
        <br/>
      </div>
    )
  }

}

export default EmployeeDetail;