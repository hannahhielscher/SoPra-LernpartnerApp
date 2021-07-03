import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LernpartnerAPI from '../../api/LernpartnerAPI'

class ProfilLoeschenForm extends Component{
    constructor(props){
        super(props);

        this.state = {
        verlassenInProgress: false,
        verlassenError: null
        };
    }

      /** Gruppe verlassen */
    verlasseGruppe = () => {
        LernpartnerAPI.getAPI().deleteTeilnahmeGruppe(this.props.teilnahmeGruppe.getID())
        .then(teilnahmeGruppe => {
            this.setState({
                verlassenInProgress: false,              // disable loading indicator
                verlassenError: null                     // no error message
            });
            this.props.onClose(this.props.teilnahmeGruppe);  // call the parent with the deleted customer
        }).catch(e =>
        this.setState({
            verlassenInProgress: false,              // disable loading indicator
            verlassenError: e                        // show error message
        })
        );

    // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }








}