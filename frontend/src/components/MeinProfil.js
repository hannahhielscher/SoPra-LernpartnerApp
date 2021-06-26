import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
//import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import RegistrierungForm from './dialogs/RegistrierungForm';
import MeinProfilForm from './dialogs/MeinProfilForm';
import { LernpartnerAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import Button from '@material-ui/core/Button';


class MeinProfil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            person: null,
            
            personVorname: null,
            personName: this.props.personName,
            personSemester: null,
            personAlter: null,
            personStudiengang: null,
            lerngruppe: false,
            personProfilID: null,
            personLernfaecher: [],
            lernfaechernamen: [],
            lernfaechergesamt: [],
            personLernvorliebenID: null,
            profil: null,
            lernvorlieben: null,
            lernvorliebenfrequenz: null,
            gruppe: false,
            showMeinProfilForm: false,
            showRegistrierungForm: false,
            loadingInProgress: false,
            loadingError: null,
            
        };
    }

    // API Anbindung um Profil vom Backend zu bekommen
    
    getPerson = () => {
      LernpartnerAPI.getAPI().getPersonByGoogleID(this.props.currentPerson.getgoogle_user_id())
      .then(personBO =>
          this.setState({
            person: personBO,
            personName: personBO.name,
            personVorname: personBO.vorname,
            personAlter: personBO.alter,
            personSemester: personBO.semester,
            personStudiengang: personBO.studiengang,
            personProfilID: personBO.personenprofil,
            loadingInProgress: false,
            error: null,
          })).then(() => {
            if (this.state.personName === 'Null'){
              this.setState({
                showRegistrierungForm: true
              })
            }
          })
          .catch(e =>
              this.setState({
            person: null,
            personName: null,
            personVorname: null,
            personSemester: null,
            personStudiengang: null,
            personProfilID: null,
            loadingInProgress: false,
            error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }
    

   getProfil = () => {
		LernpartnerAPI.getAPI().getProfil(this.props.currentPerson.getprofil())
			.then(profilBO =>
				this.setState({
            profil: profilBO,
            personLernvorliebenID: profilBO.lernvorlieben_id,
            error: null,
            loadingInProgress: false,
          })).then(() => {
            this.getLernvorlieben();
           
          }).catch(e =>
            this.setState({
              profil: null,
              personLernfaecher: null,
              error: e,
              loadingInProgress: false,
            }));

      // set loading to true
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
    }

    getLernfaecher = () => {
      LernpartnerAPI.getAPI().getLernfaecherByProfil(this.props.currentPerson.getprofil())
      .then(lernfaecherBOs =>
        this.setState({
              personLernfaecher: lernfaecherBOs,
              lernfaechernamen: lernfaecherBOs.map(lernfach=> lernfach.bezeichnung + "  "),
              loadingInProgress: false,
              error: null
        }))
        .catch(e =>
          this.setState({ // Reset state with error from catch
            personLernfaecher: null,
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

    getalleLernfaecher = () => {
      LernpartnerAPI.getAPI().getLernfaecher()
      .then(lernfaecherBOs =>
        this.setState({
              lernfaechergesamt: lernfaecherBOs,
              loadingInProgress: false,
              error: null
        }))
        .catch(e =>
          this.setState({ // Reset state with error from catch
            lernfaechergesamt: null,
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
   
    getLernvorlieben = () => {
    LernpartnerAPI.getAPI().getLernvorlieben(this.state.personLernvorliebenID)
    .then(lernvorliebenBO =>
      this.setState({
            lernvorlieben: lernvorliebenBO,
            lernvorliebenfrequenz: lernvorliebenBO.frequenz,
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
  
  
  //Handles the onClick event of the show profil button
  bearbeitenButtonClicked = (event) => {
    this.setState({
      showMeinProfilForm: true
    });
  }

  //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
  userFormClosed = (person) => {
    this.getPerson();
    if (person) {
        this.setState({
            person: person,
            showRegistrierungForm: false,
        });
    } else {
        this.setState({
          showRegistrierungForm: false
        })
      
    }
  }

  //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
  bearbeitenFormClosed = (person) => {
    this.getPerson();
    if (person) {
        this.setState({
            person: person,
            showMeinProfilForm: false,
        });
    } else {
        this.setState({
          showMeinProfilForm: false
        })
      
    }
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount(){
    this.getPerson();
    this.getProfil();
    this.getLernfaecher();
    this.getalleLernfaecher();
    
  }


   /** Renders the component */
    render() {
      const { classes , currentPerson } = this.props;
      // Use the states customer
      const { lernfaechernamen, profil, personProfil, personName, personVorname, personSemester, personAlter, personStudiengang, personLernfaecher, lernfach, lernfaechergesamt, personLernvorliebenID, lernvorlieben, lernvorliebenfrequenz, showRegistrierungForm, showMeinProfilForm, loadingInProgress, error} = this.state;
      console.log(lernfaechergesamt)
      
    
      return (
        <div className={classes.root}>
        <RegistrierungForm show={showRegistrierungForm} currentPerson = {currentPerson} onClose={this.userFormClosed}/>
        
        <Button color="primary" onClick= {this.bearbeitenButtonClicked}>Mein Profil bearbeiten</Button>
        <Typography variant='body1' color={'textSecondary'}>

                              <b>Name: </b>{personVorname} {personName}<br />
                              <b>Alter: </b> {personAlter} <br />
                              <b>Semester: </b> {personSemester} <br />
                              <b>Studiengang: </b>{personStudiengang}<br />
                              <b>Lernfächer: </b>{lernfaechernamen}<br />
                              <b>Lernvorlieben-Frequenz Test: </b>{lernvorliebenfrequenz}<br />

        </Typography>
        <MeinProfilForm show={showMeinProfilForm} currentPerson={currentPerson} currentProfil={profil} lernvorlieben={lernvorlieben} lernfaechergesamt={lernfaechergesamt} onClose={this.bearbeitenFormClosed}/>
        </div>
      );
    }
}
//<MeinProfilForm show={showMeinProfilForm} currentPerson={currentPerson}/>
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

  laden: {
    padding: 0
  },
  breite: {
    width: 220
  }
  });


/** PropTypes */
MeinProfil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  currentPerson: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withRouter(withStyles(styles)(MeinProfil));

