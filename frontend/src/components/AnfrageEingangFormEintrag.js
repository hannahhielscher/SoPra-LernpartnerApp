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
 * Es wird der Eintrag einer eingehenden Anfrage für eine Konversation erstellt.
 */

class AnfrageEingangFormEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {

            teilnahmeChat: props.teilnahmeChat,
            teilnahmeChatID: props.teilnahmeChat.id,

            teilnahmen: [],

            currentPersonName: " und " + props.currentPerson.vorname + " " + props.currentPerson.name,
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

  /** Konversation holen */
  getKonversation = () => {
    LernpartnerAPI.getAPI().getKonversation(this.state.teilnahmeChat.konversation)
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
        teilnahmePartner: null,
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  anfrageAnnehmen = () => {
    LernpartnerAPI.getAPI().updateKonversation(this.state.konversationID, this.state.konversationName, 1)
    .then(konversationBO => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
            this.anfrageAnnehmenTeilnahme(); // call the parent with the customer object from backend
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

  anfrageAnnehmenTeilnahme = () => {
    //console.log(teilnahmePerson)
    //console.log(teilnahmeID)
    for (var teilnahme in this.state.teilnahmen){
        LernpartnerAPI.getAPI().updateTeilnahmeChat(this.state.teilnahmen[teilnahme]['id'], this.state.teilnahmen[teilnahme]['anfrage_sender'], this.state.teilnahmen[teilnahme]['teilnehmer'], 1, this.state.konversationID)
        .then(teilnahmeChatBO => {
                // Backend call sucessfull
                // reinit the dialogs state for a new empty customer
                this.setState(this.baseState);
                this.props.onClose(teilnahmeChatBO); // call the parent with the customer object from backend
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
  }

    // API Anbindung um Person vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.state.teilnahmeChat.anfrage_sender)
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

  nameAnpassen = () => {
    this.setState({
        nameNeu: this.state.konversation.name.replace(this.state.currentPersonName,''),
    });
    this.getPerson();
  }

  anfrageAblehnen = () => {
    for (var teilnahme in this.state.teilnahmen){
        LernpartnerAPI.getAPI().deleteTeilnahmeChat(this.state.teilnahmen[teilnahme]['id'])
        .then(konversationBO => {
                    //this.anfrageAblehnenKonversation();
                    this.setState(this.baseState);
                    this.props.onClose(konversationBO);
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
    }
/*
  anfrageAblehnenKonversation = () => {
    LernpartnerAPI.getAPI().deleteKonversation(this.state.konversationID)
    .then(konversationBO => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
                this.setState(this.baseState);
                this.props.onClose(konversationBO); // call the parent with the customer object from backend
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
    }*/

  //Setzen des Status, bei schließen des Dialogs
  handleClose = () => {
    this.setState(this.baseState);
    this.props.onClose(null);
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

  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
    this.getKonversation();
  }

    render(){
          const { classes, show, expandedState } = this.props;
          const { teilnahmeChat, teilnahmeChatID, teilnahmen, chatPartner, nameNeu, konversation, konversationID, konversationAnfragestatus, showProfilDialog } = this.state;
          console.log(konversation)
          console.log(konversationID)
          console.log(teilnahmen)

          return (
          show ?
            <Card open={show} >
               <List>
                <ListItem>
                    <ListItemText primary={nameNeu} />
                    <Button color='secondary' onClick={this.showProfilButtonClicked}>
                        Profil ansehen
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button style={{ width : 170}} size="small" className={classes.buttonAnnehmen} variant="contained" color="primary" onClick={this.anfrageAnnehmen}>
                        Annehmen
                    </Button>
                    <Button style={{ width : 170}} size="small" className={classes.buttonAblehnen} variant="contained" color="secondary" onClick={this.anfrageAblehnen}>
                        Ablehnen
                    </Button>
                </ListItem>
               </List>
                <ProfilDialog show={showProfilDialog} chatPartner={chatPartner} onClose={this.profilDialogClosed}/>
               </Card>
               :
               null
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
    backgroundColor: '#cdaf95'
    },
  buttonAblehnen: {
    margin: theme.spacing(1),
    backgroundColor: '#cd5b45'
  },
  text: {
    padding: theme.spacing(2),
    color: theme.palette.grey[500]
  }
  });

/** PropTypes */
AnfrageEingangFormEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  vorschlag: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  expandedState: PropTypes.bool.isRequired,
}

export default withStyles(styles)(AnfrageEingangFormEintrag);