import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import LernpartnerAPI from '../api/LernpartnerAPI'
import Profil from './Profil';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, List, ListItem } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import GruppeVerlassenDialog from './dialogs/GruppeVerlassenDialog';
import GruppenBearbeitenForm from './dialogs/GruppenBearbeitenForm';

//import LernpartnerAPI from '../api/LernpartnerAPI'
import { LernpartnerAPI } from '../api';


/**
 * Es wird ein einzelner Vorschlag für einen passenden Lernpartner oder /-gruppe mit allen not wendigen Informationen dargestellt
 *
 * Hierfür werden Profilname, Alter, Geschlecht, Semester, Lernfach und der Prozentsatz des Matches angezeigt
 *
 */

class GruppenListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            lerngruppe: this.props.lerngruppe,
            profil: null,
            lernvorlieben: null,
            gruppeName: this.props.lerngruppe.name,
            teilnahmeGruppe: null,
            profilID: this.props.lerngruppe.profil,
            gruppeLernvorliebenID: null,
            showProfil: false,
            showLerngruppeVerlassenDialog: false,
            //showTeilnehmer: false,
            //showNachrichtenListe: false,
            showGruppenBearbeitenForm: false,
            loadingInProgress: false,
            error: null,
            showLerngruppeForm: false
        };
    }

    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.lerngruppe);
    }

    /** Handles the onClick event of the Profil ansehen button */
    showProfilButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProfil: true
        });
    }

        /** TeilnahmeGruppe holen fürs Verlassen */
  getTeilnahmeGruppe = () => {
    LernpartnerAPI.getAPI().getTeilnahmeGruppeByPersonByGruppe(this.props.currentPerson.getID(), this.props.lerngruppe.id)
    .then(teilnahmeGruppeBO => {
      this.setState({
        teilnahmeGruppe: teilnahmeGruppeBO,              // disable loading indicator                 // no error message
      });
    }).catch(e =>
      this.setState({
        teilnahmeGruppe: null,              // disable loading indicator                     // show error message
      })
    );
    }

    getGruppenProfil = () => {
		LernpartnerAPI.getAPI().getProfil(this.state.profilID)
			.then(profilBO =>
				this.setState({
                    profil: profilBO,
                    gruppeLernvorliebenID: profilBO.lernvorlieben_id,
                    error: null,
                    loadingInProgress: false,
                })).then (()=> {
                    this.getGruppenLernvorlieben();
                })
                .catch(e =>
                    this.setState({
                        profil: null,
                        gruppeLernvorliebenID: null,
                        error: e,
                        loadingInProgress: false,
                 }));

      // set loading to true
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
    }

   getGruppenLernvorlieben = () => {
   //console.log(profil)
    LernpartnerAPI.getAPI().getLernvorlieben(this.state.gruppeLernvorliebenID)
    .then(lernvorliebenBO =>
      this.setState({
            lernvorlieben: lernvorliebenBO,
            loadingInProgress: false,
            error: null
      }))
      .catch(e =>
        this.setState({ // Reset state with error from catch
          lernvorlieben: null,
          loadingInProgress: false,
          error: e,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }




    /** Handles the onClick event of the delete customer button */
    verlasseLerngruppeButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showLerngruppeVerlassenDialog: true
        });
    }

    /** Handles the onClose event of the CustomerDeleteDialog */
    verlasseLerngruppeDialogClosed = (teilnahmeGruppe) => {
        // if customer is not null, delete it
        if (teilnahmeGruppe) {
            this.props.onTeilnahmeGruppeDeleted(teilnahmeGruppe);
        };

        // Don´t show the dialog
        this.setState({
            showLerngruppeVerlassenDialog: false
        });
    }


  bearbeitenButtonClicked = (event) => {
    this.setState({
      showGruppenBearbeitenForm: true
    });
  }

  bearbeitenFormClosed = (profil) => {
    this.getGruppenProfil();
    if (profil) {
        this.setState({
            profil: profil,
            showGruppenBearbeitenForm: false,
        });
    } else {
        this.setState({
          showGruppenBearbeitenForm: false
        })

    }
  }



     /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
   componentDidMount() {
       this.getTeilnahmeGruppe();
       this.getGruppenProfil();
   }

  
    render(){

          const { classes, expandedState, currentPerson } = this.props;
          //const { lerngruppe, gruppeName, profilID, teilnahmeGruppe, showProfil, showLerngruppeVerlassenDialog, showLerngruppeForm } = this.state;


          const { lerngruppe, lernvorlieben, gruppeName, profilID, profil, teilnahmeGruppe, showProfil, showLerngruppeVerlassenDialog, showGruppenBearbeitenForm, showLerngruppeForm, loadingInProgress, error } = this.state;
            console.log(lerngruppe)
            console.log(profil)
            console.log(lernvorlieben)
            console.log(profilID)

          return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`lerngruppe${lerngruppe.getID()}accountpanel-header`}>
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Typography variant='body1'>
                        {lerngruppe.getname()}
                    </Typography>
                  </Grid>
                    <Button style={{ width : 250, color: "red"}} color='secondary' onClick={this.verlasseLerngruppeButtonClicked}>
                        Gruppe verlassen
                    </Button>
                    
                    
                  </AccordionSummary>
                 <AccordionDetails>
                  <List>
                    <ListItem>
                  <Button color="primary" onClick= {this.bearbeitenButtonClicked}>Gruppenprofil bearbeiten</Button>
                  </ListItem>
                  <ListItem>
                  <Profil user={lerngruppe}/>
                  </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              
              <GruppeVerlassenDialog show={showLerngruppeVerlassenDialog} teilnahmeGruppe={teilnahmeGruppe} currentPerson={currentPerson} onClose={this.verlasseLerngruppeDialogClosed}/>
              <GruppenBearbeitenForm show={showGruppenBearbeitenForm} lerngruppe={lerngruppe} currentProfil ={profil} lernvorlieben={lernvorlieben}  onClose={this.bearbeitenFormClosed}/>

            </div>
          );
        }
}

/** PropTypes */
GruppenListeEintrag.propTypes = {
  classes: PropTypes.object.isRequired,
  vorschlag: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
  onTeilnahmeGruppeDeleted: PropTypes.func.isRequired
}


export default (GruppenListeEintrag);