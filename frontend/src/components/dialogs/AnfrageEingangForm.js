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


class AnfrageEintragForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teilnahmenChat: [],

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

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getTeilnahmenChat();
    }

 /** Renders the component */
  render() {
    const { classes, show, currentPerson, konversationen } = this.props;
    const { teilnahmenChat, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;
    console.log(teilnahmenChat)
    console.log(currentPerson.id)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle> Deine Anfragen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>


            {
              teilnahmenChat.map(teilnahmeChat =>
                <AnfrageEingangFormEintrag key={teilnahmeChat.getID()} teilnahmeChat={teilnahmeChat} currentPerson={currentPerson}
                />)
            }

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