import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import NachrichtenListeEintrag from './NachrichtenListeEintrag';

/**
 * Es werden alle Konversationen des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [KonversationListeEintrag]](#konversationlisteeintrag)
 * 
 * Hierfür werden alle Konversationen des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
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

class KonversationListe extends Component {
    constructor(props){
        super(props);

        // console.log(props);
        let expandedID = null;

        if (this.props.location.expandKonversation) {
        expandedID = this.props.location.expandKonversation.getID();
        }

        // initiiere einen leeren state
        this.state = {
            konversationen : [],
            error: null,
            loadingInProgress: false, 
            expandedKonversationID: expandedID,
        };

      // API Anbindung um Vorschläge des Students vom Backend zu bekommen 
    getKonversationen = () => {
      LernpartnerAPI.getAPI().getKonversationen(this.props.currentPerson.id)
      .then(konversationenBOs =>
          this.setState({
              konversationen: konversationenBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  konversationen: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingKonversationenError: null
      });
}
    }

}

// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getKonversationen();
  this.setState({
      currentStudentName: this.props.currentPerson.getname(),
  })
}

 /** 
     * Handles onExpandedStateChange events from the VorschlagListeEintrag component. Toggels the expanded state of 
     * the VorschlagListeEintrag of the given VorschlagBO.
     * 
     * @param {konversation} KonversationBO of the KonversationListeEintrag to be toggeled
     */
  onExpandedStateChange = konversation => {
    // console.log(konversationID);
    // Set expandend Konversation Eintrag to null by default
    let newID = null;

    // If same konversation entry is clicked, collapse it else expand a new one
    if (konversation.getID() !== this.state.expandedKonversationID) {
    // Expand the konservation entry with konversationID
    newID = konversation.getID();
    }
    // console.log(newID);
    this.setState({
    expandedKonversastionID: newID,
    });
}

render() {
  const { classes } = this.props;
        const { konversationen, expandedVorschlagID, error, loadingInProgress}  = this.state; 

        return(

        );
  }

}



/** Component specific styles */
const styles = theme => ({
 
});

/** PropTypes */
KonversationListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}



export default withRouter(withStyles(styles)(KonversationListe));