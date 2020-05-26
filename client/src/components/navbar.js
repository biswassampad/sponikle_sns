import React from 'react';
import {Main,Box,Grid,Avatar} from 'grommet';
import {Ad,Home,Notification,UserExpert,Logout,Configure} from 'grommet-icons';

const Navbar = ()=>{
  return(
    <Box width="4vw" border={true} background={'#7D4CDB'} className={'dashboard_sidenav'} animation={'fadeIn'} direction={'column'}>
      <Box className={'dn_logo_con'} elevation={'medium'} justify="center">
        Logo
      </Box>
      <Box className={'nav_sec'}>
        <Box className={'nav_link clickable'}>
          <Ad color={'#F8F8F8'} className={'nav_icon'} size={'medium'}/>
        </Box>
        <Box className={'nav_link clickable'}>
          <Home color={'#F8F8F8'} className={'nav_icon'} size={'medium'}/>
        </Box>
        <Box className={'nav_link clickable'}>
          <Notification color={'#F8F8F8'} className={'nav_icon'} size={'medium'}/>
        </Box>
        <Box className={'nav_link clickable'}>
          <UserExpert color={'#F8F8F8'} className={'nav_icon adjustleft'} size={'medium'}/>
        </Box>
        <Box className={'nav_link clickable'}>
          <Configure color={'#F8F8F8'} className={'nav_icon adjustleft'} size={'medium'}/>
        </Box>
      </Box>

      <Box className={'user_ops_nav'}>
        <Box className={'nav_link clickable'}>
          <Logout color={'#F8F8F8'} className={'nav_icon adjustleft'} size={'medium'}/>
        </Box>
        <Box direction="row"  gap="small"><Avatar src="https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373_1280.jpg" size={'medium'}/>
      </Box>
      </Box>
    </Box>
  )
}

export default Navbar;
