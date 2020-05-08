import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import {signin,authenticate} from './../../functions';

class Signin extends Component{

  constructor(){
    super();
    this.state={
      email:"",
      password:"",
      error:"",
      redirectToReferer:false,
      loading:false
    }
  }
  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
  }

  submitForm = (event)=>{
    event.preventDefault();
    this.setState({loading:true});
    const {email,password} = this.state;
    const user = {
    email,password
    }

    signin(user)
    .then(data=>{
      if(data.error){
        this.setState({error:data.error,loading:false})
      }else{
        // authenticate user
        authenticate(data,()=>{
          this.setState({redirectToReferer:true,loading:false})
        })
        // redirect
      }
    })
  }

  render(){
    const {email,password,error,redirectToReferer,loading} = this.state;
    if(redirectToReferer){
      return <Redirect to="/dashboard" />
    }
    return (
      <div>
        <h2>Signin</h2>
        <form>
          <Input placeholder="email" type="email" onChange={this.handleChange("email")} value={this.state.email}></Input>
        <Input placeholder="password" type="password" onChange={this.handleChange("password")} value={this.state.password}></Input>
        <Button color={"primary"} onClick={this.submitForm}>jumpin</Button>
        </form>
        <p>{error}</p>
        {loading ? (
          <p>Loading.........</p>
        ):("")}
      </div>
    )
  }
}


export default Signin;
