import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
//import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import Button from '@material-ui/core/Button';


class MeinProfil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            person: null,
            profil: null,
            lernvorlieben: null,
            gruppe: false,
            personVorname: null,
            personName: null,
            personSemester: 0,
            personStudiengang: null,
            lerngruppe: false,
            personProfilID: null,
            personLernfaecher: null,
            personLernvorliebenID: null,
            loadingInProgress: false,
            loadingError: null,

            showRegistrierungForm: false
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
            personSemester: personBO.semester,
            personStudiengang: personBO.studiengang,
            personProfilID: personBO.personenprofil,
            loadingInProgress: false,
            error: null,
          }))
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
    LernpartnerAPI.getAPI().getProfil(this.props.personProfilID).then(profilBO =>
      this.setState({
            profil: profilBO,
            profilLernfaecher: profilBO.lernfaecher,
            profilLernvorliebenID: profilBO.lernvorlieben,
            loadingInProgress: false,
            error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          profil: null,
          profilLernfaecher: null,
          profilLernvorliebenID: false,
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
    LernpartnerAPI.getAPI().getLernvorlieben(this.props.personLernvorliebenID).then(lernvorliebenBO =>
      this.setState({
            lernvorlieben: lernvorliebenBO,
            loadingInProgress: false,
            error: null
      })).catch(e =>
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


  checkPersonName = (personName) => {
		if (personName = 'Null') {
			this.setState({
				personneu: true
			})
			.catch(e =>
				this.setState({
          personneu: false,
          error: e
				}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
			}
		}

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPerson();
    this.getProfil();
    this.getLernvorlieben();
  }

/**
    //wird aufgerufen, wenn Dialog Fenster geschloßen wird
    MeinProfilFormClosed = projekt => {
        if (projekt) {
            const newProjektList = [...this.state.projekte, projekt];
            this.setState({
                projekte: newProjektList,
                filteredProjekte: [...newProjektList],
                showProjekteForm: false
            });
        } else {
            this.setState({
                showProjekteForm: false
            });
        }
    }
*/


   /** Renders the component */
    render() {
      const { classes } = this.props;
      // Use the states customer
      const { personProfil, personName, personVorname, personSemester, personStudiengang, personLernfaecher, personLernvorlieben, loadingInProgress, error} = this.state;

      // console.log(this.props);
      return (
        <div className={classes.root}>
        <RegistrierungForm show = {showRegistrierungForm} currentPerson={currentPerson} />
        <Button color="primary" onClick= {this.showVorschlagButtonClick}>Mein Profil bearbeiten</Button>
        <Typography variant='body1' color={'textSecondary'}>

                              <b>Semester: </b> {personSemester} <br />
                              <b>Studiengang: </b>{personStudiengang}<br />
                              <b>Lernfächer: </b>{personLernfaecher}<br />
                              <b>Lernvorlieben: </b>{personLernvorlieben}<br />

        </Typography>
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
  person: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withRouter(withStyles(styles)(MeinProfil));

