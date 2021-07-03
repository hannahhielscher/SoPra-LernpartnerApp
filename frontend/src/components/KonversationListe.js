import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Badge} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListeEintrag from './KonversationListeEintrag';
import { Button, ButtonGroup } from '@material-ui/core';
import AnfrageEingangForm from './dialogs/AnfrageEingangForm';


/**
 * Es werden alle Konversationen des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [KonversationListeEintrag]](#konversationlisteeintrag)
 * 
 * Hierfür werden alle Konversationen des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
 * 
 */

class KonversationListe extends Component {
    constructor(props){
        super(props);

        let expandedID = null;

        if (this.props.location.expandKonversation) {
        expandedID = this.props.location.expandKonversation.getID();
        }
        
       
        // initiiere einen leeren state
        this.state = {
            konversationen : [],

            anfrage: null,

            teilnahmenChat: [],
            teilnahmenChatGefiltert: [],
            anfragenAnzahl: 0,

            showAnfrageEingangForm: false,

            error: null,
            loadingInProgress: false, 
            expandedKonversationID: expandedID,
        };

      }

      // API Anbindung um Konversationen des Students vom Backend zu bekommen 
    getKonversation = () => {
      LernpartnerAPI.getAPI().getangenommeneKonversationenByPerson(this.props.currentPerson.getID())
      .then(konversationenBOs =>
          this.setState({
              konversationen: konversationenBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  konversationen: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingKonversationenError: null
      });
    }

 /** 
     * Handles onExpandedStateChange events from the VorschlagListeEintrag component. Toggels the expanded state of 
     * the VorschlagListeEintrag of the given VorschlagBO.
     * 
     * @param {konversation} KonversationBO of the KonversationListeEintrag to be toggeled
   */
     
  onExpandedStateChange = konversation => {
    // console.log(konversationID);
    // Set expandend Konversation Eintrag to null by default
    let newID = null;

    // If same konversation entry is clicked, collapse it else expand a new one
    if (konversation.getID() !== this.state.expandedKonversationID) {
    // Expand the konservation entry with konversationID
    newID = konversation.getID();
    }
    // console.log(newID);
    this.setState({
    expandedKonversationID: newID,
    });
}

    /** Handles the onClick event of the delete customer button */
    getAnfrageEingangForm = (event) => {
        event.stopPropagation();
        this.setState({
            showAnfrageEingangForm: true
        });
    }

  /** Handles the onClose event of the CustomerForm */
  anfrageEingangFormFormClosed = (anfrage) => {
    // customer is not null and therefor changed
    if (anfrage) {
      this.setState({
        anfrage: anfrage,
        showAnfrageEingangForm: false
      });
    } else {
      this.setState({
        showAnfrageEingangForm: false
      });
    }
  }
/**
   * Handles lerngruppeVerlassen events from the GruppenListeEintrag component
   */
  chatVerlassen = () => {
    this.getKonversation();
    this.setState({
        konversationen: this.state.konversationen,
        //showCustomerForm: false
    });
}

    // API Anbindung um Konversationen des Students vom Backend zu bekommen
    getTeilnahmenChat = () => {
      LernpartnerAPI.getAPI().getTeilnahmeChatByPersonByStatus(this.props.currentPerson.id, 0)
      .then(teilnahmenChatBOs =>
          this.setState({
              teilnahmenChat: teilnahmenChatBOs,
              error: null,
              loadingInProgress: false,
            })).then(() => {
                  this.filterTeilnahmenChat();
            }).catch(e =>
              this.setState({
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
        if (this.state.teilnahmenChat.[teilnahme]['anfrage_sender'] !== this.props.currentPerson.id){
            this.state.teilnahmenChatGefiltert.push(this.state.teilnahmenChat.[teilnahme])
         }
    }
    this.setState({
        anfragenAnzahl: this.state.teilnahmenChatGefiltert.length
    });
    console.log(this.state.anfragenAnzahl)
  }


// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getKonversation();
  this.getTeilnahmenChat();
}


render() {
  const { classes, currentPerson } = this.props;
        const { konversationen, anfragenAnzahl, teilnahmenChatGefiltert, showAnfrageEingangForm, expandedKonversationID, error, loadingInProgress}  = this.state;

        return(
          <div className={classes.root}>
            <Button variant='contained' onClick={this.getAnfrageEingangForm} color='primary' className={classes.button}>
            <Badge badgeContent={anfragenAnzahl} color="secondary" className={classes.badge}>
             </Badge>
                  Anfragen
             </Button>
           
            { 
              // Show the list of KonversationListeEintrag components
              // Do not use strict comparison, since expandedVorschlagID maybe a string if given from the URL parameters
  
              konversationen.map(konversation =>
                <KonversationListeEintrag key={konversation.getID()} currentPerson= {currentPerson} konversation={konversation} expandedState={expandedKonversationID === konversation.getID()}
                onExpandedStateChange={this.onExpandedStateChange}
                onTeilnahmeChatDeleted={this.chatVerlassen}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Chats nicht geladen werden!`} onReload={this.getKonversation} />

            <AnfrageEingangForm show={showAnfrageEingangForm} currentPerson={currentPerson} onClose={this.anfrageEingangFormFormClosed} />

          </div>

        );

      }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  badge: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
});

/** PropTypes */
KonversationListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}



export default withRouter(withStyles(styles)(KonversationListe));