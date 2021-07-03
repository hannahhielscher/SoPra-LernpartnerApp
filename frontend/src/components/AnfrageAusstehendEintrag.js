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

class AnfrageAusstehendEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {

            teilnahmenChatAusstehend: props.teilnahmenChatAusstehend,
            teilnahmenChatAusstehendID: props.teilnahmenChatAusstehend.id,

            teilnahmen: [],

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
    LernpartnerAPI.getAPI().getTeilnahmeChatByKonversationByStatus(0, this.state.konversationID)
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

  nameAnpassen = () => {
    this.setState({
        nameNeu: this.state.konversation.name.replace(this.state.currentPersonName,''),
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
          const { teilnahmenChatAusstehend, teilnahmenChatAusstehendID, teilnahmen, nameNeu, konversation, konversationID, konversationAnfragestatus } = this.state;
          console.log(konversation)
          console.log(konversationID)
          console.log(teilnahmen)
          console.log(teilnahmenChatAusstehendID)

          return (

            konversationAnfragestatus === false ?

            <Card className={classes.card}>
               <List>
                <ListItem>
                  <ListItemText primary={nameNeu} className={classes.name}/>
                    <Button color='secondary'>
                        Profil ansehen
                    </Button>
                  </ListItem>
               </List>
             </Card>
            : null

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
  card: {
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