import React,{Component} from 'react';
import {Main,Heading,Paragraph,Box,Image,Button,Grid,TextInput,CheckBox,Text,Avatar,Menu} from 'grommet';
import {Search,Chat,MoreVertical,Hide,Clipboard,Like,Dislike,Tip} from 'grommet-icons';

import Navbar from '../components/navbar';
import Popup from '../components/makePost';
import Post from '../components/Post';
import SearchPanel from '../components/searchpanel';
class Feed extends Component{
  constructor(props) {
    super();
    this.state = {
      showPopup:false,
    }
  }
  togglePopup=()=>{
  this.setState(
      {   showPopup: !this.state.showPopup }
    )
  }
  render() {
    return(
      <Main pad={"none"} fill>
      <Grid fill rows={["auto", "flex", "auto"]}>
        <Box direction="row" >
            <Navbar />
              <Box width="95vw" className={'dashhero'}>
                <SearchPanel/>
                  <Grid fill rows={["auto", "flex", "auto"]}>
                    <Box direction="row" justify={'between'}>
                      <Box width="25vw" >
                      Biswas
                      </Box>
                      <Box width="40vw" direction="column">
                        <Box className={'postSection'} justify={'between'}>
                            <Box className={'postBox'} pad={'small'} onClick={this.togglePopup.bind(this)} direction={'row-responsive'} gap={'small'}>
                           <Chat /> <Text> What's on your mind ?</Text>
                          </Box>
                          <div>
                            {this.state.showPopup ?
                             <Popup
                              text='Click "Close Button" to hide popup'
                              closePopup={this.togglePopup.bind(this)}
                             />
                             : null
                           }
                          </div>
                        </Box>
                        <Box className={'postsSection'} direction="column" overflow={'scroll'}>
                        <Post/>
                        <Post/>
                        </Box>

                      </Box>
                      <Box width="25vw">
                      Satpathy

                      </Box>
                    </Box>
                  </Grid>
          </Box>
            </Box>
      </Grid>
      </Main>
    )
  }
}

export default Feed;
