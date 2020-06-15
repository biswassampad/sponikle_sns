import React,{useState} from 'react';
import {useRef} from 'reactn';
import { Box,Button,TextInput, Text,Tabs,Tab,TextArea,RadioButton,Image} from 'grommet';
import{Close} from 'grommet-icons';

class Popup extends React.Component {
  constructor(){
    super();
    this.state={
      uploadImage:"",
      postText:"",
      inProcess:false
    }
  }
  handleChange = (name)=>(event)=>{
    this.setState({[name]:event.target.value});
    if(event.target.type=="file"){
      let file = event.target.files[0];
      this.readDataAsUrl(file)
      .then((result)=>{
        this.setState({
          uploadImage:result
        })
      }).catch((error)=>{
        console.error('err',error);
      })
    }
  }
  readDataAsUrl = (file)=>{
    return new Promise((resolve, reject) => {
  const fr = new FileReader()
  fr.onerror = reject
  fr.onload = function () {
    resolve(fr.result)
  }
  fr.readAsDataURL(file)
})
  }
  clearImage=()=>{
    console.log('clearing image');
    this.setState({
        uploadImage:""
    })
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
     placeholder="What's on your mind....." fill resize={false} className={'postTextHolder'} focusIndicator={false} onChange={this.handleChange('postText')}/>
   <Box direction={'row-responsive'} gap={'xlarge'} align={'end'}>
    <Button primary label="Done" size={'medium'} className={'uploadButton'} onClick={this.uploadPost}/>

    </Box>
            </Box>
          </Tab>
          <Tab title="Image">
            <Box pad="medium">
              <TextArea placeholder="Tell something about the pictures.." fill resize={false} className={'postImageTextHolder'} focusIndicator={false}/>

                {
                  this.state.uploadImage?(
                    <Box>
                      <Close onClick={()=>this.clearImage()}/>
                      <Image src={this.state.uploadImage} className={'postUploadImage'}/>
                     </Box>
                  ):(
                    <Box>
                        <input type='file' className={'postImage'} onChange={this.handleChange('postImage')}></input>
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
