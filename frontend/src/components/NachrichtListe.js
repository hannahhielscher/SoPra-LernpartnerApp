import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, Grid, Typography, Divider, Link, Pape, Card, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtBO from '../api/NachrichtBO';
import { Link as RouterLink } from 'react-router-dom';
import GruppenForm from './dialogs/GruppenForm';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
//import NachrichtenListeEintrag from './NachrichtenListeEintrag';
//import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NachrichtListeEintrag from './NachrichtListeEintrag';
import ProfilDialog from './dialogs/ProfilDialog';

/**
 * Es werden alle Nachrichten des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [NachrichtenListe]](#nachrichtenliste)
 * 
 * Hierfür werden alle Nachrichten des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
 * 
 */

class Nachricht extends Component {

  constructor(props) {
    super(props);

    let konversationsID = null;
    let konversationName = null;

    if (this.props.location.konversation) {
      konversationsID = this.props.location.konversation.getID();
      konversationName = this.props.location.konversation.getname();
    }
    console.log(konversationsID)
   // Init an empty state
   this.state = {
     nachrichten: [], 
     nachricht_inhalt: null,
     neueNachricht: null,
     konversation_id: null,
     personid: null,
     gruppe: null,
     currentPersonName: props.currentPerson.vorname + " " + props.currentPerson.name,
     error: null,
     loadingInProgress: false,
     konversationID: konversationsID,
     konversationName: konversationName,
     nameNeu: null,
     showKonversationListe: false,
     showLerngruppeForm: false,
     showProfilDialog: false,
     empfaenger: null,
     empfaenger_name: null,
     empfaenger_vorname: null
     
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

checkKonversation = () => {
  this.setState({

  })
}

// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getNachrichten();
  this.nameAnpassen();
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

 /* nameAnpassen = () => {
    if (this.state.konversationName.includes(this.state.currentPersonName) == true){
        this.setState({
            nameNeu: this.state.konversationName
            gruppe: false,
        });
    }else{
        this.setState({
            nameNeu: this.state.konversationName,
            gruppe: true,
        });
    }
  }*/

  nameAnpassen = () => {
     var buff = this.state.konversationName.replace(this.state.currentPersonName,'');
    this.setState({
        nameNeu: buff.replace(' und ',''),
    });
    console.log(this.state.nameNeu)
  }

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

  //Handles the onClick event of the show profil button
  showProfilButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilDialog: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  profilDialogClosed = (profil) => {
    // customer is not null and therefor changed
    if (profil) {
      this.setState({
        
        showProfilDialog: false
      });
    } else {
      this.setState({
        showProfilDialog: false
      });
    }
  }

 // Rendert die Componente 
    render() {
      const { classes, currentPerson, konversation } = this.props;
    
      const { konversationName, showLerngruppeForm, neueNachricht, nachrichten, nachricht_inhalt, nameNeu, gruppe, loadingInProgress, error } = this.state;
      
      return (
        <div>
          <br/>
          <Paper className={classes.page}>
          <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message" align='center'>{nameNeu}</Typography>
            </Grid>
          </Grid>
          </Paper>
          <br/>
          <div className={classes.liste}>
          { 
            nachrichten.map((nachricht) => 
                <NachrichtListeEintrag key={nachricht.getID()} currentPerson={currentPerson} nachricht={nachricht}/>
                  
            )
          }
          </div>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Schreibe eine Nachricht"
              value={neueNachricht}
              onChange={this.handleChange}
              className={classes.schreibeNachricht}
            />
          </form>

          <Link component={RouterLink} to={{
                pathname: '/meinechats',
          }} >
            <Button className={classes.button_style} variant="outlined" color="primary" onClick={this.handleClose}>
            <ArrowBackIcon/>
            </Button>
          </Link>

          <Button className={classes.button_style} color="primary" variant="contained" onClick={this.addNachricht}>
            senden 
          </Button>

        {
        gruppe ?
        null
        :
          <Button className={classes.button_style} variant='contained' color='secondary' onClick={this.showGruppeFormButtonClicked}>
              Gruppe erstellen
          </Button>
        }

      <LoadingProgress show={loadingInProgress} />
      <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Nachrichten nicht geladen werden!`} onReload={this.getNachrichten} />
      <GruppenForm show={showLerngruppeForm} currentPerson={currentPerson} name={nameNeu} onClose={this.lerngruppeFormClosed} />
      
      </div>
      
    );

}}
//<ProfilDialog show={showProfilDialog} chatPartner={chatPartner} onClose={this.profilDialogClosed}/>
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
    padding: 10,
  },
  schreibeNachricht: {
    width: '100%',
    marginBottom: 15,
  },
  liste: {
    overflow: 'scroll',
    //maxHeight: '400px'
  },
  page: {
    marginTop: '15px',
    backgroundColor: '#f7f7f7'
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
  

export default withRouter(withStyles(styles)(Nachricht));