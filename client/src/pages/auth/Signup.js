import React ,{Component} from 'react';
import {Main,Heading,Paragraph,Box,Image,Button,Grid,TextInput,CheckBox} from 'grommet';
import {Mail,License,Unlock,User,UserNew,Magic} from 'grommet-icons';

import subg from '../../resources/backgrounds/subg.png';
import navlogo from '../../resources/logos/nav_logo.png';

import {signUp,getCountry,valiDateUser} from './../../functions';
class Signup extends Component{

  constructor(){
    super();
    this.state={
      name:"",
      email:"",
      password:"",
      displayname:"",
      error:"",
      open:false,
      validationerror:false,
      otherError:false,
      success:false,
      errorMessage:"",
      agreetoterms:false,
      looksgood:false
    }
  }
  handleChange = (name)=>(event)=>{
    if(name == "agreetoterms"){
      this.setState({
        [name]:true
      })
    }else{
      this.setState({[name]:event.target.value});
    }
    }
  changeRoute = ()=>{
    window.location.href = '/signin';
  }

  submitForm = (event)=>{
    const {name,email,displayname,password,agreetoterms} = this.state;
    this.setState({
      validationerror:false,
      otherError:false,
      success:false,
      errorMessage:"",
      agreetoterms:false,
      looksgood:false
    })
    if(name && email && displayname && password){
      console.log('agree',agreetoterms);
    if(agreetoterms== true){
      const user = {
        name,email,displayname,password
      }
      valiDateUser(displayname)
      .then(response => {
        if(response.message == 'Display Name is valid'){
          this.setState({
            looksgood:true
          })
          setTimeout(()=>{
            this.setState({
              looksgood:false
            })
          },1000)
          signUp(user)
          .then(data=>{
            if(data.error) this.setState({error:data.error})
            else {
              this.setState({
                accesibility:true,
                error:"",
                name:"",
                email:"",
                displayname:"",
                password:"",
                success:true,
              })
                setTimeout(()=>{
                  window.location.href="/signin";
                },3000)
            }
          })
        }else{
          this.setState({
            validationerror:true
          })
        }
      })
    }else{
      this.setState({
        otherError:true,
        errorMessage:"Please agree to the terms & Conditions"
      })
    }
    }else{
        this.setState(
        { otherError:true ,
          errorMessage:'Please fill all the details'
        }
      )
    }

  }
  validateUser=(name)=>(event)=>{
    console.log('validating user');
    this.setState({
      [name]:event.target.value
    })
    let displayname = event.target.value;
    valiDateUser(displayname)
    .then(response=>{
      console.log('response',response);
    })
  }
  componentDidMount() {
    getCountry()
    .then(location=>{
      if(location.location.country == "PK" || location.location.country == "BD" ||location.location.country == "CN"){
        this.setState({
          accesibility:false
        })
      }else{
        this.setState({
          accesibility:true
        })
      }
    })
}

  render(){
    const {name,email,password,error,open} = this.state;
    return (
      <div>
        {
          this.state.accesibility?(
            <Main pad={"none"} fill>
            <Grid fill rows={["auto", "flex", "auto"]}>
              <Box direction="row" >
                    <Box width="60vw" >
                      <Box pad={"medium"} justify={"start"} gap={"large"} direction={"row-responsive"}>
                        <Image
                      src={navlogo}
                      className="navlogo"
                    />
                      </Box>
                      <Image
                    src={subg}
                    className="lgbg"
                  />
                    </Box>
                    <Box  width="35vw">

                  <Box margin={'large'} className={'signupInSec'}>
                    <Heading margin="medium" color={'#7D4CDB'} className={'signupHeader animate__animated animate__fadeInDown'}>Sponikle Welcomes You !!</Heading>

                    <div>
                      {
                        this.state.success?(
                          <Box className={'successMessage'} elevation={'small'}>Account Created Successfully</Box>
                        ):("")
                      }
                      {
                        this.state.validationerror?(
                          <Box className={'warningmessage'} elevation={'small'}>Display Name is already taken.</Box>
                        ):("")
                      }
                      {
                        this.state.otherError?(
                          <Box className={'errormessage'} elevation={'small'}>{this.state.errorMessage}</Box>
                        ):("")
                      }
                      {
                        this.state.looksgood?(
                          <Box className={'successMessage'} elevation={'small'}>Display name looks good </Box>
                        ):("")
                      }
                    </div>
                    <form>

                  <TextInput type="text"
                    className={'signupInput animate__animated animate__fadeInUp'}
                    placeholder={'Full Name here...'}
                    icon={<User className={'animate__animated animate__fadeInUp'}
                    color={'#7D4CDB'}/>} reverse size={'medium'}
                    required
                    onChange={this.handleChange('name')}
                    />
                    <TextInput type="email"
                      className={'signupInput animate__animated animate__fadeInUp'}
                      placeholder={'Email id here...'}
                      icon={<Mail className={'animate__animated animate__fadeInUp'}
                      color={'#7D4CDB'}/>}
                      reverse size={'medium'}
                      required
                      onChange={this.handleChange('email')}
                      />
                    <TextInput type="text"
                      className={'signupInput animate__animated animate__fadeInUp'}
                      placeholder={'Display Name here...'}
                      icon={<UserNew className={'animate__animated animate__fadeInUp'}
                      color={'#7D4CDB'}/>}
                      reverse
                      size={'medium'}
                      required
                      onChange={this.handleChange('displayname')}
                      />
                  <TextInput type="password"
                    className={'signupInput animate__animated animate__fadeInUp'}
                    placeholder={'Password here...'}
                    icon={<License className={'animate__animated animate__fadeInUp'}
                    color={'#7D4CDB'}/>}
                    reverse
                    size={'medium'}
                    required
                    onChange={this.handleChange('password')}
                    />
                  <CheckBox label="By accepting this you do agree with sponikle's Terms and Conditions" required onChange={this.handleChange('agreetoterms')}/>
                  <Button
                    margin={'medium'}
                    primary
                    label={"Let's Dive In"}
                    icon={<Magic  className={'animate__animated animate__zoomIn'}/>}
                    reverse size={'large'}
                    className={'animate__animated animate__zoomIn'} onClick={this.submitForm}/>

                  </form>
                </Box>
                  <Box margin={'medium'} justify={"center"} gap={"small"} direction={"row-responsive"} >
                    <Paragraph
                      margin={'small'}
                      size={'medium'}
                      className={'clickable animate__animated animate__fadeInUp'}
                      color={'#7D4CDB'} onClick={this.changeRoute}>Wrong Place ? Wanna Login?</Paragraph>
                  </Box>
                    </Box>

                  </Box>
            </Grid>

            </Main>
          ):(
            <>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            </>
          )
        }
      </div>
    )
  }
}


export default Signup;
