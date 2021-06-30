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
import AnfrageForm from './dialogs/AnfrageForm';

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
            gruppe: null,

            person: null,
            personName: null,
            personVorname: null,

            lerngruppe: null,
            lerngruppeName: null,

            chatPartnerProfil: props.vorschlag.match_profil_id,

            teilnahmeChat: null,

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

    getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.vorschlag.match_profil_id)
    .then(profilBO =>
      this.setState({
            profil: profilBO,
            gruppe: profilBO.gruppe,
            //profilLernfaecher: profilBO.lernfaecher,
            profilLernvorliebenID: profilBO.lernvorlieben,
            loadingInProgress: false,
            error: null
      })).then(() => {
            this.getPartner();
            console.log(this.state.gruppe)
        }).catch(e =>
        this.setState({ // Reset state with error from catch
          profil: null,
          gruppe: null,
          //profilLernfaecher: null,
          profilLernvorliebenID: null,
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

    // API Anbindung um Person vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPersonByProfil(this.state.vorschlag.match_profil_id)
      .then(personBO =>
          this.setState({
            //chatPartnerProfil: personBO,
            personName: personBO.name,
            personVorname: personBO.vorname,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                chatPartnerProfil: null,
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

    // API Anbindung um Lerngruppe vom Backend zu bekommen
    getLerngruppe = () => {
      LernpartnerAPI.getAPI().getLerngruppeByProfil(this.state.vorschlag.match_profil_id)
      .then(lerngruppeBO =>
          this.setState({
            //chatPartnerProfil: lerngruppeBO,
            lerngruppeName: lerngruppeBO.name,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                chatPartnerProfil: null,
                lerngruppeName: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    getPartner = () => {
        if (this.state.gruppe === true){
            this.getLerngruppe();
        }else{
            this.getPerson();
        }
    }

  /** Handles the onClose event of the CustomerForm */
  anfrageFormClosed = (chatPartnerProfil) => {
    // customer is not null and therefor changed
    if (chatPartnerProfil) {
      this.setState({
        chatPartnerProfil: chatPartnerProfil,
        showAnfrageForm: false
      });
    } else {
      this.setState({
        showAnfrageForm: false
      });
    }
  }

    componentDidMount() {
      // load initial balance
      this.getProfil();
    }

    render(){
          const { classes, expandedState, currentPerson } = this.props;
          const { vorschlag, profil, gruppe, person, personName, personVorname, lerngruppe, lerngruppeName, chatPartnerProfil, showProfil, showAnfrageForm } = this.state;
          console.log(chatPartnerProfil)
          //console.log(vorschlag)
          //console.log(profil)
          //console.log(gruppe)

          return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`vorschlag${vorschlag.getID()}accountpanel-header`}>
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                    {
                    gruppe ?
                    <Typography variant='body1' className={classes.heading}>{lerngruppeName}
                      </Typography>
                    :
                    <Typography variant='body1' className={classes.heading}>{personVorname} {personName}
                      </Typography>
                    }

                    <Typography variant='body1' className={classes.heading}>Matchquote: {vorschlag.getmatch_quote()}%
                      </Typography>
                    </Grid>
                    <Grid item>
                    
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                      <Typography variant='body2' color={'textSecondary'}>Mehr sehen</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                      <ButtonGroup variant='text' size='small'>
                        <Button color='primary' onClick={this.showProfilButtonClicked}>
                          Profil ansehen
                        </Button>
                        <Button color='secondary' onClick={this.sendAnfrageButtonClicked}>
                          Kontaktanfrage
                        </Button>
                      </ButtonGroup>
                    </AccordionDetails>
              </Accordion>
              <AnfrageForm show={showAnfrageForm} currentPerson={currentPerson} chatPartnerProfil={chatPartnerProfil} onClose={this.anfrageFormClosed} />
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