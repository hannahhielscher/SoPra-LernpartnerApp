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
            teilnahmeChatGefiltert: [],

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

  filterTeilnahmeChat = () => {
    for (var teilnahme in this.state.teilnahmen)
        if (this.state.teilnahmen.[teilnahme]['anfrage_sender'] !== this.props.currentPerson.id){
            this.state.teilnahmeChatGefiltert.push(this.state.teilnahmen.[teilnahme])
        }
    console.log(this.state.teilnahmen.[teilnahme])
    console.log(this.state.teilnahmen.[teilnahme]['anfrage_sender'])
    console.log(this.state.teilnahmeChatGefiltert)
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


  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getTeilnahmenChat();
        this.getTeilnahmenChatAusstehend();
    }

 /** Renders the component */
  render() {
    const { classes, show, currentPerson, konversationen } = this.props;
    const { teilnahmenChat, teilnahmenChatAusstehend, teilnahmeChatGefiltert, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;
    console.log(teilnahmenChat)
    console.log(teilnahmenChatAusstehend)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle> Deine Anfragen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

            <Card className={classes.liste}>
           {
              teilnahmeChatGefiltert.map(teilnahmeChat =>
                <AnfrageEingangFormEintrag key={teilnahmeChat.getID()} teilnahmeChat={teilnahmeChat} currentPerson={currentPerson}
                />)
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