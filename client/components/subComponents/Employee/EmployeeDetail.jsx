import React, {Component} from 'react';
import Axios from 'axios';

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loading: true,
      authorized: this.props.userData.review_auth,
      newComment: '',
      reviews: []
    }
    this.submitReview = this.submitReview.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.reviewFetch = this.reviewFetch.bind(this);
    this.removeReview = this.removeReview.bind(this);
    this.renderReviewForm = this.renderReviewForm.bind(this);
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

  renderReviewForm() {
    if(this.state.authorized === true) {
      return (
        <div>
            <div>
              <form
                className="review-form"
                onSubmit={e=> this.submitReview(e)}
              >
                <input 
                type="text" 
                onKeyUp={this.handleInput}
                />
              </form>
            </div>
            <button
              onClick={(e)=> this.submitReview(e)}
            >
              New Review
            </button>
        </div>
      )
    }
  }


  render() {
    return (
      <div> 
        <button onClick={()=>this.props.changeView('employees')}>Employees View</button>
        <br/>
        <br/>

        <div>
          Viewing detail for {this.props.users[this.props.userId].first_name}.
          <br/>
          <br/>
          Username: {this.props.users[this.props.userId].username}
          <br/>
          User Id No.: {this.props.users[this.props.userId].id}
          <br/>
          First Name: {this.props.users[this.props.userId].first_name}
          <br/>
          Last Name: {this.props.users[this.props.userId].last_name}
        </div>
        <br/>
        <div>
          <div>Performance Review:</div>
          <div>
            {this.renderReviews()}
          </div>
          <br/>
          <div className="review-option">
            {this.renderReviewForm()}
            {console.log(this.state.authorized)}
          </div>
        </div>
        
      </div>
    )
  }

}

export default EmployeeDetail;