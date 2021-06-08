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
            loadingInProgress: false,
            loadingError: null,
        };
    }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getProfil();
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