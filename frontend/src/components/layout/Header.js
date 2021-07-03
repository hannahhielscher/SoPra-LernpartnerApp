import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, AppBar, Toolbar, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import logo from './Logo.png';

class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
 handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user, currentPerson } = this.props;

    return (
    <div style={{ width: '100%'}}>
      <AppBar style={{ backgroundColor: '#cdb79e'}}>
      <Toolbar>
        <img src={logo} alt="Easy Learn" style={{ width : 150, margin: 5}}/>

        {
          user ?
        <>
        <Box display="flex" flexDirection="row-reverse" justifyContent="flex-end" p={1} marginLeft={40}>
            <Tabs indicatorColor='primary' textColor='tab' variant="fullWidth" onChange={this.handleTabChange} right>
              <Tab label='Profil' component={RouterLink} to={`/meinprofil`}/>
              <Tab label='Lerngruppen' component={RouterLink} to={`/meinelerngruppen`}/>
              <Tab label='Vorschläge' component={RouterLink} to={`/meinevorschlaege`}/>
              <Tab label='Chats' component={RouterLink} to={`/meinechats`}/>
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
         </Box>
         <ProfileDropDown user={currentPerson} />
         </>
         : null
          

          }


      </Toolbar>
      </AppBar>
      <Toolbar />
      </div>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase currentPerson */
  currentPerson: PropTypes.object,
}

export default Header;