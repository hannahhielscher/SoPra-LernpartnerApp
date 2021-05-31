import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Button, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import VorschlagListeEintrag from './VorschlagListeEintrag';

/**
 * Es werden alle Vorschläge des aktuell eingeloggten Studenten angezeigt
 * 
 * @see See [VorschlagListeEintrag](#vorschaglisteeintrag)
 * 
 * Hierfür werden alle Vorschläge des aktuell eingeloggten Student geladen und in die Componente VorschlagListeEintrag gemappt
 * 
 */


//Css Style für Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


//Css Style für Tabllen Zeilen
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(4n+1)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


class VorschlagListe extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            vorschlaege : [],
            currentPersonName: null,
            error: null,
            loadingInProgress: false, 
        };
    }


    // API Anbindung um Vorschläge des Students vom Backend zu bekommen 
    getVorschlaege = () => {
            LernpartnerAPI.getAPI().getVorschlaege(this.props.currentPerson.id)
            .then(vorschlaegeBOs =>
                this.setState({
                    vorschlaege: vorschlaegeBOs,
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
            currentStudentName: this.props.currentPerson.getname(),
        })
    }
    
    render(){

        const { classes } = this.props;
        const { vorschlaege, currentPersonName, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                 <Grid container className={classes.header} justify="flex-end" alignItems="center" spacing={2}>
                    <Grid item xs/>
                    <Grid item>
                    <Button variant="outlined" color="primary" disableRipple 
                    style={{ backgroundColor: 'transparent', textTransform: 'None'}}
                    >Name: {currentPersonName}<br/></Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Vorschlag</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Alter</StyledTableCell>
                                <StyledTableCell align="center">Geschlecht</StyledTableCell>
                                <StyledTableCell align="center">Semester</StyledTableCell>
                                <StyledTableCell align="center">Lernfach</StyledTableCell>
                                <StyledTableCell align="center">Match</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                vorschlaege ?
                                <>
                                {
                                    vorschlaege.map(vorschlag => 
                                        <VorschlagListeEintrag key={vorschlag.getID()} vorschlag = {vorschlag} 
                                        getVorschlaege = {this.getVorschlaege}
                                        show={this.props.show}
                                    />) 
                                }
                                </>
                                :
                                <></>
                            }
                        </TableBody>
                    </Table>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Deine Vorschläge konnten nicht geladen werden'} onReload={this.getVorschlaege} /> 
                </TableContainer>            
            </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      content: {
        margin: theme.spacing(1),
      },
      table: {
        minWidth: 700,
      },
      header:{
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      button:{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(3),
          float: 'right'
      }
  });

/** PropTypes */
VorschlagListe.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(VorschlagListe));