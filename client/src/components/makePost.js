import React,{useState} from 'react';
import {useRef} from 'reactn';
import { Box,Button,TextInput, Text,Tabs,Tab,TextArea,RadioButton,Image} from 'grommet';
import{Close} from 'grommet-icons';

class Popup extends React.Component {
  constructor(){
    super();
    this.state={
      uploadImage:""
    }
  }
  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
    console.log('thisImage',this.state.uploadImage);
  }
  render() {
    return (
      <Box className='popup'>
        <Close onClick={this.props.closePopup} color={'white'}/>
        <Box className='popup_inner' animation={'zoomIn'}>
          <Tabs>
          <Tab title="Text">
            <Box pad="medium">
              <TextArea
     placeholder="What's on your mind....." fill resize={false} className={'postTextHolder'} focusIndicator={false}/>
   <Box direction={'row-responsive'} gap={'xlarge'} align={'end'}>
    <Button primary label="Done" size={'medium'} className={'uploadButton'}/>

    </Box>
            </Box>
          </Tab>
          <Tab title="Image">
            <Box pad="medium">
              <TextArea placeholder="Tell something about the pictures.." fill resize={false} className={'postImageTextHolder'} focusIndicator={false}/>

                {
                  this.state.uploadImage?(
                    <Box>
                      <Image src={this.state.uploadImage}/>
                     </Box>
                  ):(
                    <Box>
                        <input type='file' className={'postImage'} onChange={this.handleChange('uploadImage')}></input>
                    </Box>
                  )
                }
                <Box direction={'row-responsive'} gap={'xlarge'} align={'end'}>
                <Button primary label="Done" size={'medium'} className={'uploadButton'}/>
              </Box>
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </Box>
    );
  }
}

export default Popup;
