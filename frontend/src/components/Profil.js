import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfilBO from '../api/ProfilBO';

class Profil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            profil: null,
            gruppe: false,
            personVorname = null,
            personName = null,
            personSemester = 0,
            personStudiengang = None,
            """lerngruppe = False --> reinnehmen oder nicht?"""
            main_person_id = None,
            personenprofil_id = None,
            personLernfaecher = null,
            personLernvorlieben = null """oder doch []?"""
            loadingInProgress: false,
            loadingError: null,
        };
    }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getProfil();
  }

/**   showVorschlagButtonClick = (event) => {
      event.stopPropagation();
      this.setState({
        showVorschlag: true
      });
    }**/




    // API Anbindung um Profil vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.props.person.getID())
      .then(personBO =>
          this.setState({
            person: personBO,
            personName: personBO.name,
            personVorname: personBO.vorname,
            personSemester: personBO.semester,
            personStudiengang: personBO.studiengang,
            personProfilID: personBO.personenprofil_id,
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
            loadingInProgress: false,
            error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

     getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.profil.getID()).then(profilBO =>
      this.setState({
            profil: profilBOs,
            profilLernfaecher: profilBO.lernfaecher,
            profilLernvorlieben: profilBO.lernvorlieben,
            loadingInProgress: false,
            error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          profil: null,
          profilLernfaecher: null,
          profilLernvorlieben: false,
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

   /** Renders the component */
  render() {
    const { classes } = this.props;
    // Use the states customer
    const { profil, name, vorname, semester, studiengang, lernfaecher, lernvorlieben, loadingInProgress, error} = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
    """  <Button color="primary" onClick= {this.showVorschlagButtonClick}>Zurueck zu den Vorschlaegen</Button>"""
      <Typography variant='body1' color={'textSecondary'}>

                            <b>Semester: </b> {personSemester} <br />
                            <b>Studiengang: </b>{personStudiengang}<br />
                            <b>Lernfächer: </b>{personLernfaecher}<br />
                            <b>Lernvorlieben: </b>{personLernvorlieben}<br />


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
Profil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(Profil);

