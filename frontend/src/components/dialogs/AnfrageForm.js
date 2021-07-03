import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
    } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, GroupBO } from '../../api';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LerngruppeBO from '../../api/LerngruppeBO';
import KonversationBO from '../../api/KonversationBO';
import TeilnahmeChatBO from '../../api/TeilnahmeChatBO';
import ProfilBO from '../../api/ProfilBO';
import PersonBO from '../../api/PersonBO';
import LernpartnerAPI from '../../api/LernpartnerAPI';
import VorschlagListeEintrag from '../VorschlagListeEintrag';


class AnfrageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatPartnerProfil: props.chatPartnerProfil,
            //gruppe: props.chatPartnerProfil.gruppe,
            gruppeProfil: null,
            currentPersonID: props.currentPerson.id,
            name: null,
            konvName: null,

            konversation: null,
            konversationID: null,

            teilnahmeChat: null,
            teilnahmeChatPartner: null,

            anfrageGesendet: false,

            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null

        };

        // save this state for canceling
        this.baseState = this.state;
    }

  /** Add Lerngruppe */
  addKonversation = () => {
    let newKonversation = new KonversationBO();
    newKonversation.id = 0;
    newKonversation.name = this.state.konvName;
    newKonversation.anfragestatus = false;
    LernpartnerAPI.getAPI().addKonversation(newKonversation)
    .then(konversationBO =>
      this.setState({
        konversation: konversationBO
      })).then(() => {
        this.addTeilnahmeChatPartner();
        //console.log(this.state.profil.id)
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

  /** Add TeilnahmeChat */
  addTeilnahmeChatPartner = () => {
    let newTeilnahmeChat = new TeilnahmeChatBO()
    newTeilnahmeChat.id = 0;
    newTeilnahmeChat.teilnehmer = this.props.chatPartner.id
    newTeilnahmeChat.anfrage_sender = this.props.currentPerson.id
    newTeilnahmeChat.status = false
    newTeilnahmeChat.konversation = this.state.konversation.id
    LernpartnerAPI.getAPI().addTeilnahmeChat(newTeilnahmeChat)
    .then(teilnahmeChatBO =>
      this.setState({
        teilnahmeChat: teilnahmeChatBO
      })).then(() => {
        this.addTeilnahmeChat();
        //console.log(this.state.profil.id)
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

  /** Add TeilnahmeChatPartner */
  addTeilnahmeChat = () => {
    let newTeilnahmeChat = new TeilnahmeChatBO()
    newTeilnahmeChat.id = 0;
    newTeilnahmeChat.teilnehmer = this.props.currentPerson.id
    newTeilnahmeChat.anfrage_sender = this.state.currentPersonID
    newTeilnahmeChat.status = false
    newTeilnahmeChat.konversation = this.state.konversation.id
    LernpartnerAPI.getAPI().addTeilnahmeChat(newTeilnahmeChat)
    .then(teilnahmeChatBO => {
      this.setState(this.baseState);
      this.props.onClose(teilnahmeChatBO); // call the parent with the lerngruppe object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  /** Konversation holen */
  getKonversation = () => {
    LernpartnerAPI.getAPI().getKonversationByName(this.state.name)
    .then(konversationBO =>
      this.setState({
        konversation: konversationBO,
        konversationID: konversationBO.id,              // disable loading indicator                 // no error message
      })).then(() => {
        this.addTeilnahmeChatLerngruppe();
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  /** Add TeilnahmeChatPartner */
  addTeilnahmeChatLerngruppe = () => {
    let newTeilnahmeChat = new TeilnahmeChatBO()
    newTeilnahmeChat.id = 0;
    newTeilnahmeChat.teilnehmer = this.props.currentPerson.id
    newTeilnahmeChat.anfrage_sender = this.props.currentPerson.id
    newTeilnahmeChat.status = false
    newTeilnahmeChat.konversation = this.state.konversationID
    LernpartnerAPI.getAPI().addTeilnahmeChat(newTeilnahmeChat)
    .then(teilnahmeChatBO => {
      this.setState(this.baseState);
      this.props.onClose(teilnahmeChatBO); // call the parent with the lerngruppe object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

    // API Anbindung um Person vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPersonByProfil(this.props.chatPartner.profil)
      .then(personBO =>
          this.setState({
            name: personBO.name,
            konvName: personBO.vorname+ " " + personBO.name + " und " + this.props.currentPerson.vorname+ " " + this.props.currentPerson.name,
            loadingInProgress: false,
            error: null,
      })).catch(e =>
              this.setState({
                name: null,
                konvName: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    // API Anbindung um Lerngruppe vom Backend zu bekommen
    getLerngruppe = () => {
      LernpartnerAPI.getAPI().getLerngruppeByProfil(this.props.chatPartner.id)
      .then(lerngruppeBO =>
          this.setState({
            name: lerngruppeBO.name,
            loadingInProgress: false,
            error: null,
      })).catch(e =>
              this.setState({
                lerngruppeName: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.chatPartner.profil)
    .then(profilBO =>
      this.setState({
            gruppeProfil: profilBO.gruppe,
            loadingInProgress: false,
            error: null
      })).then(() => {
        this.getPartner();
        //console.log(this.state.profil.id)
    }).catch(e =>
        this.setState({ // Reset state with error from catch
          gruppeProfil: null,
          loadingInProgress: false,
          error: e,
        })
      );
    }

    getPartner = () => {
        if (this.state.gruppeProfil === true){
            this.getLerngruppe();
        }else{
            this.getPerson();
        }
    }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  //Setzen der Werte aus der Validierung
  setStateValueChange(event, error) {
    this.setState({
        [event.target.id]: event.target.value,
        [event.target.id + 'ValidationFailed']: error,
        [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  getChatPartnerStatus = () => {
    if (this.state.gruppeProfil === true){
    console.log(this.state.gruppeProfil)
        this.getKonversation();
    }else{
    console.log(this.state.gruppeProfil)
        this.addKonversation();
    }
  }

  /** Renders the component */
  render() {
    const { classes, show, chatPartner, currentPerson } = this.props;
    const { chatPartnerProfil, name, konvName, gruppeProfil, konversation, konversationID, teilnahmeChat, teilnahmeChatPartner, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;
    console.log(chatPartner)
   // console.log(chatPartner.id)
    console.log(chatPartnerProfil)
    console.log(name)
    console.log(gruppeProfil)
    console.log(konversationID)
    console.log(konversation)
    console.log(teilnahmeChat)
    console.log(chatPartnerProfil)
    console.log(currentPersonID)

    return (
      show ?
        <Dialog open={show} onEnter={this.getProfil} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle>Kontaktanfrage senden
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

              <div>Bist du dir sicher, dass du eine Anfrage schicken möchtest?</div>

            <LoadingProgress show={addingInProgress} />
                <ContextErrorMessage error={addingError} contextErrorMsg={`Die Anfrage konnte nicht gesendet werden.`} onReload={this.getChatPartnerStatus} />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
                <Button variant='contained' onClick={this.getChatPartnerStatus} color='primary'>
              Anfrage senden
             </Button>

          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  content: {
    margin: theme.spacing(1),
    }
});

/** PropTypes */
AnfrageForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(AnfrageForm);