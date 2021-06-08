import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

class NachrichtForm extends Component {
    constructor(props) {
        super(props);

     // Init the state
     this.state = {
         nachricht: ''
    
      };
      // save this state for canceling
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            nachricht: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.nachricht(this.state.nachricht)
        this.setState({
            nachricht: ''
        });
    }
    
    
    render() { 
    return 
    <form className="NachrichtForm" onSubmit={this.handleSubmit}>
        <input
        placeholder= "schreibe eine Nachricht"
        type="text"
        onChange={this.handleChange}
        value={this.state.nachricht}
        disabled={this.props.disabled} />
    </form>
 }

}