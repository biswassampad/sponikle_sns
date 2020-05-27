import React, { Component } from 'react';
import { Main, Heading, Paragraph, Box, Image, Button, Grid, TextInput, CheckBox, Text, Avatar, Menu } from 'grommet';
import { Search, Chat, MoreVertical, Hide, Clipboard, Like, Dislike, Tip } from 'grommet-icons';

import Postlayover from './PostLayover';
import Comment from './Comment';

class Post extends Component {
    constructor(props) {
        super();
        this.state = {
            showLayover: false
        }
    }
    toggleLayover = () => {
        this.setState({ showLayover: !this.state.showLayover })
    }
    render() {
            return ( <>
                    <Box className = { 'postContainer' }
                    elevation = { 'small' } >
                    <Box className = { "post" }
                    background = "url(https://cdn.pixabay.com/photo/2020/05/22/07/59/girl-5204296_1280.jpg)"
                  >
                    <Box direction = { 'row' }
                    className = { 'userDetails' }
                    direction = { 'row' }
                    pad = { 'small' } >
                    <Avatar src = "https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373_1280.jpg"
                    size = { 'medium' }/>
                    <Box className = { 'post_creds' }
                    gap = { 'xlarge' }
                    direction = { 'row-responsive'}>
                    <Text className = { 'post_owner'}
                    size = {'large'}
                    truncate color = {'white'}> Biswas Sampad </Text>
                  <Box direction = {'row-responsive'}
                    alignment = {'end'}
                    className = {'time_ops' } >
                    <Text truncate size = { 'small' }
                    color = { 'white' } > Yesterday, 9.30 Pm </Text>
                    <Menu icon = { <MoreVertical color = { '#7D4CDB' } />}
                        className = { 'post_ops' }
                        alignSelf = { 'end' }
                        background = { 'black' }
                        size = { 'small' }
                        items = {
                            [{icon: <Hide color = { 'green' }/>, href: '#' },
                             {icon: <Clipboard color = { 'red' }/>, href: '#' },]}/>
                           </Box>
                           </Box>
                           </Box>
                           <Box direction = { 'row' }
                                className = { 'bottomShading' } alignContent={"end"}>
                                <Box className={'viewButton'}   onClick = { this.toggleLayover.bind(this) } >View Post</Box>
                                </Box>
                                </Box>
                                <Box className = { 'text_container' }
                                margin = { 'small' } >
                                <Text truncate > Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean euismod enim quis commodo dapibus.Etiam vestibulum ullamcorper lectus, quis elementum lacus malesuada a.Integer ultricies, mauris nec mattis vehicula, metus ligula aliquet metus, ac venenatis nisl turpis in erat.Ut ut porta dui. < /Text>
                                </Box>
                                <Box className = { 'icons_container' }
                                margin = { 'small' }
                                direction = { 'row-responsive' }
                                gap = { 'large' } >
                                <Box direction = { 'row-responsive' }
                                gap = { 'medium' } >
                                <Like /> <Dislike /> <Tip />
                                </Box>
                                <Box direction = { 'row-responsive' }
                                gap = { 'small' }
                                className = { 'addpaddings' } >
                                <Text size={'small'}> 12 Comments ,< /Text>
                                <Text size={'small'}>36 Likes</Text> <Text size={'small'}> 10 Dislikes </Text>
                                </Box>
                                </Box>
                                <Box className = { 'commentSection' } >
                                  <Comment/>
                                  </Box> </Box>

                                <div> {
                                    this.state.showLayover ?
                                    <Postlayover
                                    text = 'Click "Close Button" to hide popup'
                                    closeLayover = { this.toggleLayover.bind(this) }/> :null}
                                    </div>
                              </>
                            )
                        }
                    }

                    export default Post;
