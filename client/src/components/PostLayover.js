import React from 'react';

class PostLayover extends React.Component {
  render() {
    return (
      <div className='postLayOver'>
        <div className='postLayOver_inner'>
          <h1>Check Your postt</h1>
        <button onClick={this.props.closeLayover}>close me</button>
        </div>
      </div>
    );
  }
}

export default PostLayover;
