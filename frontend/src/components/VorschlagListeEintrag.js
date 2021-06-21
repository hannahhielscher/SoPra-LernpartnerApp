import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import Profil from './Profil';
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
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

class VorschlagListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            vorschlag: props.vorschlag,
            //match: null,
            profil: null,
            person: null,
            profilID: null,
            personName: null,
            personVorname: null,
            showProfil: false,
            showAnfrageForm: false,
            loadingInProgress: false,
            error: null
        };
    }

    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.vorschlag);
    }
    
    //Handles the onClick event of the show profil button
    showProfilButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showProfil: true
      });
    }

    /** Handles the onClick event of the send Anfrage button */
    sendAnfrageButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showAnfrageForm: true
      });
    }

    // API Anbindung um Profil vom Backend zu bekommen 
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.props.vorschlag.getmain_person_id())
      .then(personBO =>
          this.setState({
            person: personBO,
            personName: personBO.name,
            personVorname: personBO.vorname,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                person: null,
                personName: null,
                personVorname: null,
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
          const {vorschlag, profil, profilID, personName, personVorname, showProfil, showAnfrageForm } = this.state;

          return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`vorschlag${vorschlag.getId()}accountpanel-header`}
                >
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
          <Typography variant='body1' className={classes.heading}>{personName}, {personVorname}, {vorschlag.getmatch()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ButtonGroup variant='text' size='small'>
                        <Button color='primary' onClick={this.showProfilButtonClicked}>
                          Profil ansehen
                        </Button>
                        <Button color='secondary' onClick={this.sendAnfrageButtonClicked}>
                          Kontaktanfrage
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                      <Typography variant='body2' color={'textSecondary'}>Profil und Kontaktanfrage</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <Profil show={showProfil} profil={profil}/>
                <AnfrageForm show={showAnfrageForm} profil={profil}/>
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