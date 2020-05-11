import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import {isAuthenticated,readUser} from '../../functions';

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      user:"",
      redirectToSignIn : false,
      isUploadin:false,
      image:""
    }
  }

  initUser = (userId)=>{
    const token = isAuthenticated().token;
    readUser(userId,token).then(data=>{
      if(data.error){
        this.setState({redirectToSignIn:true})
      }else{
        this.setState({user:data})
      }
    })
  }
  componentDidMount(){
    console.log('loading user data')
    const userId = this.props.match.params.userId;
    this.initUser(userId);
  }

  componentWillReceiveProps(props){
    const userId = props.match.params.userId;
    this.initUser(userId);
  }
  render(){
    const redirectToSignIn = this.state.redirectToSignIn;
    return (
      <div className="container">
        <h2>Profile</h2>
        <h4>Hello {this.state.user.name}</h4>
        <p>{this.state.user.email}</p>
        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
        <br/>
        <div>
        {isAuthenticated().user && isAuthenticated().user._id == this.state.user._id &&(
          <Link className={'waves-effect waves-light btn'} to={`/user/edit/${isAuthenticated().user._id}`}>Edit Profile</Link>
        )}
        </div>
      </div>
    );
  }
}

export default Profile;
