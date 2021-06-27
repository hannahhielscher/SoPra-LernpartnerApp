import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Grid, Typography} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListeEintrag from './KonversationListeEintrag';


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
            error: null,
            loadingInProgress: false, 
            expandedKonversationID: expandedID,
        };

      }

      // API Anbindung um Konversationen des Students vom Backend zu bekommen 
    getKonversation = () => {
      LernpartnerAPI.getAPI().getKonversationenByPerson(this.props.currentPerson.getID())
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
    

 
// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getKonversation();
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

 

render() {
  const { classes, currentPerson } = this.props;
        const { konversationen, expandedKonversationID, error, loadingInProgress}  = this.state; 

        return(
          <div className={classes.root}>
           
            { 
              // Show the list of KonversationListeEintrag components
              // Do not use strict comparison, since expandedVorschlagID maybe a string if given from the URL parameters
  
              konversationen.map(konversation =>
                <KonversationListeEintrag key={konversation.getID()} currentPerson= {currentPerson} konversation={konversation} expandedState={expandedKonversationID === konversation.getID()}
                onExpandedStateChange={this.onExpandedStateChange}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Leider konnten deine Chats nicht geladen werden!`} onReload={this.getKonversation} />
          </div>

        );

      }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  customerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
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