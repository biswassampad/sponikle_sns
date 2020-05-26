import React,{useState} from 'react';
import {useSpring,animated} from 'react-spring';
import {Grommet,Main,Heading,Paragraph,Box,Image,Button} from 'grommet';
import { Deploy,Article } from 'grommet-icons';

import background from './../resources/backgrounds/front.svg';
import navlogo from './../resources/logos/nav_logo.png';
const Home = () =>{

  const fade = useSpring({
      from:{
        opacity:0
      },
      to:{
        opacity:1
      }
  })

  return (
    <Main pad={"none"}>
      <Box pad={"medium"} justify={"end"} gap={"large"} direction={"row-responsive"}>
        <Image
      src={navlogo}
      className="navlogo"
    />
      </Box>
      <Box pad={"large"}>
        <animated.div style={fade} className={'hero_main'}>
        <Heading
          color={'#7D4CDB'}
          size="xlarge"
          className={'animate__animated animate__fadeInDown'}
          >Welcome to Sponikle</Heading>
        <Paragraph margin={'small'} size={'large'}   className={'animate__animated animate__fadeInUp'}>The Social Networking Re-defined</Paragraph>
        </animated.div>
      </Box>
      <Box pad={"medium"} justify={"end"} gap={"small"} direction={"row-responsive"} overflow={"hidden"}>
        <Button primary margin={'medium'} size={"large"} label="Launch" icon={<Deploy />} reverse className={'animate__animated animate__slideInLeft'} href={"/signin"}></Button>
        <Button primary margin={'medium'} size={"large"} label="Documentations" icon={<Article />} reverse color={'#00C781'} className={'animate__animated animate__slideInRight'}></Button>
      </Box>
      <Box pad={"medium"} justify={"end"} gap={"small"} direction={"row-responsive"} overflow={"hidden"}>
          <Paragraph margin={'small'} size={'medium'}   className={'animate__animated animate__fadeInUp'}>With &#9829; From Krishna Cyber Febrications - &#169; 2020</Paragraph>
        </Box>
</Main>

  )
}

export default Home;
