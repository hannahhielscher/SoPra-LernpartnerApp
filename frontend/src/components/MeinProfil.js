import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {LernpartnerAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

class MeinProfil extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            profil: null,
            gruppe: false,
            personVorname: null,
            personName: null,
            personSemester: 0,
            personStudiengang: null,
            lerngruppe: false,
            personProfilID: null,
            personLernfaecher: null,
            personLernvorliebenID: null,
            loadingInProgress: false,
            loadingError: null,

            showRegistrierungForm: false
        };
    }


/**   showVorschlagButtonClick = (event) => {
      event.stopPropagation();
      this.setState({
        showVorschlag: true
      });
    }**/


    // API Anbindung um Profil vom Backend zu bekommen
    


  checkPersonName = (personName) => {
		if (personName = 'Null') {
			this.setState({
				personneu: true
			})
			.catch(e =>
				this.setState({
          personneu: false,
          error: e
				}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
			}
		}

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  




   /** Renders the component */
    render() {
      const { classes, currentPerson } = this.props;
      // Use the states customer
      const { personProfil, personName, personVorname, personSemester, personStudiengang, personLernfaecher, personLernvorlieben, loadingInProgress, error} = this.state;

      // console.log(this.props);
      return (
        <div className={classes.root}>
        
        <Button color="primary" onClick= {this.showVorschlagButtonClick}>Mein Profil bearbeiten</Button>
        <Typography variant='body1' color={'textSecondary'}>

                              <b>Semester: </b> {} <br />
                              <b>Studiengang: </b>{}<br />
                              <b>Lernfächer: </b>{personLernfaecher}<br />
                              <b>Lernvorlieben: </b>{personLernvorlieben}<br />

        </Typography>
        </div>
      );
    }
}

  const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
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
MeinProfil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  currentPerson: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withRouter(withStyles(styles)(MeinProfil));

