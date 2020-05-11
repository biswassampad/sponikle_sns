import React,{Component} from 'react';

import {isAuthenticated,readUser} from '../../functions';

class Editprofile extends Component{
  constructor(){
    super()
    this.state={
      id:"",
      name:"",
      email:"",
      password:"",
    }
  }

  initUser = (userId)=>{
    const token = isAuthenticated().token;
    readUser(userId,token).then(data=>{
      if(data.error){
        this.setState({redirectToSignIn:true})
      }else{
        this.setState({id:data._id,name:data.name,email:data.email})
      }
    })
  }
  componentDidMount(){
    console.log('loading user data')
    const userId = this.props.match.params.userId;
    this.initUser(userId);
  }

  render(){
    return (
      <div className="container">
      <h2>Edit Profile</h2>
      </div>
    )
  }
}

export default Editprofile;
