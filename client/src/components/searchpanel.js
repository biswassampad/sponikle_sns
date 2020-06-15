import React,{Component} from 'react';
import {Box,Button,TextInput} from 'grommet';
import {Search} from 'grommet-icons';
class SearchPanel extends Component{
  constructor(){
    super();
    this.state={
        searchClicked:false,
        inputOpen:false,
        showResult:false
    }
  }
  searchButtonToggle=(event)=>{
    console.log('showing search');
  }
  render(){
    return(
      <Box className="floatingSearchIcon" pad={"small"} elevation={'small'}
         onMouseEnter={this.searchButtonToggle('search')}

        >
        <Search color={'#7D4CDB'}/>
      </Box>
    )
  }
}

export default SearchPanel;
