import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtenListeEintrag from './NachrichtenListeEintrag';
//import SaveIcon from '@material-ui/icons/Save';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';

import NachrichtenListeEintrag from './NachrichtenListeEintrag';

/**
 * Es werden alle Nachrichten des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [NachrichtenListeEintrag]](#nachrichtenlisteeintrag)
 * 
 * Hierfür werden alle Nachrichten des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
 * 
 */


//Css Style für Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


//Css Style für Tabllen Zeilen
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(4n+1)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


class Nachricht extends Component {

  constructor(props) {
    super(props);

   // console.log(props);
   let expandedID = null;

   if (this.props.location.expandCustomer) {
     expandedID = this.props.location.expandCustomer.getID();
   }

   // Init an empty state
   this.state = {
     nachrichten: '',
     error: null,
     loadingInProgress: false,
     expandedNachrichtID: expandedID,
     showNachrichtForm: false, 
   };
 }

 //Öffnet das Dialog-Fenster Nachrichtfrom, wenn der Button geklickt wurde
 addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showModulForm: true
    });
  }
 
 // API Anbindung um alle Nachrichten vom Backend zu bekommen 
 getNachrichten = () => {
    LernappAPI.getAPI().getNachrichten()
      .then(nachrichtenBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          nachrichten: nachrichtenBOs,
          loadingInProgress: false,   // disable loading indicator 
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch 
            nachrichten: [],
            loadingInProgress: false, // disable loading indicator 
            error: e
          })
        );

this.setState({
    loadingInProgress: true,
    error: null
  });
}

// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getNachrichten();
}

//Wird aufgerufen, wenn das Dialog-Fenster Nachrichtform geschlossen wird
nachrichtFormClosed = modul => {
    this.getNachrichten();
    if (nachricht) {
      const newNachricht = [...this.state.nachrichten, nachricht];
      this.setState({
        nachrichten: newNachricht,
        filteredNachrichten: [...newNachricht],
        showNachrichtForm: false
      });
    } else {
      this.setState({
        showNachrichtForm: false
      });
    }
  }

  nachrichtDeleted = nachricht => {
    const newNachricht = this.state.nachrichten.filter(nachrichtFromState => nachrichtFromState.getID() !== nachricht.getID());
    this.setState({
      nachrichten: newNachricht,
      filteredNachrichten: [...newNachricht],
      showNachrichtenForm: false
    });
  }

 // Rendert die Componente 
 render() {
    const { classes } = this.props;
    const { nachrichten, loadingInProgress, error, showNachrichtForm, expandedNachrichtID} = this.state;

    return (
      <div className={classes.root}>
      <h1>Alle Nachrichten: </h1>
      { 
        // Show the list of NachrichtListeEintrag components
        // Do not use strict comparison, since expandedNachrichtID maybe a string if given from the URL parameters
        nachrichten.map(nachricht =>
          <NachrichtenListeEintrag key={nachricht.getID()} nachricht={nachricht} expandedState={expandedNachrichtID === nachricht.getID()}
            onExpandedStateChange={this.onExpandedStateChange}
          />)
      }
      <LoadingProgress show={loadingInProgress} />
      <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Nachrichten nicht geladen werden!`} onReload={this.getNachrichten} />
     
    </div>
        
    )

}}

// Component specific styles 
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
Nachricht.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}
  

export default withStyles(styles)(Nachricht);