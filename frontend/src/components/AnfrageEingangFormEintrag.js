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

/**
 * Es wird ein einzelner Vorschlag für einen passenden Lernpartner oder /-gruppe mit allen not wendigen Informationen dargestellt
 *
 * Hierfür werden Profilname, Alter, Geschlecht, Semester, Lernfach und der Prozentsatz des Matches angezeigt
 *
 */

class AnfrageEingangFormEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {

            teilnahmeChat: props.teilnahmeChat,
            teilnahmeChatID: props.teilnahmeChat.id,

            teilnahmen: [],
            anfragenAnzahl: null,

            konversation: null,
            konversationID: null,
            konversationName: null,
            konversationAnfragestatus: null,

            testVar: false,

            currentPersonName: " und " + props.currentPerson.vorname + " " + props.currentPerson.name,
            nameNeu: null,

            showProfil: false,
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
    LernpartnerAPI.getAPI().getTeilnahmeChatByKonversationByStatus(0, this.state.konversationID)
    .then(teilnahmeChatBOs =>
      this.setState({
        teilnahmen: teilnahmeChatBOs,              // disable loading indicator                 // no error message
        anfragenAnzahl: teilnahmeChatBOs.length
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

  nameAnpassen = () => {
    this.setState({
        nameNeu: this.state.konversation.name.replace(this.state.currentPersonName,''),
    });
  }

  anfrageAblehnen = () => {
    for (var teilnahme in this.state.teilnahmen){
        LernpartnerAPI.getAPI().deleteTeilnahmeChat(this.state.teilnahmen[teilnahme]['id'])
        .then(konversationBO => {
                    this.anfrageAblehnenKonversation();
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
          const { teilnahmeChat, teilnahmeChatID, teilnahmen, anfragenAnzahl, nameNeu, konversation, konversationID, konversationAnfragestatus } = this.state;
          console.log(konversation)
          console.log(konversationID)
          console.log(teilnahmen)
          console.log(anfragenAnzahl)

          return (
          show ?
            <Card open={show} >
               <List>
                <ListItem>
                  <ListItemText primary={nameNeu} className={classes.name}/>
                    <Button color='secondary'>
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
               </Card>
               :
               <Card className={classes.text}>
                    Du hast keine Anfragen
                </Card>
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
    backgroundColor: '#CC3333'
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