import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
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
            vorname = null,
            name = null,
            semester = 0,
            studiengang = None,
            """lerngruppe = False --> reinnehmen oder nicht?"""
            main_person_id = None,
            personenprofil_id = None,
            lernfaecher = [],
            lernvorlieben = null """oder doch []?"""
            loadingInProgress: false,
            loadingError: null,
        };
    }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getProfil();
  }

    // API Anbindung um Profil vom Backend zu bekommen
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.props.person.getID())
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

     getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props).then(profilBOs =>
      this.setState({
        profil: profilBOs,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          profil: null,
          loadingInProgress: false,
          loadingError: e
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
    const { classes, profil } = this.props;
    // Use the states customer
    const { profil, loadingInProgress, loadingError} = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>

      </div>
    );
  }



}