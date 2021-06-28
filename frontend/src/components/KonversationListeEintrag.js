import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import Nachricht from './Nachricht';
//import KonversationListe from './KonversationListe';
import LernpartnerAPI from '../api/LernpartnerAPI'


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
            showKonversation: false,
            showChatVerlassenForm: false, 
            //showProfil: false,
        };
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

      /** Konversation holen fürs Löschen */
  getKonversation = () => {
    LernpartnerAPI.getAPI().getKonversationenByPerson(this.props.currentPerson.getID(), this.props.konversation_id)
    .then(konversationenBOs => {
      this.setState({
        konversation: konversationenBOs,
      });
    }).catch(e =>
      this.setState({
        konversation: null,
      })
    );
  }

    /** Handles the onClick event of the delete konversation button */
    loescheKonversationButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showKonversationLoeschenDialog: true
        });
    }

    /** Handles the onClose event of the KonversationGeloeschtDialog */
    loescheKonversationDialogClosed = (konversation) => {
      // if konversation is not null, delete it
      if (konversation) {
        this.props.onKonversationDeleted(konversation);
    };

    // Don´t show the dialog
        this.setState({
          showCustomerKonversationLoeschenDialog: false
    });
  }

      // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getKonversation();
    }

render() {
  const { classes, expandedState, currentPerson} = this.props;
  const { konversation, showKonversation, showChatVerlassenForm } = this.state;
  console.log(konversation)
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
                        <Button color='primary' onClick={this.showProfilButtonClicked}>
                          Chat ansehen
                        </Button>
                        <Button color='secondary' onClick={this.sendAnfrageButtonClicked}>
                          Chat verlassen
                        </Button>
                        <Button color='secondary' onClick={this.loescheKonversationButtonClicked}>
                          Chat löschen
                        </Button>
                </ButtonGroup>
                </ButtonGroup>
              </AccordionDetails>
              </Accordion>
              <Nachricht show={showKonversation} konversationid = {konversation.getID()}/> 
            </div>
    
  )
  
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
}



export default withStyles(styles)(KonversationListeEintrag);