import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Es wird eine einzelne Nachricht von einer einzelnen Person mit den notwendigen Informationen dargestellt
 * 
 * Hierfür werden Profilname, die konversation, Teilnehmer und der Inhalt angezeigt 
 * 
 */

class NachrichtenListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            nachricht: null, 
            personName: null, 
            konversation: null,
            teilnehmer: null
            inhalt: null, 
            loadingInProgress: false,
            error: null
        };
    }

    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.customer);
    }
    
    //Handles the onClick event of the show profil button
    showProfilButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showCustomerForm: true
      });
    }

      // API Anbindung um Nachricht vom Backend zu bekommen 
    getNachricht = () => {
        LernpartnerAPI.getAPI().getNachricht(this.props.nachricht)
        .then(nachrichtBO =>
            this.setState({
              nachricht: nachrichtBO,
              inhalt: nachrichtBO.inhalt,
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              this.getNachricht()
              this.getPerson()
            })
            .catch(e =>
                this.setState({
                  nachricht: null,
                  inhalt: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

      
    // API Anbindung um Person vom Backend zu bekommen 
    getPerson = () => {
        LernpartnerAPI.getAPI().getNachricht(this.props.nachricht)
        .then(personBO =>
            this.setState({
              person: personBO,
              profilID: nachrichtBO.person,
              personName: personBO.name,
              loadingInProgress: false,
              error: null,
            }))
            .catch(e =>
                this.setState({
                  person: null,
                  profilID: null,
                  personName: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

      
    // API Anbindung um Konversation vom Backend zu bekommen 
    getKonversation = () => {
        LernpartnerAPI.getAPI().getNachricht(this.props.nachricht)
        .then(konversationBO =>
            this.setState({
              konversation: konversationBO,
              teilnehmer: konversationBO.teilnehmer, 
              loadingInProgress: false,
              error: null,
            }))
            .catch(e =>
                this.setState({
                  konversation: null,
                  konversation: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getNachricht();
      }
  
      // Wenn die Componente geupdatet wird
      componentDidUpdate(prevProps){
        if((this.props.show) && (this.props.show !== prevProps.show)) {
          this.getNachricht();
        }
      }

      render() {
          const {nachricht, inhalt, konversation, personName, loadingInProgress, error}


      }

}

const styles = theme => ({

    });
  
  /** PropTypes */
  NachrichtListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    vorschlag: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  
  
  export default withStyles(styles)(NachrichtListeEintrag);