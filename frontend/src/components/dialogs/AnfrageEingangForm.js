import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ButtonGroup, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemText, ListItemSecondaryAction,
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
import AnfrageEingangFormEintrag from '../AnfrageEingangFormEintrag';
import AnfrageAusstehendEintrag from '../AnfrageAusstehendEintrag';


class AnfrageEintragForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teilnahmenChat: [],
            teilnahmenChatAusstehend: [],
            teilnahmenChatGefiltert: [],

            anfragenAnzahl: null,

            showAnfrageEintrag: false,

            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null

        };

        // save this state for canceling
        this.baseState = this.state;
    }

    // API Anbindung um Konversationen des Students vom Backend zu bekommen
    getTeilnahmenChat = () => {
      LernpartnerAPI.getAPI().getTeilnahmeChatByPersonByStatus(this.props.currentPerson.id, 0)
      .then(teilnahmenChatBOs =>
          this.setState({
              teilnahmenChat: teilnahmenChatBOs,
              showAnfrageEintrag: true,
              error: null,
              loadingInProgress: false,
            })).then(() => {
                  this.filterTeilnahmenChat();
            }).catch(e =>
              this.setState({
                  teilnahmenChat: [],
                  error: e,
                  loadingInProgress: false,
              }));

      this.setState({
          error: null,
          loadingInProgress: true,
          loadingKonversationenError: null
      });
    }

  filterTeilnahmenChat = () => {
    for (var teilnahme in this.state.teilnahmenChat){
        //this.state.teilnahmeChatGefiltert = this.state.teilnahmenChat.filter(this.state.teilnahmenChat.[teilnahme] => this.state.teilnahmenChat.[teilnahme]['anfrage_sender'] !== this.props.currentPerson.id)
        if (this.state.teilnahmenChat.[teilnahme]['anfrage_sender'] !== this.props.currentPerson.id){
            this.state.teilnahmenChatGefiltert.push(this.state.teilnahmenChat.[teilnahme])
            console.log(this.state.teilnahmenChatGefiltert)
         }
    }
  }

    // API Anbindung um Konversationen des Students vom Backend zu bekommen
    getTeilnahmenChatAusstehend = () => {
      LernpartnerAPI.getAPI().getTeilnahmeChatByAnfrageSender(this.props.currentPerson.id)
      .then(teilnahmenChatBOs =>
          this.setState({
              teilnahmenChatAusstehend: teilnahmenChatBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  teilnahmenChat: [],
                  error: e,
                  loadingInProgress: false,
              }));

      this.setState({
          error: null,
          loadingInProgress: true,
          loadingKonversationenError: null
      });
    }

  //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
  anfrageEintragClosed = () => {
    this.setState({
        showAnfrageEintrag: false,
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  getAnzahlAnfrageEingang = (newAnfragenAnzahl) => {
    this.setState({
        anfragenAnzahl: newAnfragenAnzahl
    })
  }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getTeilnahmenChat();
        this.getTeilnahmenChatAusstehend();
    }

 /** Renders the component */
  render() {
    const { classes, show, currentPerson, konversationen } = this.props;
    const { teilnahmenChat, teilnahmenChatAusstehend, teilnahmenChatGefiltert, showAnfrageEintrag, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;
    console.log(teilnahmenChat)
    console.log(teilnahmenChatGefiltert)
    console.log(teilnahmenChatAusstehend)
    console.log(teilnahmeChatGefiltert)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle> Anfragen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

            <Card className={classes.liste}>

           {
            teilnahmenChatGefiltert.length > 0 ?


              teilnahmenChatGefiltert.map(teilnahmeChat =>
                <AnfrageEingangFormEintrag key={teilnahmeChat.getID()} teilnahmeChat={teilnahmeChat} currentPerson={currentPerson}
                show={showAnfrageEintrag} onClose={this.anfrageEintragClosed} anzahlAnfragen={this.getAnzahlAnfrageEingang} />)

             :
             <Card className={classes.text2}>
                Du hast keine Anfragen
             </Card>
            }


            </Card>

               <Card className={classes.cardText}>
               <List>
                <ListItem>
                  <ListItemText primary="Deine ausstehende Anfragen:" className={classes.text}/>
                </ListItem>
               </List>
               </Card>

            <Card className={classes.liste}>
            {
              teilnahmenChatAusstehend.map(teilnahmenChatAusstehend =>
                <AnfrageAusstehendEintrag key={teilnahmenChatAusstehend.getID()} teilnahmenChatAusstehend={teilnahmenChatAusstehend} currentPerson={currentPerson}
                />)
            }
            </Card>

            <LoadingProgress show={addingInProgress} />
                <ContextErrorMessage error={addingError} contextErrorMsg={`Die Anfrage konnte nicht gesendet werden.`} onReload={this.getChatPartnerStatus} />
            <DialogContent>
          </DialogContent>
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
    },
  liste: {
    overflow: 'scroll',
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  cardText: {
    backgroundColor: theme.palette.grey[100],
  },
  card: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  text2: {
    padding: theme.spacing(2),
    color: theme.palette.grey[500]
  }
});

/** PropTypes */
AnfrageEintragForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(AnfrageEintragForm);