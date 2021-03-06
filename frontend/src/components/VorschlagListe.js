import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import VorschlagListeEintrag from './VorschlagListeEintrag';

/**
 * Es werden alle Vorschläge des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [VorschlagListe](#vorschagliste)
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
            test: false,
        };
    }


    // API Anbindung um Vorschläge des Students vom Backend zu bekommen 
    getVorschlaege = () => {
            LernpartnerAPI.getAPI().getVorschlaegeByPersonByLernfach(this.props.currentPerson.id, this.props.lernfach)
            .then(vorschlagBOs =>
                this.setState({
                    vorschlaege: vorschlagBOs,
                    error: null,
                    loadingInProgress: false,
                })).then(() => {
                  if (this.state.vorschlaege === null){
                    this.setState({
                      test: true,
                    })
                    
                  }
                })
                .catch(e =>
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
        const { show, classes, currentPerson, lernfach } = this.props;
        const { vorschlaege, expandedVorschlagID, error, loadingInProgress}  = this.state;
        //console.log(lernfach)
        return (
          show ?
          <div className={classes.root}>
            <h2 style={{ marginTop: '30px'}}>Generiere deine neuen Matches:</h2>
            <Button style={{ marginBottom: '40px'}} variant="contained" color="primary" onClick= {this.getVorschlaege}>Matches generieren</Button>
            { 
              // Show the list of VorschlagListeEintrag components
              // Do not use strict comparison, since expandedVorschlagID maybe a string if given from the URL parameters
  
              vorschlaege.map(vorschlag =>
                <VorschlagListeEintrag key={vorschlag.getID()} vorschlag={vorschlag} currentPerson={currentPerson} expandedState={expandedVorschlagID === vorschlag.getID()}
                  onExpandedStateChange={this.onExpandedStateChange}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Sorry, deine Vorschläge konnten nicht geladen werden!`} onReload={this.getVorschlaege} />
          </div>
          : null
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
    show: PropTypes.bool.isRequired,
}



export default withRouter(withStyles(styles)(VorschlagListe));