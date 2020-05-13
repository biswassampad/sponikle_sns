import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import { Input } from '@material-ui/core';

import {isAuthenticated,readUser,uploadDp,fileUploader} from '../../functions';

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      user:"",
      redirectToSignIn : false,
      isUploadin:false,
      image:"",
      fileSize:"",
      error:""
    }
  }
  handleChange = (name)=>(event)=>{
    const value = name === "image" ? event.target.files[0]: event.target.value;
    const fileSize = name === "photo"?event.target.files[0].size: 0;
    this.setState({[name]:value,fileSize});
  }
  uploadImage=()=>{
    console.log('this state',this.state);
    const {image}= this.state;
    const userId = this.state.user._id;
    var type="dp";
    fileUploader(image,userId,type)
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
  isValid=()=>{
    const {fileSize} = this.state;
    if(fileSize>20000){
      this.setState({error:"Image file should be less than 2 MegaBytes"})
    }
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
          <>
          <Link className={'waves-effect waves-light btn'} to={`/user/edit/${isAuthenticated().user._id}`}>Edit Profile</Link>
          <Input onChange={this.handleChange("image")} type="file" accept="image/*" className={'waves-effect waves-light btn'}>Upload Image</Input>
          <button onClick={this.uploadImage} className={'waves-effect waves-light yellow light btn'}>Upload</button>
          </>
        )}
        </div>
      </div>
    );
  }
}

export default Profile;