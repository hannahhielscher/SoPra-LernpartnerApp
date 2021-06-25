import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, makeStyles, Link, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, Grid, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, GroupBO } from '../../api';

//import {LernpartnerAPI} from '../../api';

import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
//import ProfilBO from '../../api/ProfilBO';


class GruppeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gruppenName: null,
            gruppenNameValidationFailed: null,
            gruppenNameEdited: null,
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null

        };

        // save this state for canceling
        this.baseState = this.state;
    }


  /** Renders the component */
  render() {
    const { classes } = this.props;
    //const { gruppenName, gruppenNameValidationFailed, gruppenNameEdited, addingInProgress, addingError,
    //updatingInProgress, updatingError } = this.state;

    return (
        <Paper className={classes.root}>
        <div className={classes.content}>
          <Typography variant='h6'>
            Gruppennprofile
          </Typography>
        </div>
      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  content: {
    margin: theme.spacing(1),
    }
});

export default withStyles(styles)(GruppeForm);