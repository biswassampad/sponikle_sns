import React from 'react';
import {Main,Heading,Paragraph,Box,Image,Button,Grid,TextInput,CheckBox} from 'grommet';

import Navbar from '../components/navbar.js';
const Dashboard = () =>(
  <Main pad={"none"} fill>
  <Grid fill rows={["auto", "flex", "auto"]}>
    <Box direction="row" >
        <Navbar />
          <Box width="35vw">
            Dashboard
      </Box>
        </Box>
  </Grid>

  </Main>
)

export default Dashboard;
