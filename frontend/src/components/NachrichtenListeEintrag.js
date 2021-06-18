import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';

import Nachricht from './Nachricht'

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
            nachricht: [], 
            personID: null, 
            konversation_ID: null,  
            inhalt: null, 
            showProfil: false,
            showNachrichtForm: false,
            loadingInProgress: false,
            error: null
        };
    }


    
    //Handles the onClick event of the show profil button
    showNachrichtButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showNachrichtForm: true
      });
    }

      // API Anbindung um Nachricht vom Backend zu bekommen 
    getNachricht = () => {
        LernpartnerAPI.getAPI().getNachricht(this.props.nachricht)
        .then(nachrichtBO =>
            this.setState({
              nachricht: nachrichtBO,
              inhalt: nachrichtBO.inhalt,
              person_ID: nachrichtBO.person_ID,
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              this.getNachricht()
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
        this.getNachricht();
      }
  
      // Wenn die Componente geupdatet wird
      componentDidUpdate(prevProps){
        if((this.props.show) && (this.props.show !== prevProps.show)) {
          this.getNachricht();
        }
      }

      render() {
        const { classes } = this.props;
        const {nachrichten, inhalt, personID, konversation_ID}

        return(
          <div>
          <Grid container className={classes.header} justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
              <Button color='primary' onClick={this.showNachrichtenButtonClicked}>
                Alle Nachrichten anzeigen 
              </Button>
          </Grid>
          </Grid>
          
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
              <TableHead>
                  <StyledTableRow>
                      <StyledTableCell>Nachrichten</StyledTableCell>
                      <StyledTableCell align="center">inhalt</StyledTableCell>
                      <StyledTableCell align="center">profil</StyledTableCell>
                  </StyledTableRow>
              </TableHead>
              <TableBody>
                  {
                      nachrichten ?
                      <>
                      {
                          nachrichten.map(nachricht =>
                            <NachrichtenListeEintrag key={nachricht.getID()} nachricht={nachricht} expandedState={expandedNachrichtID === nachricht.getID()}
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
          <ContextErrorMessage error={error} contextErrorMsg = {'Deine Nachrichten konnten nicht geladen werden'} onReload={this.getNachrichten} /> 
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