import React,{Component} from 'react';

class ProfileTabs extends Component{
  render(){
    const {following,follower} = this.props;
    return (
      <>
      <div>Followings: {JSON.stringify(following)}</div>
      <div>Followers: {JSON.stringify(follower)}</div>
      </>
    )
  }
}

export default ProfileTabs;
