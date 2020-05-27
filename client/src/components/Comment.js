import React, { Component } from  'react';
import { Box,Button,TextInput, Text} from 'grommet';
import { Tip,FormClose,Send } from 'grommet-icons';
class Comment extends Component {
    constructor(props){
      super();
      this.state={
        showMask:false,
      }
    }
    toggleMask = () => {
        this.setState({ showMask: !this.state.showMask })
    }

    render() {
      return(
        <div>
        {
            this.state.showMask ?
          (
            <Box direction={'row-responsive'} className={'comment-field'} pad={'small'}>
             <Tip className={'heightAdjust'}/>
            <TextInput  placeholder="Your comment" className={'noborder'} />
            <Send className={'heightAdjust'} color={'#7D4CDB'}/>
            <FormClose className={'heightAdjust'} onClick = { this.toggleMask.bind(this) } color={'red'}/>
            </Box>

          ):(
              <Box className={'postBox'} pad={'small'}  direction={'row-responsive'} gap={'small'}  onClick = { this.toggleMask.bind(this) }>
               <Tip /> <Text>Any thing you want to say.. </Text>
              </Box>
            )}
        </div>


      )
    }
}

export default Comment;
