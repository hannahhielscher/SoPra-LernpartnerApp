import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Button, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


class Profil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            user: props.user,
            profil: null,
            lernvorlieben: null,
            gruppe: false,
            tageszeiten: null,
            tage: null,
            frequenz: null,
            lernart: null,
            gruppengroesse: null,
            lernort: null,
            gruppe: null,
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
    LernpartnerAPI.getAPI().getProfil(this.props.user.id).then(profilBO =>
      this.setState({
            profil: profilBO,
            gruppe: profilBO.gruppe,
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
    LernpartnerAPI.getAPI().getLernvorliebenPraeferenz(this.props.user.profil).then(lernvorliebenBO =>
      this.setState({
            lernvorlieben: lernvorliebenBO,
            tageszeiten: lernvorliebenBO.tageszeiten,
            tage: lernvorliebenBO.tage,
            frequenz: lernvorliebenBO.frequenz,
            lernart: lernvorliebenBO.lernart,
            gruppengroesse: lernvorliebenBO.gruppengroesse,
            lernort: lernvorliebenBO.lernort,
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
        this.getProfil();
        this.getLernvorlieben();
  }


   /** Renders the component */
  render() {
    const { classes, show } = this.props;
    // Use the states customer
    const { user, profil, lernvorlieben, tageszeiten, tage, frequenz, lernart, lernort, gruppengroesse, gruppe, personLernvorliebenID, loadingInProgress, error} = this.state;
    console.log(user)

    // console.log(this.props);
    return (
      <div className={classes.root}>
            {
            gruppe ?
                <>
                    <b> {user.vorname} {user.name} </b> <br />
                    <b>Semester: </b> {user.semester} <br />
                    <b>Studiengang: </b> {user.studiengang} <br />
                    <b>Alter: </b> {user.alter} <br />
                    <b>Geschlecht: </b> {user.geschlecht} <br />

                </>

                :
                <>
                    <b> Profilinformationen: </b> <br /><br />
                    Tageszeiten: {tageszeiten}<br />
                    Tage: {tage}<br />
                    Frequenz: {frequenz}<br />
                    Lernart: {lernart}<br />
                    Lernort: {lernort}
                </>
           }





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
  user: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(Profil);

