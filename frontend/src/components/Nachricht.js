import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography, Paper, CardActions } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtenListeEintrag from './NachrichtenListeEintrag';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import SaveIcon from '@material-ui/icons/Save';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import NachrichtenListeEintrag from './NachrichtenListeEintrag';

/**
 * Es werden alle Nachrichten des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [NachrichtenListeEintrag]](#nachrichtenlisteeintrag)
 * 
 * Hierfür werden alle Nachrichten des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
 * 
 */


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
     inhalt: null,
     personID: null, 
     konversation_id: null, 
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
 getNachrichten= () => {
  LernpartnerAPI.getAPI()
    .getNachrichten(this.props.personID.getID(), this.props.konversation_id.getID())
    .then((nachrichtenBOs) =>
      this.setState({
        nachrichten: nachrichten,
        loadingInProgress: false,
        loadingError: null,
      })
    )
    .catch((e) =>
      this.setState({
        nachrichten: null,
        loadingInProgress: false,
        loadingError: e,
      })
    );
  this.setState({
    loadingInProgress: true,
    loadingError: null,
  });
};

addNachricht = () => {
    let newNachricht = new NachrichtBO(
      this.state.inhalt,
      this.props.personID.getID(),
      this.props.konversation_id.getID()
    );
    LernpartnerAPI.getAPI()
      .addNachricht(newNachricht)
      .then((nachricht) => {
        this.state.nachricht.push(nachricht);
        this.setState({ inhalt: "" });
        // Backend call sucessfull
        // reinit the dialogs state for a new empty nachricht
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
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

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  //nachrichtDeleted = nachricht => {
   // const newNachricht = this.state.nachrichten.filter(nachrichtFromState => nachrichtFromState.getID() !== nachricht.getID());
   // this.setState({
     // nachrichten: newNachricht,
     // filteredNachrichten: [...newNachricht],
     // showNachrichtenForm: false
  //  });}

 // Rendert die Componente 
    render() {
      const { classes, personID, konversation_id } = this.props;
      const { nachrichten, inhalt, personID, konversation_id, loadingInProgress, error, expandedNachrichtID } = this.state;
      if (nachrichten) {
        nachrichten.sort((a, b) => {
          return a.getID() - b.getID();
        });
      }
  
      return (
        <div>
          <h1 class="Gruppenname">
            {konversation_id.getFirstname() + " " + konversation_id.getLastname()}
          </h1>
          {nachrichten
            ? nachrichten.map((nachricht) => {
                {
                  if (nachricht.getPersonID() != personID.getID()) {
                    return (
                      <div id="empfänger_text">
                        <Grid
                          item
                          xs
                          className={classes.outerColumn}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography>{nachricht.getInhalt()}</Typography>
                        </Grid>
                        <Divider />
                      </div>
                    );
                  } 
                  
                  else {
                    return (
                      <div id="sender_text">
                        <Grid
                          item
                          className={classes.outerColumn}
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-end"
                        >
                          <Typography>{nachricht.getInhalt()}</Typography>
                        </Grid>
                        <Divider />
                      </div>
                    );
                  }
                }
              })
            : null}
  
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Bitte Text eingeben"
              value={inhalt}
              onChange={this.handleChange}
            />
          </form>
          <Button className={classes.button_style} variant="outlined" color="primary" onClick={this.handleClose}>
          <ArrowBackIcon/>
          </Button>
          <Button color="primary" variant="contained" onClick={this.addNachricht}>
            senden 
          </Button>

      <LoadingProgress show={loadingInProgress} />
      <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Nachrichten nicht geladen werden!`} onReload={this.getNachrichten} />
      
      </div>
    );

}}

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
  outerColumn: {
    margin: 5,
    padding: 5,
    height: 50,
  },
  button_style: {
    margin: 5,
    padding: 5,
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