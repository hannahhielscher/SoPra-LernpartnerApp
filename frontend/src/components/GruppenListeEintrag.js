import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import Profil from './Profil';
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Es wird ein einzelner Vorschlag für einen passenden Lernpartner oder /-gruppe mit allen not wendigen Informationen dargestellt
 *
 * Hierfür werden Profilname, Alter, Geschlecht, Semester, Lernfach und der Prozentsatz des Matches angezeigt
 *
 */

class GruppeListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            //vorschlag: props.vorschlag,
            //lerngruppe: props.lerngruppe,
            profilID: null,
            gruppeName: this.props.lerngruppe.name,
            showProfil: false,
            //showTeilnehmer: false,
            showNachrichtenListe: false,
            loadingInProgress: false,
            error: null
        };
    }

    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.lerngruppe);
    }

    //Handles the onClick event of the show profil button
    showProfilButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showProfil: true
      });
    }

    //Handles the onClick event of the show NachrichtenListe button
    showNachrichtenListeButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showNachrichtenListe: true
      });
    }

    // API Anbindung um Profil vom Backend zu bekommen
    getProfil = () => {
      LernpartnerAPI.getAPI().getProfil(this.props.lerngruppe.getgruppenprofil())
      .then(profilBO =>
          this.setState({
            profil: profilBO,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                person: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }


    render(){

          const { classes, expandedState } = this.props;
          const {profilID, lerngruppeName, showProfil, showNachrichtenListe } = this.state;

          return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`lerngruppe${lerngruppe.getId()}accountpanel-header`}
                >
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
          <Typography variant='body1' className={classes.heading}>{lerngruppenName}}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ButtonGroup variant='text' size='small'>
                        <Button color='primary' onClick={this.showProfilButtonClicked}>
                          Profil ansehen
                        </Button>
                        <Button color='secondary' onClick={this.showNachrichtenListeButtonClicked}>
                          Chat ansehen
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                      <Typography variant='body2' color={'textSecondary'}>Profil und Chat</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <Profil show={showProfil} profil={profil}/>
                <NachrichtenListe show={showNachrichtenListe} profil={profil}/>
              </Accordion>
            </div>
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
  content: {
      margin: theme.spacing(1),
    },
  table: {
      minWidth: 700,
    },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      textAlign: "left"
  },
  button: {
      margin: theme.spacing(1),
      },
  laden: {
    padding: 0
  },
  breite: {
    width: 220
  }
  });

/** PropTypes */
VorschlagListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  vorschlag: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(VorschlagListeEintrag);