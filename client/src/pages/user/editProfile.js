import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated,readUser,updateUser} from '../../functions';

class Editprofile extends Component{
  constructor(){
    super()
    this.state={
      id:"",
      name:"",
      email:"",
      displayname:"",
      redirectToSignIn:false
    }
  }

  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
  }

  submitForm = (event)=>{
    event.preventDefault()
    const {id,name,email,displayname} = this.state
    const user = {
      name,email,displayname
    }
    console.log('user',user);
    updateUser(user,id)
    .then(data=>{
      if(data.error) this.setState({error:data.error})
      else this.setState({
        name:"",
        email:"",
        displayname:""
      })
    })
  }

  initUser = (userId)=>{
    const token = isAuthenticated().token;
    readUser(userId,token).then(data=>{
      if(data.error){
        this.setState({redirectToSignIn:true})
      }else{
        this.setState({
          id:data._id,
          name:data.name,
          email:data.email,
          displayname:data.displayname
        })
      }
    })
  }
  componentDidMount(){
    console.log('loading user data')
    const userId = this.props.match.params.userId;
    this.initUser(userId);
  }

  editForm=(name,displayname,email)=>{
    return(
        <div>
          <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input placeholder="Name"  type="text" className="validate" value={name} onChange={this.handleChange("name")}/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input placeholder="Email" type="email" className="validate" value={email} onChange={this.handleChange("email")}/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input placeholder="Display Name" type="text" className="validate" value={displayname} onChange={this.handleChange("displayname")}/>
          </div>
        </div>
        <button className="waves-effect waves-light btn" onClick={this.submitForm}>Update</button>
        </form>
      </div>
        </div>
    )
  }
  render(){
    const{email,name,displayname,redirectToSignIn} = this.state;
    if(redirectToSignIn){
    return  <Redirect to={"/signin"}></Redirect>;
    }
    return (
      <div className="container">
      <h2>Edit Profile</h2>
      {this.editForm(name,displayname,email)}
      </div>
    )
  }
}

export default Editprofile;
