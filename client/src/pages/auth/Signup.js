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
      open:false
    }
  }
  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
  }
  changeRoute = ()=>{
    window.location.href = '/signin';
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
        accesibility:true,
        error:"",
        name:"",
        email:"",
        displayname:"",
        password:"",
        open:true
      })
    })
  }
  validateUser=()=>{
    console.log('validating user');
    let displayname = this.state.displayname;
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
                    <form>
                  <TextInput type="text"
                    className={'signupInput animate__animated animate__fadeInUp'}
                    placeholder={'Full Name here...'}
                    icon={<User className={'animate__animated animate__fadeInUp'}
                    color={'#7D4CDB'}/>} reverse size={'medium'}
                    required/>
                    <TextInput type="email"
                      className={'signupInput animate__animated animate__fadeInUp'}
                      placeholder={'Email id here...'}
                      icon={<Mail className={'animate__animated animate__fadeInUp'}
                      color={'#7D4CDB'}/>}
                      reverse size={'medium'}
                      required/>
                    <TextInput type="text"
                      className={'signupInput animate__animated animate__fadeInUp'}
                      placeholder={'Display Name here...'}
                      icon={<UserNew className={'animate__animated animate__fadeInUp'}
                      color={'#7D4CDB'}/>}
                      reverse
                      size={'medium'}
                      required
                      onChange={()=>this.validateUser()}
                      />
                  <TextInput type="password"
                    className={'signupInput animate__animated animate__fadeInUp'}
                    placeholder={'Password here...'}
                    icon={<License className={'animate__animated animate__fadeInUp'}
                    color={'#7D4CDB'}/>}
                    reverse
                    size={'medium'}
                    required/>
                  <CheckBox label="By accepting this you do agree with sponikle's Terms and Conditions" required/>
                  <Button
                    margin={'medium'}
                    primary
                    label={"Let's Dive In"}
                    icon={<Magic  className={'animate__animated animate__zoomIn'}/>}
                    reverse size={'large'}
                    className={'animate__animated animate__zoomIn'}/>

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
            <h2>This country does not have permission to visit this website</h2>
          )
        }
      </div>
    )
  }
}


export default Signup;
