import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, Grid, Typography, Divider, Link } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtBO from '../api/NachrichtBO';
import { Link as RouterLink } from 'react-router-dom';
import GruppenForm from './dialogs/GruppenForm';
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
     neueNachricht: null,
     konversation_id: null,
     personid: null,  
     error: null,
     loadingInProgress: false,
     konversationID: 2,
     showKonversationListe: false,
     showLerngruppeForm: false
    
     
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
  getNachrichten = () => {
     LernpartnerAPI.getAPI().getNachrichtenByKonversation(this.state.konversationID)
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
      this.state.neueNachricht,
      this.props.currentPerson.getID(),
      this.state.konversationID
    );
    LernpartnerAPI.getAPI().addNachricht(newNachricht)
    .then(() => {
        this.getNachrichten();
        this.setState({
          neueNachricht: "",
        })
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

  clearneueNachricht = () => {
    this.setState({
      neueNachricht: null,
    })
  }

  handleChange = (event) => {
    this.setState({neueNachricht: event.target.value});
  };

  /** Handles the onClick event of the edit customer button */
  showGruppeFormButtonClicked= (event) => {
    event.stopPropagation();
    this.setState({
      showLerngruppeForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  lerngruppeFormClosed = (lerngruppe) => {
    // customer is not null and therefor changed
    if (lerngruppe) {
      this.setState({
        lerngruppe: lerngruppe,
        showLerngruppeForm: false
      });
    } else {
      this.setState({
        showLerngruppeForm: false
      });
    }
  }

  //nachrichtDeleted = nachricht => {
   // const newNachricht = this.state.nachrichten.filter(nachrichtFromState => nachrichtFromState.getID() !== nachricht.getID());
   // this.setState({
     // nachrichten: newNachricht,
     // filteredNachrichten: [...newNachricht],
     // showNachrichtenForm: false
  //  });}

 // Rendert die Componente 
    render() {
      const { classes, currentPerson, konversation } = this.props;
    
      const { showLerngruppeForm, neueNachricht, nachrichten, nachricht_inhalt, loadingInProgress, error } = this.state;
      
      return (
        <div>
          { 
          nachrichten ? 
          
          nachrichten.map((nachricht) => {
                {
                  if (nachricht.person_id !== currentPerson.getID()) {
                    return (
                      <div id="empfänger_text">
                        <Grid item
                          xs
                          className={classes.outerColumn}
                          style={{ display: "flex", alignItems: "center", position: "rigth" }}
                        >
                          
                          <Typography>{nachricht.nachricht_inhalt}</Typography>
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
                        <Typography>{nachricht.nachricht_inhalt}</Typography>
                        </Grid>
                        <Divider />
                      </div>
                    );
                  }
                }
              })
            : null
            }
  
          
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Schreibe eine Nachricht"
              value={neueNachricht}
              onChange={this.handleChange}
            />
          </form>

          <Link component={RouterLink} to={{
                pathname: '/meinechats',
          }} >
            <Button className={classes.button_style} variant="outlined" color="primary" onClick={this.handleClose}>
            <ArrowBackIcon/>
            </Button>
          </Link>

          <Button color="primary" variant="contained" onClick={this.addNachricht}>
            senden 
          </Button>

          <Button variant='contained' color='secondary' onClick={this.showGruppeFormButtonClicked}>
              Gruppe erstellen 
          </Button>

      <LoadingProgress show={loadingInProgress} />
      <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Nachrichten nicht geladen werden!`} onReload={this.getNachrichten} />
      <GruppenForm show={showLerngruppeForm} currentPerson={currentPerson} onClose={this.lerngruppeFormClosed} />
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