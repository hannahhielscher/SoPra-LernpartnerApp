import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Grid, Typography,  Divider } from '@material-ui/core';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
//import { withRouter } from 'react-router-dom';
//import { Button, ButtonGroup } from '@material-ui/core';
//import TextField from "@material-ui/core/TextField";

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';

//import Nachricht from './Nachricht'
//import NachrichtForm from './NachrichtForm'
//import GruppeForm from './GruppeForm'

/**
 * Es werden alle Nachrichten des aktuell eingeloggten Studenten angezeigt
 *
 * @see See [NachrichtenListeEintrag]](#nachrichtenlisteeintrag)
 *
 * Hierfür werden alle Nachrichten des aktuell eingeloggten Student geladen und in die Componente NachrichtenListeEintrag gemappt
 *
 */

class NachrichtenListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            nachricht: this.props.nachricht, //Liste mit den IDs aller Nachrichten 
            //konversation_ID: null,  
            nachricht_inhalt: null, 
            person: null,
            person_id: null,
            personName: null,
            personVorname: null,
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


      // API Anbindung um Person vom Backend zu bekommen 
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.props.nachricht.person_id)
      .then(personBO =>
          this.setState({
            person: personBO,
            personName: personBO.name,
            personVorname: personBO.vorname,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                person: null,
                personName: null,
                personVorname: null,
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
        this.getPerson();
    }

      render() {
        const { classes, currentPerson } = this.props;
        const {nachricht, nachricht_inhalt, person, personName, personVorname, expandedNachrichtID} = this.state;
        console.log(person)

        if (nachricht.person_id !== currentPerson.getID()) {
                    
          return (
            <div id="empfänger_text">
              <Grid item
                xs
                className={classes.outerColumn}
                style={{ display: "flex", alignItems: "center", position: "rigth" }}
              >
                
            <b>{personVorname} {personName}</b>
              </Grid>
              <Grid item
                xs
                className={classes.outerColumn}
                className={classes.bubbleSender}
                style={{ display: "flex", alignItems: "center", position: "rigth" }}
              >
                
                <Typography>{nachricht.nachricht_inhalt}</Typography>
              </Grid>
              <Divider />
            </div>
          );
        } 
        
        else {
          return (
            <div id="sender_text">
              <Grid
                item
                className={classes.outerColumn}
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
                position= "left"
              >
              <b>Du</b>
              </Grid>
              <Grid
                item
                className={classes.outerColumn}
                className={classes.bubbleEmpfaenger}
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
                position= "left"
              >
              <Typography>{nachricht.nachricht_inhalt}</Typography>
              </Grid>
              
              <Divider />
            </div>
            

          );
        }
    }
}
      


const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 10,
  },
  bubbleSender: {
    borderRadius: "20px",
    backgroundColor: "#cdc0b0",
    margin: "10px",
    padding: "10px",
    width: "400px"
  },
  bubbleEmpfaenger: {
    borderRadius: "20px",
    backgroundColor: "#eedfcc",
    margin: "10px",
    padding: "10px",
    width: "400px",
    marginLeft: "500px"
  },
  right: {
  justifyContent: "flex-end",
}
});
  
  /** PropTypes */
  NachrichtenListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    NachrichtListeEintrag: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  
  
  export default withStyles(styles)(NachrichtenListeEintrag);