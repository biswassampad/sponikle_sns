import React,{Component} from 'react';
import {follow,unfollow} from '../functions';


class FollowProfileButton extends Component {

    followClick=()=>{
      this.props.onButtonClick(follow)
    }
    unfollowClick=()=>{
      this.props.onButtonClick(unfollow)
    }

      render() {
      return (
        <div className="inline-block">
          {
            !this.props.following
            ?(

                      <button
                        onClick={this.followClick}
                        >
                      Follow
                      </button>
            ):(

                      <button
                        onClick={this.unfollowClick}
                        >
                      Un-Follow
                      </button>
            )
          }

        </div>
      )
    }
}

export default FollowProfileButton;
