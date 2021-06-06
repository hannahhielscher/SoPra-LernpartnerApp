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
            studiengang : null,
            semester: null,
            lernfaecher: [],
            lernvorlieben: [],
        };
    }

     // API Anbindung um Lernfaecher des Students vom Backend zu bekommen 
     getLernfaecher = () => {
        
}