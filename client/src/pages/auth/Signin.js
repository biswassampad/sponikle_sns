import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Main,Heading,Paragraph,Box,Image,Button,Grid,TextInput} from 'grommet';
import {Mail,License,Unlock} from 'grommet-icons';

import {signin,authenticate} from './../../functions';
import lgbg from '../../resources/backgrounds/lgbg.png';
import navlogo from '../../resources/logos/nav_logo.png';
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

  changeRoute = ()=>{
    window.location.href = '/signup';
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
    <Main pad={"none"} fill>
    <Grid fill rows={["auto", "flex", "auto"]}>
      <Box direction="row" >
            <Box width="35vw" >
              <Box margin={'large'} className={'loginInpSec'}>
                <Heading margin="medium" color={'#7D4CDB'} className={'loginheader animate__animated animate__fadeInDown'}>Welcome Back !!</Heading>
                <TextInput type="text" className={'loginInput animate__animated animate__fadeInUp'} placeholder={'Email id here...'} icon={<Mail className={'animate__animated animate__fadeInUp'} color={'#7D4CDB'}/>} reverse size={'medium'}/>
                <TextInput type="password" className={'loginInput animate__animated animate__fadeInUp'} placeholder={'Password here...'} icon={<License className={'animate__animated animate__fadeInUp'}  color={'#7D4CDB'}/>} reverse size={'medium'}/>
                <Button margin={'medium'} primary label={"Login"} icon={<Unlock  className={'animate__animated animate__zoomIn'}/>} reverse size={'large'} className={'animate__animated animate__zoomIn'}/>
              </Box>
              <Box margin={'medium'} justify={"center"} gap={"small"} direction={"row-responsive"} >
                <Paragraph margin={'small'} size={'medium'}   className={'clickable animate__animated animate__fadeInUp'} color={'#7D4CDB'} onClick={this.changeRoute}>Create New Account</Paragraph><Paragraph margin={'small'} size={'medium'}   className={'animate__animated animate__fadeInUp'} color={'red'}>Forgot Password</Paragraph>
              </Box>
            </Box>
            <Box overflow="auto" width="large">
              <Box pad={"medium"} justify={"end"} gap={"large"} direction={"row-responsive"}>
                <Image
              src={navlogo}
              className="navlogo"
            />
              </Box>
              <Image
            src={lgbg}
            className="lgbg"
          />
            </Box>
          </Box>
    </Grid>

    </Main>
    )
  }
}


export default Signin;
