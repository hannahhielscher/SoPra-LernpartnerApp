import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import LernpartnerAPI from '../api/LernpartnerAPI'
import Profil from './Profil';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import GruppeVerlassenDialog from './dialogs/GruppeVerlassenDialog';
import LernpartnerAPI from '../api/LernpartnerAPI'

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
            lerngruppe: props.lerngruppe,
            gruppeName: this.props.lerngruppe.name,
            teilnahmeGruppe: null,
            profilID: this.props.lerngruppe.gruppenprofil,
            showProfil: false,
            showLerngruppeVerlassenDialog: false,
            //showTeilnehmer: false,
            //showNachrichtenListe: false,
            loadingInProgress: false,
            error: null
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

     /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
   componentDidMount() {
       this.getTeilnahmeGruppe();
   }

    render(){

          const { classes, expandedState, currentPerson } = this.props;
          const { lerngruppe, gruppeName, profilID, teilnahmeGruppe, showProfil, showLerngruppeVerlassenDialog } = this.state;

          return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`lerngruppe${lerngruppe.getID()}accountpanel-header`}
                >
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
                  <Profil user={lerngruppe}/>
                </AccordionDetails>
              </Accordion>
              <GruppeVerlassenDialog show={showLerngruppeVerlassenDialog} teilnahmeGruppe={teilnahmeGruppe} currentPerson={currentPerson} onClose={this.verlasseLerngruppeDialogClosed}/>
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