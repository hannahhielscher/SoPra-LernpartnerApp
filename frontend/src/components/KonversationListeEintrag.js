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

/**
 * Es wird ein einzelne Konversationen von einer Person/Gruppe dargestellt
 * 
 * Hierfür werden Profilname, die Nachricht, der Inhalt, die Teilnehmer und die Konversation angezeigt
 * 
 */

//Css Style Klassen für die Tabellen Zellen
/**const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Css Style Klassen für die Tabellen Zeilen
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/

class KonversationListeEintrag extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            konversation: null,
            profil: null,
            profilID: null,
            personName: null,
            teilnehmer: null, 
            nachricht: null, 
            inhalt: null,
            loadingInProgress: false,
            error: null
        };
    }
    
    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
      this.props.onExpandedStateChange(this.props.customer);
      }
      
      //Handles the onClick event of the show profil button
      showProfilButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showCustomerForm: true
        });
      }

}