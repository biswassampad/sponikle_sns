import React ,{Component} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import {signUp} from './../../functions';
class Signup extends Component{

  constructor(){
    super();
    this.state={
      name:"",
      email:"",
      password:"",
      displayname:"",
      error:"",
      open:false
    }
  }
  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
  }
  submitForm = (event)=>{
    event.preventDefault()
    const {name,email,displayname,password} = this.state
    const user = {
      name,email,displayname,password
    }

    signUp(user)
    .then(data=>{
      if(data.error) this.setState({error:data.error})
      else this.setState({
        error:"",
        name:"",
        email:"",
        displayname:"",
        password:"",
        open:true
      })
    })
  }

  render(){
    const {name,email,password,error,open} = this.state;
    return (
      <div>
        <h2>Signup</h2>
        <form>
        <Input placeholder="Full Name" type="text" onChange={this.handleChange("name")} value={this.state.name}></Input>
        <Input placeholder="email" type="email" onChange={this.handleChange("email")} value={this.state.email}></Input>
        <Input placeholder="Display Name" type="text" onChange={this.handleChange("displayname")} value={this.state.displayname}></Input>
        <Input placeholder="password" type="password" onChange={this.handleChange("password")} value={this.state.password}></Input>
        <Button color={"primary"} onClick={this.submitForm}>Register</Button>
        </form>
        <p>{error}</p>
        <p style={{display:open ? "":"none"}}>
          Account has been created ,Please Login to continue.
        </p>
      </div>
    )
  }
}


export default Signup;
