import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import VorschlagListeEintrag from './VorschlagListeEintrag';
//import SaveIcon from '@material-ui/icons/Save';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';



/**
 * Es werden alle Vorschläge des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [VorschlagListeEintrag](#vorschaglisteeintrag)
 * 
 * Hierfür werden alle Vorschläge des aktuell eingeloggten Student geladen und in die Componente VorschlagListeEintrag gemappt
 * 
 */


class VorschlagListe extends Component {

    constructor(props){
        super(props);

        // console.log(props);
        let expandedID = null;

        if (this.props.location.expandVorschlag) {
        expandedID = this.props.location.expandVorschlag.getID();
        }

        // initiiere einen leeren state
        this.state = {
            vorschlaege : [],
            //currentPersonName: null,
            error: null,
            loadingInProgress: false, 
            expandedVorschlagID: expandedID,
        };
    }


    // API Anbindung um Vorschläge des Students vom Backend zu bekommen 
    getVorschlaege = () => {
            LernpartnerAPI.getAPI().getVorschlaege(this.props.currentUser.id, this.props.lernfach)
            .then(vorschlagBOs =>
                this.setState({
                    vorschlaege: vorschlagBOs,
                    error: null,
                    loadingInProgress: false,
                })).catch(e =>
                    this.setState({
                        vorschlaege: [],
                        error: e,
                        loadingInProgress: false,
                    }));
            this.setState({
                error: null,
                loadingInProgress: true,
                loadingVorschlaegeError: null
            });
    }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getVorschlaege();
        this.setState({
            currentStudentName: this.props.currentUser.getname(),
        })
    }
    
    /** 
     * Handles onExpandedStateChange events from the VorschlagListeEintrag component. Toggels the expanded state of 
     * the VorschlagListeEintrag of the given VorschlagBO.
     * 
     * @param {vorschlag} VorschlagBO of the VorschlagListeEintrag to be toggeled
     */
    onExpandedStateChange = vorschlag => {
        // console.log(vorschlagID);
        // Set expandend Vorschlag Eintrag to null by default
        let newID = null;

        // If same vorschlag entry is clicked, collapse it else expand a new one
        if (vorschlag.getID() !== this.state.expandedVorschlagID) {
        // Expand the customer entry with customerID
        newID = vorschlag.getID();
        }
        // console.log(newID);
        this.setState({
        expandedVorschlagID: newID,
        });
    }

    render() {
        const { classes, lernfach } = this.props;
        const { vorschlaege, expandedVorschlagID, error, loadingInProgress}  = this.state;
    
        return (
          
          <div className={classes.root}>
            <h1>Test: Vorschläge für Lernfach {lernfach}</h1>
            { 
              // Show the list of VorschlagListeEintrag components
              // Do not use strict comparison, since expandedVorschlagID maybe a string if given from the URL parameters
  
              vorschlaege.map(vorschlag =>
                <VorschlagListeEintrag key={vorschlag.getID()} vorschlag={vorschlag} expandedState={expandedVorschlagID === vorschlag.getID()}
                  onExpandedStateChange={this.onExpandedStateChange}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Sorry, deine Vorschläge konnten nicht geladen werden!`} onReload={this.getVorschlaege} />
          </div>
        );
      }
    }


/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
    customerFilter: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    }
  });

/** PropTypes */
VorschlagListe.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
}



export default withRouter(withStyles(styles)(VorschlagListe));