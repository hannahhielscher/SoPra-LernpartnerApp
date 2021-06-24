import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import Button from '@material-ui/core/Button';


class Profil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            person: props.person,
            profil: null,
            lernvorlieben: null,
            gruppe: false,
            personVorname = null,
            personName = null,
            personSemester = 0,
            personStudiengang = null,
            lerngruppe = false,
            personProfilID = None,
            personLernfaecher = null,
            personLernvorliebenID = null,
            loadingInProgress: false,
            loadingError: null,
        };
    }



/**   showVorschlagButtonClick = (event) => {
      event.stopPropagation();
      this.setState({
        showVorschlag: true
      });
    }**/



/**
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
*/

     getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.person.personenprofil).then(profilBO =>
      this.setState({
            profil: profilBO,
            gruppe: profilBO.gruppe
            //profilLernfaecher: profilBO.lernfaecher,
            profilLernvorliebenID: profilBO.lernvorlieben,
            loadingInProgress: false,
            error: null
      })).catch(e =>
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


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {

  }


   /** Renders the component */
  render() {
    const { classes, person } = this.props;
    // Use the states customer
    const { profil, lernvorlieben, gruppe, personLernvorliebenID, loadingInProgress, error} = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
    """  <Button color="primary" onClick= {this.showVorschlagButtonClick}>Zurueck zu den Vorschlaegen</Button>"""
      <Typography variant='body1' color={'textSecondary'}>
            gruppe ?
                <b> {profil.name} </b> <br />
                //<b>Lernfächer: </b>{personLernfaecher}<br />
                <b>Lernvorlieben: </b>{lernvorlieben}<br />

                :
                <b> {profil.vorname} {profil.name} </b> <br />
                <b>Semester: </b> {person.semester} <br />
                <b>Studiengang: </b> {person.studiengang} <br />
                <b>Alter: </b> {person.alter} <br />
                <b>Geschlecht: </b> {person.geschlecht} <br />
                //<b>Lernfächer: </b>{personLernfaecher}<br />
                <b>Lernvorlieben: </b>{lernvorlieben}<br />





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

