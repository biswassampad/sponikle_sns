import React,{Component} from 'react';
import {Link} from 'react-router-dom';


import {isAuthenticated,readUser,uploadDp,fileUploader,getLocation} from '../../functions';
import FollowProfileButton from '../../components/FollowProfileButton';
import ProfileTabs from '../../components/profileTabs';
import NewPost from '../../components/newPost';

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      user:{following:[],follower:[]},
      redirectToSignIn : false,
      isUploadin:false,
      image:"",
      fileSize:"",
      error:"",
      loading: false,
      following: false,
      location:""
    }
  }

  checkFollow = user =>{
    const jwt = isAuthenticated();
    const match = user.followers.find(follower=>{
      return follower._id ==  jwt.user._id;
    })
    return match;
  }
  handleChange = (name)=>(event)=>{
    const value = name === "image" ? event.target.files[0]: event.target.value;
    const fileSize = name === "photo"?event.target.files[0].size: 0;
    this.setState({[name]:value,fileSize});
  }
  uploadImage=(event)=>{
    this.setState({ loading: true });
    const {image}= this.state;
    const userId = this.state.user._id;
    var type="dp";
    fileUploader(image,userId,type).then(res=>{
      this.setState({loading:false});
    })
  }

  clickFollowButton = callApi => {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  callApi(userId, token, this.state.user._id).then(data => {
    if (data.error) {
      this.setState({ error: data.error });
    } else {
      this.setState({ user: data, following: !this.state.following });
    }
  });
};

  initUser = (userId)=>{
    const token = isAuthenticated().token;
    getLocation()
   .then(location => {
     this.setState({
       location
     });
   });
    readUser(userId,token).then(data=>{
      if(data.error){
        this.setState({redirectToSignIn:true})
      }else{
       let following = this.checkFollow(data);
        this.setState({user:data,following})
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
    const {loading} = this.state;
    var picUrl = this.state.user._id ? this.state.user.displaypic:`https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png`;
    return (
      <div className="container">
        <h2>Profile</h2>
        <img src={picUrl} alt={this.state.user.displayname} className={'user_avatar_profile'}/>
        <h4>Hello {this.state.user.name}</h4>
        <p>{this.state.user.email}</p>
        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
        <br/>
        <div>
        {isAuthenticated().user && isAuthenticated().user._id == this.state.user._id ?(
          <>
          <Link className={'waves-effect waves-light btn'} to={`/user/edit/${isAuthenticated().user._id}`}>Edit Profile</Link>
          <input onChange={this.handleChange("image")} type="file" accept="image/*" className={'waves-effect waves-light btn'}>Upload Image</input>
          <button onClick={this.uploadImage} className={'waves-effect waves-light yellow light btn'}>Upload</button>
          </>
        ):(
          <>
          <FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>
          </>
        )}
        <ProfileTabs following={this.state.user.following} follower={this.state.user.followers}/>
        <NewPost location={this.state.location}/>
        </div>
      </div>
    );
  }
}

export default Profile;
