import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
import { withStyles, Grid, Typography,  } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
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
            nachrichten: [], //Liste mit den IDs aller Nachrichten 
            //konversation_ID: null,  
            nachricht_inhalt: null, 
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


      // API Anbindung um Nachricht vom Backend zu bekommen 
    getNachrichten = () => {
        LernpartnerAPI.getAPI().getNachrichten(this.props.nachrichten)
        .then(nachrichtBO =>
            this.setState({
              nachrichten: nachrichtBO,
              nachricht_inhalt: nachrichtBO.nachricht_inhalt,
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              this.getNachrichten()
            })
            .catch(e =>
                this.setState({
                  nachrichten: null,
                  inhalt: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

      // API Anbindung um Person vom Backend zu bekommen 
    getPerson = () => {
      LernpartnerAPI.getAPI().getPerson(this.props.nachricht.getmain_person_id())
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
        this.getNachrichten();
    }

      render() {
        const { classes, currentperson } = this.props;
        const {nachrichten, nachricht_inhalt, personName, personVorname, expandedNachrichtID} = this.state;

        return(
          <div>
            <Grid container spacing={3} justify="flex-end" alignItems="felx-end">
            <Grid item xs={6} sm={3}>
             <Typography variant="body1" className={classes.heading}>
               {Person.getPersonVorname() + ""+ Person.getPersonName()}
               <br/>
               {Nachricht.getNachricht_Inhalt()}
               <br/>
             </Typography>
            </Grid>
            </Grid>
                  {
                      nachrichten ?
                      <>
                      {
                          nachrichten.map(nachricht =>
                            <NachrichtenListeEintrag key={nachricht.getID()} currentperson={currentperson} nachricht={nachrichten} personName={personVorname + " " +personName} inhalt={nachricht_inhalt} expandedState={expandedNachrichtID === nachricht.getID()}
                              onExpandedStateChange={this.onExpandedStateChange}
                            />)
                      }
                      </>
                      :
                      <></>
                  }
        
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
  NachrichtenListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    NachrichtListeEintrag: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  
  
  export default withStyles(styles)(NachrichtenListeEintrag);