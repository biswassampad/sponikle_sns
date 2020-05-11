import React,{Component} from 'react';
import {getUsrList} from '../../functions';

class User extends Component{

  constructor(){
    super()
    this.state={
      users:[]
    }
  }

  componentDidMount = () =>{
      getUsrList().then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          this.setState({users:data});
        }
      })
  }

  render(){
    const {users} = this.state;
    return (
      <div className="container">
        <h2>Users</h2>
        <div className="card">{
          users.map((user,i)=>{
            return (
              <div key={i}>
              <p>{user.name}</p>
              </div>
            );            
          })}</div>
      </div>
    )
  }
}

export default User;
