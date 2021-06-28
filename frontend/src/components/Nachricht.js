import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, Grid, Typography, Divider } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtBO from '../api/NachrichtBO';
//import NachrichtenListeEintrag from './NachrichtenListeEintrag';
//import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import SaveIcon from '@material-ui/icons/Save';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';


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

   // Init an empty state
   this.state = {
     nachrichten: [], 
     nachricht_inhalt: null,
     konversation_id: null,
     personid: null,  
     error: null,
     loadingInProgress: false,
     
   };
 }

 //Öffnet das Dialog-Fenster Nachrichtfrom, wenn der Button geklickt wurde
 addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showNachrichtForm: true
    });
  }

  //Öffnet das Dialog-Fenster Gruppefrom, wenn der Button geklickt wurde
 showGruppeFormButtonClicked = event => {
  event.stopPropagation();
  this.setState({
    showGruppeForm: true
  });
}
 
 // API Anbindung um alle Nachrichten vom Backend zu bekommen 
 getNachrichten= () => {
  LernpartnerAPI.getAPI().getNachrichtenByKonversationByPerson(this.props.currentPerson.getID(), this.props.konversation_id.getID())
    .then((nachrichtenBOs) =>
      this.setState({
        nachrichten: nachrichtenBOs,
        nachricht_inhalt: nachrichtenBOs.nachricht_inhalt,
        personID: nachrichtenBOs.personID,
        konversation_id: nachrichtenBOs.konversation_id,
        loadingInProgress: false,
        error: null,
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
      this.state.nachricht_inhalt,
      this.props.currentPerson.getID(),
      this.props.personID.getID(),
      this.props.konversation_id.getID()
    );

    LernpartnerAPI.getAPI()
      .addNachricht(newNachricht)
      .then((nachricht) => {
        this.state.nachricht.push(nachricht);
        this.setState({ nachricht_inhalt: "" });
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
 
}

//Wird aufgerufen, wenn das Dialog-Fenster Nachrichtform geschlossen wird
nachrichtFormClosed = nachrichten => {
    this.getNachrichten();
    if (nachrichten) {
      const newNachricht = [...this.state.nachrichten, nachrichten];
      this.setState({
        nachrichten: newNachricht,
        filteredNachrichten: [...newNachricht],
        showNachrichtForm: false,
        showGruppeForm: false
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
      const { classes, currentPerson } = this.props;
      const { nachrichten, nachricht_inhalt, loadingInProgress, error } = this.state;
      
      return (
        <div>

          {nachrichten? 
          
          nachrichten.map((nachricht) => {
                {
                  if (nachricht.getCurrentPerson() !== currentPerson.getID()) {
                    return (
                      <div id="empfänger_text">
                        <Grid item
                          xs
                          className={classes.outerColumn}
                          style={{ display: "flex", alignItems: "center", position: "rigth" }}
                        >
                          <Typography>{nachricht.getNachricht_Inhalt()}</Typography>
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
                          position= "left"
                        >
                          <Typography>{nachricht.getNachricht_Inhalt()}</Typography>
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
              label="schreibe eine Nachricht"
              value={nachricht_inhalt}
              onChange={this.handleChange}
            />
          </form>
          <Button className={classes.button_style} variant="outlined" color="primary" onClick={this.handleClose}>
          <ArrowBackIcon/>
          </Button>
          <Button color="primary" variant="contained" onClick={this.addNachricht}>
            senden 
          </Button>

          <Button variant='contained' color='secondary' onClick={this.showGruppeFormButtonClicked}>
              Gruppe erstellen 
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