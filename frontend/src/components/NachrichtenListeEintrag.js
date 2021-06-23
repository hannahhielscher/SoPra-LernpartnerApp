import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import Nachricht from './Nachricht'
import NachrichtForm from './NachrichtForm'
import GruppeForm from './GruppeForm'

/**
 * Es wird eine einzelne Nachricht von einer Person  dargestellt
 *
 * 
 * Hierfür wird der Inhalt der Nachricht angezeigt 
 * 
 */

class NachrichtenListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            nachricht: [], //Liste mit den IDs aller Nachrichten 
            konversation_ID: null,  
            inhalt: null, 
            person_id: null,
            //showNachrichtForm: false,
            //showGruppeForm: false, 
            loadingInProgress: false,
            error: null
        };
    }


    
    //open the onClick event of the show Nachricht button
    showNachrichtButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showNachrichtForm: true
      });
    }

     //ruft die getNachrichten() Funktion in den Props auf
     //getNachrichten = () => {
      //this.props.getNachrichten(); }


      // API Anbindung um Nachricht vom Backend zu bekommen 
    getNachrichten = () => {
        LernpartnerAPI.getAPI().getNachrichten(this.props.nachricht)
        .then(nachrichtBO =>
            this.setState({
              nachricht: nachrichtBO,
              inhalt: nachrichtBO.inhalt,
              person_id: nachrichtBO.person_id,
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              this.getNachrichten()
            })
            .catch(e =>
                this.setState({
                  nachricht: null,
                  inhalt: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }
   


    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getNachrichten();
      }
  

      render() {
        const { classes, currentperson } = this.props;
        const {nachrichten, inhalt, konversation_ID, person_id}

        return(
          <div>
          <Grid container className={classes.header} justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
              <Button color='primary' onClick={this.showNachrichtButtonClicked}>
                Alle Nachrichten anzeigen 
              </Button>
          </Grid>
          </Grid>
          
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="nachrichten tabelle">
              <TableHead>
                  <StyledTableRow>
                      <StyledTableCell>Nachrichten</StyledTableCell>
                      <StyledTableCell align="center"> {inhalt} </StyledTableCell>
                  </StyledTableRow>
              </TableHead>
              <TableBody>
                  {
                      nachrichten ?
                      <>
                      {
                          nachrichten.map(nachricht =>
                            <Nachricht key={nachricht.getID()} nachricht={nachricht} username={nachricht.getPersonID()} inhalt={nachricht.getInhalt()} expandedState={expandedNachrichtID === nachricht.getID()}
                              onExpandedStateChange={this.onExpandedStateChange}
                            />)
                      }
                      </>
                      :
                      <></>
                  }
              </TableBody>
          </Table>
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={error} contextErrorMsg = {'Deine Nachricht konnte nicht geladen werden'} onReload={this.getNachrichten} /> 
          </TableContainer>
        </div>
        )
      }
}

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 10,
  },
});
  
  /** PropTypes */
  NachrichtListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    NachrichtListeEintrag: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  
  
  export default withStyles(styles)(NachrichtListeEintrag);