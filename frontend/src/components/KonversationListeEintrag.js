import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Link } from '@material-ui/core';
import Nachricht from './Nachricht';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
//import KonversationListe from './KonversationListe';
import LernpartnerAPI from '../api/LernpartnerAPI';



/** 
 * 
 * Es wird ein einzelne Konversationen von einer Person dargestellt
 * 
 * Hierfür wird der Name der Konversation angezeigt
 * 
 */

class KonversationListeEintrag extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            konversation: this.props.konversation,
            konversationID: this.props.konversation.id,
            showKonversation: false,
            showChatVerlassenForm: false, 
            teilnahmeChat: null,
            //showProfil: false,
        };
    }

// API Anbindung um Konversationen des Students vom Backend zu bekommen 
  getTeilnahmeChat = () => {
    LernpartnerAPI.getAPI().getTeilnahmeChatByKonversationAndPerson(this.state.konversationID, this.props.currentPerson.getID())
    .then(teilnahmeBO =>
        this.setState({
            teilnahmeChat: teilnahmeBO,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                teilnahmeChat: null,
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
        loadingKonversationenError: null
    });
  }
    

/** Handles onChange events of the underlying ExpansionPanel */
expansionPanelStateChanged = () => {
  this.props.onExpandedStateChange(this.props.konversation);
  }

//Handles the onClick event of the show Konversation button
showKonversationButtonClicked = (event) => {
  this.setState({
    showKonversation: true
  });
}

//Handles the onClick event of the show Konversation button
verlassenButtonClicked = (event) => {
  this.setState({
    showChatVerlassenForm: true
  });
}

  
 
  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
      this.getTeilnahmeChat();
  }


render() {
  const { classes, expandedState, currentPerson} = this.props;
  const { teilnahmeChat, konversationID, konversation, showKonversation, showChatVerlassenForm } = this.state;
  console.log(currentPerson)
  console.log(konversation)
  console.log(teilnahmeChat)
  return(
    <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`konversation${konversation.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Typography variant='body1'>
                  {konversation.getname()}
              </Typography>
            </Grid>
              <Typography variant='body1'>
                  Optionen
              </Typography>
              </AccordionSummary>
                <AccordionDetails>
                <ButtonGroup variant='text' size='small'>
                <Link component={RouterLink} to={{
                pathname: '/chat',
                test: {konversationID: konversationID}
                }} >
                  
                <Button color='primary' onClick={this.showKonversationButtonClicked}>
                          Chat ansehen
                </Button>
                </Link>
                        
                        <Button color='secondary' onClick={this.deleteChatButtonClicked}>
                          Chat verlassen
                        </Button>
                </ButtonGroup>
              </AccordionDetails>
              </Accordion>
             
            </div>
            
        );
  
}
  
    
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  customerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
KonversationListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
  currentPerson: PropTypes.object.isRequired,
  konversation: PropTypes.object.isRequired,
}



export default withStyles(styles)(KonversationListeEintrag);