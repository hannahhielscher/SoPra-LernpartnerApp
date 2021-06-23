import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import GruppenListeEintrag from './GruppenListeEintrag';
//import SaveIcon from '@material-ui/icons/Save';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



/**
 * Es werden alle Vorschläge des aktuell eingeloggten Studenten angezeigt
 *
 * @see See [VorschlagListeEintrag](#vorschaglisteeintrag)
 *
 * Hierfür werden alle Vorschläge des aktuell eingeloggten Student geladen und in die Componente VorschlagListeEintrag gemappt
 *
 */


class GruppenListe extends Component {

    constructor(props){
        super(props);

        let expandedID = null;

        if (this.props.location.expandLerngruppe) {
          expandedID = this.props.location.expandLerngruppe.getID();
        }

        // Init an empty state
        this.state = {
          lerngruppen: [],
          personID: this.props.currentPerson.id,
          error: null,
          loadingInProgress: false,
          expandedLerngruppeID: expandedID,
          //showCustomerForm: false
        };

    }

    /** Fetches all LerngruppenBOs from the backend */
    getLerngruppen = () => {
        LernpartnerAPI.getAPI().getLerngruppe(this.props.currentPerson.id)
            .then(lerngruppeBOs =>
                this.setState({               // Set new state when LerngruppeBOs have been fetched
                    lerngruppen: lerngruppeBOs,
                    //name: lerngruppeBO.name
                    loadingInProgress: false,   // disable loading indicator
                    error: null
                })).catch(e =>
                    this.setState({             // Reset state with error from catch
                        lerngruppen: [],
                        loadingInProgress: false, // disable loading indicator
                        error: e
                    })
                );

        // set loading to true
        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /**
     * Handles onExpandedStateChange events from the GruppeListeEintrag component. Toggels the expanded state of
     * the GruppeListeEintrag of the given LerngruppeBO.
     *
     * @param {lerngruppe} LerngruppeBO of the GruppeListeEintrag to be toggeled
     */
    onExpandedStateChange = lerngruppe => {
        // console.log(vorschlagID);
        // Set expandend Lerngruppe Eintrag to null by default
        let newID = null;

        // If same lerngruppe entry is clicked, collapse it else expand a new one
        if (lerngruppe.getID() !== this.state.expandedLerngruppeID) {
        // Expand the lerngruppe entry with lerngruppeID
        newID = lerngruppe.getID();
        }
        // console.log(newID);
        this.setState({
        expandedLerngruppeID: newID,
        });
    }

    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getLerngruppen();
    }

    render() {
        const { classes } = this.props;
        const { lerngruppen, personID, expandedLerngruppeID, loadingInProgress, error }  = this.state;
        console.log(lerngruppen)

        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item >
                        <Typography>
                            <h1>Lerngruppen</h1>
                        </Typography>
                    </Grid>
                </Grid>
                {
                    lerngruppen.map(lerngruppe =>
                    <GruppenListeEintrag key={lerngruppe.getID()} lerngruppe={lerngruppe} personID={personID} expandedState={expandedLerngruppeID === lerngruppe.getID()}
                      onExpandedStateChange={this.onExpandedStateChange}
                    />)
                }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={error} contextErrorMsg={`Sorry, deine Lerngruppen konnten nicht geladen werden!`} onReload={this.getLerngruppen} />
            </div>
        );
      }
    }

/** Component specific styles */
const styles = theme => ({
  root: {
      width: '100%',
  },
  content: {
      margin: theme.spacing(1),
  }
});

/** PropTypes */
GruppenListe.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
}


export default withRouter(withStyles(styles)(GruppenListe));