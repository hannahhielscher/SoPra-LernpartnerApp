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
import ProfilDialog from './dialogs/ProfilDialog';

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
            currentPerson: props.currentPerson,

            //match: null,

            profil: null,
            gruppe: null,

            person: null,
            currentPersonName: " und " + props.currentPerson.vorname + " " + props.currentPerson.name,

            nameGes: null,
            nameNeu: null,

            status: null,

            namePerson: null,

            lerngruppe: null,

            chatPartner: null,
            chatPartnerProfil: props.vorschlag.match_profil_id,

            teilnahmeChat: null,
            
            konversation: null,
            iskonversation: false,
            konversationStatus: null,

            showProfilDialog: false,
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
        showProfilDialog: true
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
            chatPartner: personBO,
            namePerson: personBO.vorname+ " " + personBO.name,
            nameGes: personBO.vorname+ " " + personBO.name + " und " + this.props.currentPerson.vorname+ " " + this.props.currentPerson.name,
            loadingInProgress: false,
            error: null,
      })).then(() => {
            this.getKonversation();
        }).catch(e =>
              this.setState({
                chatPartner: null,
                nameGes: null,
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
            chatPartner: lerngruppeBO,
            nameGes: lerngruppeBO.name,
            loadingInProgress: false,
            error: null,
      })).then(() => {
            this.getKonversation();
        }).catch(e =>
              this.setState({
                chatPartner: null,
                nameGes: null,
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

  /** Add TeilnahmeChatPartner */
  getKonversation = () => {
    LernpartnerAPI.getAPI().getKonversationByName(this.state.nameGes)
    .then(konversationBO =>
      this.setState({
        konversation: konversationBO,              // disable loading indicator                 // no error message
        konversationStatus: konversationBO.anfragestatus
      })).then(() => {
        this.nameAnpassen();
        this.getTeilnahme();
      }).catch(e =>
      this.setState({
        konversationBO: false,
        konversationStatus: false,
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  /** Add TeilnahmeChatPartner */
  getTeilnahme = () => {
    LernpartnerAPI.getAPI().getTeilnahmeChatByKonversationAndPerson(this.state.konversation.id, this.state.currentPerson.id)
    .then(teilnahmeChatBO =>
      this.setState({
        teilnahmeChat: teilnahmeChatBO,              // disable loading indicator                 // no error message
        status: teilnahmeChatBO.status,
      })).catch(e =>
      this.setState({
        teilnahmeChat: false,
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );
  }

  nameAnpassen = () => {
    this.setState({
        nameNeu: this.state.konversation.name.replace(this.state.currentPersonName,''),
    });
  }

  /** Handles the onClose event of the CustomerForm */
  anfrageFormClosed = () => {
    // customer is not null and therefor changed
      this.setState({
        showAnfrageForm: false
      });

  }

  /** Handles the onClose event of the CustomerForm */
  profilDialogClosed = (profil) => {
    // customer is not null and therefor changed
    if (profil) {
      this.setState({
        
        showProfilDialog: false
      });
    } else {
      this.setState({
        showProfilDialog: false
      });
    }
  }

    componentDidMount() {
      // load initial balance
      this.getProfil();
    }

    render(){
          const { classes, expandedState } = this.props;
          const { nameNeu, teilnahmeChat, vorschlag, profil, currentPerson, gruppe, person, nameGes, namePerson, status, lerngruppe, chatPartner, chatPartnerProfil, iskonversation, konversation, konversationStatus, showProfil, showProfilDialog, showAnfrageForm } = this.state;
          console.log(konversation)
          console.log(nameNeu)
          console.log(chatPartner)
          console.log(teilnahmeChat)
          console.log(status)
          console.log(nameGes)

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
                        <Typography variant='body1' className={classes.heading}>{nameGes}
                        </Typography>
                      :
                        <Typography variant='body1' className={classes.heading}>{namePerson}
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
                       {
                       status === 0?
                        <>
                            <Button variant="contained" color='secondary' size="small" className={classes.button} onClick={this.showProfilButtonClicked}>
                              Profil ansehen
                            </Button>
                            <h4 style={{ marginLeft : 25, color: "#bfbfbf"}}>
                            Du bist bereits mit {nameNeu} in Kontakt oder es steht bereits eine Kontaktanfrage aus.
                            </h4>
                        </>
                        :
                        <>
                            <Button  variant="contained" color='secondary' size="small" className={classes.button} onClick={this.showProfilButtonClicked}>
                              Profil ansehen
                            </Button>
                            <Button  variant="contained" color='secondary' size="small" className={classes.button} onClick={this.sendAnfrageButtonClicked}>
                              Kontaktanfrage
                            </Button>
                        </>
                       }
                    </AccordionDetails>
              </Accordion>
              <AnfrageForm show={showAnfrageForm} currentPerson={currentPerson} chatPartner={chatPartner} chatPartnerProfil={chatPartnerProfil} onClose={this.anfrageFormClosed} />
              <ProfilDialog show={showProfilDialog} chatPartner={chatPartner} onClose={this.profilDialogClosed}/>
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