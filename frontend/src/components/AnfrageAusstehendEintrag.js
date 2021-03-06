import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import Profil from './Profil';
import { withStyles, Button, ButtonGroup, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card, Grid,
    Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemText, ListItemSecondaryAction,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
    } from '@material-ui/core';
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';
import AnfrageForm from './dialogs/AnfrageForm';
import ProfilDialog from './dialogs/ProfilDialog';

/**
 * Es wird der Eintrag einer ausstehende Anfrage für eine Konversation erstellt.
 */

class AnfrageAusstehendEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {

            teilnahmenChatAusstehend: props.teilnahmenChatAusstehend,
            teilnahmenChatAusstehendID: props.teilnahmenChatAusstehend.id,

            teilnahmen: [],
            chatPartner: null,

            konversation: null,
            konversationID: null,
            konversationName: null,
            konversationAnfragestatus: null,

            testVar: false,

            currentPersonName: " und " + props.currentPerson.vorname + " " + props.currentPerson.name,
            nameNeu: null,

            showProfilDialog: false,
            showAnfrageForm: false,

            loadingInProgress: false,
            error: null
        };
        this.baseState = this.state;
    }

    // API Anbindung um Person vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.state.teilnahmenChatAusstehend.teilnehmer)
      .then(personBO =>
        this.setState({
          chatPartner: personBO,              // disable loading indicator                 // no error message
          nameNeu: this.state.konversation.name.replace(this.state.currentPersonName,'')
        })).catch(e =>
        this.setState({
          chatPartner: null,
          updatingInProgress: false,    // disable loading indicator
          updatingError: e              // show error message
        })
      );
    }

    // API Anbindung um Lerngruppe vom Backend zu bekommen
    getLerngruppe = () => {
      LernpartnerAPI.getAPI().getLerngruppe(this.state.teilnahmenChatAusstehend.teilnehmer)
      .then(lerngruppeBO =>
          this.setState({
            chatPartner: lerngruppeBO,
            nameNeu: this.state.konversation.name,
      })).catch(e =>
      this.setState({
          name: null,
          loadingInProgress: false,
          error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

  
  /** Konversation holen */
  getKonversation = () => {
    LernpartnerAPI.getAPI().getKonversation(this.state.teilnahmenChatAusstehend.konversation)
    .then(konversationBO =>
      this.setState({
        konversation: konversationBO,              // disable loading indicator                 // no error message
        konversationID: konversationBO.id,
        konversationName: konversationBO.name,
        konversationAnfragestatus: konversationBO.anfragestatus
      })).then(() => {
        this.nameAnpassen();
        this.getTeilnahmeChats();
    }).catch(e =>
      this.setState({
        konversation: null,
        konversationID: null,
        konversationName: null,
        konversationAnfragestatus: null,
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  getTeilnahmeChats = () => {
    LernpartnerAPI.getAPI().getTeilnahmeChatByStatusByKonversation(0, this.state.konversationID)
    .then(teilnahmeChatBOs =>
      this.setState({
        teilnahmen: teilnahmeChatBOs,              // disable loading indicator                 // no error message
      })).catch(e =>
      this.setState({
        teilnahmen: null,
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  nameAnpassen = () => {
    if (this.state.konversation.name.includes(this.state.currentPersonName)){
        this.getPerson();
    }else{
        this.getLerngruppe();
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

  //Setzen des Status, bei schließen des Dialogs
  handleClose = () => {
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
    this.getKonversation();
  }

    render(){
          const { classes, show, expandedState } = this.props;
          const { teilnahmenChatAusstehend, teilnahmenChatAusstehendID, teilnahmen, nameNeu, konversation, konversationID, konversationAnfragestatus, chatPartner, showProfilDialog } = this.state;
          console.log(chatPartner)
          console.log(konversationID)
          console.log(teilnahmenChatAusstehend)
          console.log(teilnahmenChatAusstehendID)
          console.log(konversationAnfragestatus)

          return (
            <div>
            <div className={classes.list}>
               <List>
                <ListItem>
                  <ListItemText primary={nameNeu} className={classes.name}/>
                    <Button color='secondary' onClick={this.showProfilButtonClicked}>
                        Profil ansehen
                    </Button>
                  </ListItem>
               </List>
             </div>
            <ProfilDialog show={showProfilDialog} chatPartner={chatPartner} onClose={this.profilDialogClosed}/>
          </div>
          );
        }
}


const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
  },
  buttonAnnehmen: {
    margin: theme.spacing(1),
    },
  buttonAblehnen: {
    margin: theme.spacing(1),
    backgroundColor: '#CC3333'
  },
  list: {
    backgroundColor: theme.palette.grey[100],
  }
  });

/** PropTypes */
AnfrageAusstehendEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  vorschlag: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  expandedState: PropTypes.bool.isRequired,
}

export default withStyles(styles)(AnfrageAusstehendEintrag);