import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

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
     nachrichten: [],
     filteredNachrichten: [],
     nachrichtFilter: '',
     error: null,
     loadingInProgress: false,
     expandedNachrichtID: expandedID,
     showNachrichtForm: false,
     showDeleteForm: false
   };
 }

 //Öffnet das Dialog-Fenster Nachrichtfrom, wenn der Button geklickt wurde
 addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showModulForm: true
    });
  }
 
 // API Anbindung um alle Module vom Backend zu bekommen 
 getNachrichten = () => {
    LernappAPI.getAPI().getNachrichten()
      .then(nachrichtenBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          nachrichten: nachrichtenBOs,
          filteredNachrichten: [...nachrichtenBOs], // store a copy
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
    const {  loadingInProgress, error, nachrichtFilter, filteredNachrichten, showNachrichtForm} = this.state;

    return (
     
    );

}

// Component specific styles 
const styles = theme => ({

});

/** PropTypes */
Nachricht.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
  }
  
  export default withRouter(withStyles(styles)(Nachricht));