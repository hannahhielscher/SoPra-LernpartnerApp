import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import LernpartnerAPI from '../api/LernpartnerAPI'
//import Profil from './Profil';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
//import Profil from './Profil';
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
            profilID: this.props.lerngruppe.gruppenprofil,
            teilnahmeGruppe: [],
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

    getTeilnahmeGruppe = () => {
        LernpartnerAPI.getAPI().getTeilnahmeGruppeById(this.props.personID)
            .then(teilnahmeGruppeBOs =>
                this.setState({               // Set new state when LerngruppeBOs have been fetched
                    teilnahmeGruppe: teilnahmeGruppeBOs,
                    //name: lerngruppeBO.name
                    loadingInProgress: false,   // disable loading indicator
                    error: null
                })).catch(e =>
                    this.setState({             // Reset state with error from catch
                        teilnahmeGruppeBOs: [],
                        loadingInProgress: false, // disable loading indicator
                        error: e
                    })
                );

        // set loading to true
        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Handles the onClick event of the Profil ansehen button */
    showProfilButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProfil: true
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


    render(){

          const { classes, expandedState } = this.props;
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
                </AccordionSummary>
                <AccordionDetails>
                  <ButtonGroup variant='text' size='small'>
                    <Button color='primary' onClick={this.showProfilButtonClicked}>
                        Profil ansehen
                    </Button>
                    <Button color='secondary' onClick={this.verlasseLerngruppeButtonClicked}>
                        Gruppe verlassen
                    </Button>
                  </ButtonGroup>
                </AccordionDetails>
              </Accordion>
              <GruppeVerlassenDialog show={showLerngruppeVerlassenDialog} teilnahmeGruppe={teilnahmeGruppe} onClose={this.verlasseLerngruppeDialogClosed}/>
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
}


export default (GruppenListeEintrag);