import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Es wird ein einzelne Konversationen von einer Person/Gruppe dargestellt
 * 
 * Hierfür werden Profilname, die Nachricht, der Inhalt, die Teilnehmer und die Konversation angezeigt
 * 
 */

//Css Style Klassen für die Tabellen Zellen
/**const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Css Style Klassen für die Tabellen Zeilen
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/

class KonversationListeEintrag extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            konversation: null,
            profil: null,
            teilnehmer: null, 
            nachricht: null, 
            inhalt: null,
            loadingInProgress: false,
            error: null
        };
    }
    
    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
      this.props.onExpandedStateChange(this.props.customer);
      }
      
      //Handles the onClick event of the show profil button
      showProfilButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showCustomerForm: true
        });
      }

    
      // API Anbindung um Nachricht vom Backend zu bekommen 
    getNachricht = () => {
      LernpartnerAPI.getAPI().getNachricht(this.props.nachricht)
      .then(nachrichtBO =>
          this.setState({
            nachricht: nachrichtBO,
            inhalt: nachrichtBO.inhalt,
            profil: nachrichtBO.profil,
            person: nachrichtBO.person,
            konversation: nachrichtBO.konversation,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getNachricht()
            this.getPerson()
            this.getProfil()
          })
          .catch(e =>
              this.setState({
                nachricht: null,
                inhalt: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    // API Anbindung um Teilnehmer vom Backend zu bekommen 
    getKonversation = () => {
      LernpartnerAPI.getAPI().getKonversation(this.props.konversation)
      .then(konversationBO =>
          this.setState({
            teilnehmer: konversationBO.teilnehmer,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getKonversation()
          })
          .catch(e =>
              this.setState({
                konversation: null,
                inhalt: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getKonversation();
}

// Wenn die Componente geupdatet wird
componentDidUpdate(prevProps){
  if((this.props.show) && (this.props.show !== prevProps.show)) {
    this.getKonversation();
  }
}

render() {
  const { classes } = this.props;
  const {nachricht, inhalt, profil, person, konversation,  loadingInProgress, error}

  return(
    <div>

    <LoadingProgress show={loadingInProgress} />
    <ContextErrorMessage error={error} contextErrorMsg = {'Deine Konversationen konnten nicht geladen werden'} onReload={this.getKonversationen} /> 
    </div>
  )

}
  
    
}