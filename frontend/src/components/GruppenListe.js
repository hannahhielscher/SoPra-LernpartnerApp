import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';
//import VorschlagListeEintrag from './VorschlagListeEintrag';
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
          error: null,
          loadingInProgress: false,
          expandedCustomerID: expandedID,
          showCustomerForm: false
        };

    }

    /** Fetches all LerngruppenBOs from the backend */
    getLerngruppen = () => {
        LernpartnerAPI.getAPI().getLerngruppen(this.props.currentPerson.id)
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

    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
        this.getLerngruppen();
    }

    render() {
        const { classes } = this.props;
        //const { }  = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item >
                        <Typography>
                            <h1>Lerngruppen</h1>
                        </Typography>
                    </Grid>
                </Grid>
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
    },
  table: {
      minWidth: 700,
    },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      textAlign: "left"
  },
  laden: {
    padding: 0
  },
  breite: {
    width: 220
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