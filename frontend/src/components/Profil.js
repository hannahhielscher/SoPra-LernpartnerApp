import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Button, Paper, Link, Grid } from '@material-ui/core';
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
            teilnahmenGruppen: [],
            teilnehmerAnzahl: null, 
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

    // API Anbindung um die Person vom Backend zu bekommen
    getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.user.id).then(profilBO =>
      this.setState({
            profil: profilBO,
            gruppe: profilBO.gruppe,
            //profilLernfaecher: profilBO.lernfaecher,
            profilLernvorliebenID: profilBO.lernvorlieben,
            loadingInProgress: false,
            error: null
      })).then(() => {
        if (this.state.gruppe !== true){
          this.getTeilnahmen();
        }
      }
      ).catch(e =>
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

    // API Anbindung um die Lernvorlieben der Person vom Backend zu bekommen
    getLernvorlieben = () => {
    LernpartnerAPI.getAPI().getLernvorlieben(this.props.user.profil)
    .then(lernvorliebenBO =>
      this.setState({
            lernvorlieben: lernvorliebenBO,
            tageszeiten: lernvorliebenBO.tageszeiten_bez,
            tage: lernvorliebenBO.tage_bez,
            frequenz: lernvorliebenBO.frequenz_bez,
            lernart: lernvorliebenBO.lernart_bez,
            gruppengroesse: lernvorliebenBO.gruppengroesse_bez,
            lernort: lernvorliebenBO.lernort_bez,
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


    // API Anbindung um die Teilnahmen der Person an einer Gruooe vom Backend zu bekommen
    getTeilnahmen = () => {

    LernpartnerAPI.getAPI().getTeilnahmeGruppeByGruppe(this.state.user.id)
    .then(teilnahmeGruppeBOs =>
      this.setState({
            teilnahmenGruppen: teilnahmeGruppeBOs,
            loadingInProgress: false,
            error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          teilnahmenGruppen: null,
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



  /** Lifecycle method, welche aufgerufen wird, wenn die Komponente in den DOM eingefügt wird */
    componentDidMount() {
        this.getProfil();
        this.getLernvorlieben();
  }


    /** Rendern der Komponente */
  render() {
    const { classes, show } = this.props;
    // Use the states customer
    const { user, teilnahmenGruppen, profil, lernvorlieben, tageszeiten, tage, frequenz, lernart, lernort, gruppengroesse, gruppe, personLernvorliebenID, loadingInProgress, error} = this.state;
    console.log(user)
    console.log(gruppe)
    console.log(teilnahmenGruppen)
    console.log(teilnahmenGruppen.length)
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
                    Lernort: {lernort}<br/> <br/>

                    <b>Mitgliederzahl: </b>{teilnahmenGruppen.length} <br/>
                </>
           }





      </div>
    );
  }
}


/**Spezifische Styles*/
const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
  },
});


/** PropTypes */
Profil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(Profil);

