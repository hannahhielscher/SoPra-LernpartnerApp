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

    /** Event beim Klicken auf den Profil ansehen Button wird definiert */
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

        /** Lernvorlieben der Gruppe holen */
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




    /**Event beim Klicken auf den Gruppe verlassen Button wird definiert*/
    verlasseLerngruppeButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showLerngruppeVerlassenDialog: true
        });
    }


    /** Event beim schließen de */
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

    /** Aufrufen des GruppenBearbeitenForm beim Klicken des Gruppenprofil bearbeiten Button */
  bearbeitenButtonClicked = (event) => {
    this.setState({
      showGruppenBearbeitenForm: true
    });
  }

    /** Aufrufen des Profils, nachdem das GruppenBeaarbeitenForm geschlossen wurde*/
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
                    <Button style={{ width : 250, color: "#cd5b45"}} color='secondary' onClick={this.verlasseLerngruppeButtonClicked}>
                        Gruppe verlassen
                    </Button>
                    
                    
                  </AccordionSummary>
                 <AccordionDetails style={{ width : 250, backgroundColor: '#faf0e6', width: '100%'}}>
                  <List>
                  <ListItem>
                  <Profil user={lerngruppe}/>
                  </ListItem>
                  <ListItem>
                  <Button style={{ marginTop: -20, marginLeft: 8}} variant="contained" size="small" color="primary" onClick= {this.bearbeitenButtonClicked}>Gruppenprofil bearbeiten</Button>
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