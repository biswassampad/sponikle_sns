import React,{Component} from 'react';
import {Main,Heading,Paragraph,Box,Image,Button,Grid,TextInput,CheckBox,Text,Avatar,Menu} from 'grommet';
import {Search,Chat,List,Hide,Clipboard} from 'grommet-icons';

import Navbar from '../components/navbar';
import Popup from '../components/makePost';


class Feed extends Component{
  constructor(props) {
    super();
    this.state = {
      showPopup:false
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
              <Box width="95vw">
                <Box direction="row-responsive" className={'searchNav'} alignContent={'end'}>
                <Box border={true} direction="row-responsive" className={'searchplace'}>
                  <TextInput placeholder={'What you are looking for ?'} className={'searchInput'}/>
                  <Box>
                    <Search  />
                  </Box>

                </Box>
                </Box>
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
                        <Box className={'postsSection'} width="40vw">
                          <Box className={'postsSecChild'} width="41vw">
                          <Box className={'postContainer'}>
                            <Box className={"post"} background="url(https://cdn.pixabay.com/photo/2020/05/22/07/59/girl-5204296_1280.jpg)">
                              <Box direction={'row'} className={'userDetails'} direction={'row'} pad={'small'}>
                                <Avatar src="https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373_1280.jpg" size={'medium'}/>
                                <Box className={'post_creds'} gap={'xlarge'} direction={'row-responsive'}>
                                  <Text class={'post_owner'} size={'large'} truncate color={'white'}>Biswas Sampad</Text>
                                    <Text truncate size={'small'} color={'white'}>Yesterday,9.30Pm</Text>
                                  <Menu
                                   icon={<List color={'black'}/>}
                                   className={'post_ops'}
                                   alignSelf={'end'}
                                   background={'black'}
                                   color={'white'}
                                   size={'small'}
                                   items={[
                                     { icon: <Hide/>, href: '#' },
                                     { icon: <Clipboard/>, href: '#' },
                                   ]}
                                 />
                                </Box>
                              </Box>
                              <Box direction={'row'} className={'bottomShading'}>
                              </Box>
                            </Box>
                          </Box>
                          </Box>

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
