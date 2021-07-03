import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from '@material-ui/core';

import { LernpartnerAPI } from '../../api';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class RegistrierungForm extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,

            vorname: null,
            vornameValidationFailed: false,
            vornameEdited: false,

            alter: null,
            alterValidationFailed: false,
            alterEdited: false,

            geschlecht: null,
            geschlechtValidationFailed: false,
            geschlechtEdited: false,

            semester: null,
            semesterValidationFailed: false,
            semesterEdited: false,

            studiengang: null,
            studiengangValidationFailed: false,
            studiengangEdited: false,

            lerngruppe: null,
            lerngruppeValidationFailed: false,
            lerngruppeEdited: false,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false,
            
            
        };
        // save this state for canceling
        this.baseState = this.state;
        this.handleChangeStudiengang = this.handleChangeStudiengang.bind(this);
        this.handleChangeLerngruppe = this.handleChangeLerngruppe.bind(this);
        this.handleChangeGeschlecht = this.handleChangeGeschlecht.bind(this);
        }
    

    /** Updates the person */
    registrieren = () => {
        let person = this.props.currentPerson;
        person.name = this.state.name
        person.vorname = this.state.vorname
        person.semester = this.state.semester
        person.studiengang = this.state.studiengang
        person.alter = this.state.alter
        person.geschlecht = this.state.geschlecht
        person.lerngruppe = this.state.lerngruppe
        LernpartnerAPI.getAPI().updatePerson(person.id, this.state.name, this.state.vorname, this.state.semester, this.state.studiengang, this.state.alter, this.state.geschlecht,
          this.state.lerngruppe).then(person => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
            this.setState(this.baseState);
            this.props.onClose(person); // call the parent with the customer object from backend
        }).catch(e =>
            this.setState({
                updatingInProgress: false,    // disable loading indicator 
                updatingError: e              // show error message
            })
        );

        // set loading to true
        this.setState({
            updatingInProgress: true,       // show loading indicator
            updatingError: null             // disable error message
      });
    }
	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}
    */
   /** Handles value changes of the forms textfields and validates them */
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
        error = true;
        }

        this.setState({
        [event.target.id]: event.target.value,
        [event.target.id + 'ValidationFailed']: error,
        [event.target.id + 'Edited']: true
        });
    }

    //Setzen der Werte aus der Validierung
    setStateValueChange(event, error) {
      this.setState({
          [event.target.id]: event.target.value,
          [event.target.id + 'ValidationFailed']: error,
          [event.target.id + 'Edited']: true
      });
  }

    // Validierung der Textfeldaenderungen nur numerische Werte
    numberValueChange = (event) => {
        const value = event.target.value;
        const re = /^[0-9]{1,10}$/;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }
        if (re.test(event.target.value) === false) {
            error = true;
        }
        this.setStateValueChange(event, error);
    }

    //Setzen des Status, bei schließen des Dialogs
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    handleChangeStudiengang(event) {
      this.setState({studiengang: event.target.value});
    }

    handleChangeLerngruppe(event) {
      this.setState({lerngruppe: event.target.value});
    }

    handleChangeGeschlecht(event) {
      this.setState({geschlecht: event.target.value});
    }

  
	/** Renders the sign in page, if user objext is null */
	/** Renders the component */
    render() {
        const { classes, show, currentPerson, } = this.props;
        const { name, nameValidationFailed, vorname, vornameValidationFailed, semester, semesterValidationFailed, studiengang, studiengangValidationFailed,
          alter, alterValidationFailed, geschlecht, geschlechtValidationFailed, lerngruppe, lerngruppeValidationFailed, addingInProgress,
          updatingInProgress, updatingError} = this.state;
    
        let title = 'Registriere dich zuerst, bevor du die App nutzen kannst!';
        let header = 'Bitte gib deine Daten ein:';
    
        return (
            show ?
            <Dialog open={show}>
              <DialogTitle id='form-dialog-title'>{title}
                  <IconButton className={classes.closeButton} onClick={this.handleClose}>
                      <CloseIcon />
                  </IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {header}
                </DialogContentText>
                <form className={classes.root} noValidate autoComplete='off'>

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='name' label='Nachname:' value={name}
                    onChange={this.textFieldValueChange} error={nameValidationFailed}
                    helperText={nameValidationFailed ? 'The last name must contain at least one character' : ' '} />

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='vorname' label='Vorname:' value={vorname} 
                    onChange={this.textFieldValueChange} error={vornameValidationFailed} 
                    helperText={vornameValidationFailed ? 'The first name must contain at least one character' : ' '} />
                  
                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} 
                    onChange={this.numberValueChange} error={semesterValidationFailed} 
                    helperText={geschlechtValidationFailed ? 'The semester must contain at least one character' : ' '} /> 
                    
                  <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Studiengang</InputLabel>
                             <Select  error={studiengangValidationFailed} value={studiengang} onChange={this.handleChangeStudiengang}>
                                <MenuItem value='Audiovisuelle Medien'>Audiovisuelle Medien</MenuItem>
                                <MenuItem value='Crossmedia-Redaktion/Public Relations'>Crossmedia-Redaktion/Public Relations</MenuItem>
                                <MenuItem value='Deutsch-chinesischer Studiengang Medien und Technologie'>Deutsch-chinesischer Studiengang Medien und Technologie</MenuItem>
                                <MenuItem value='Informationsdesign'>Informationsdesign</MenuItem>
                                <MenuItem value='Infomationswissenschaften'>Infomationswissenschaften</MenuItem>
                                <MenuItem value='Integriertes Produktdesign'>Integriertes Produktdesign</MenuItem>
                                <MenuItem value='Mediapublishing'>Mediapublishing</MenuItem>
                                <MenuItem value='Medieninformatik'>Medieninformatik</MenuItem>
                                <MenuItem value='Medienwirtschaft'>Medienwirtschaft</MenuItem>
                                <MenuItem value='Mobile Medien'>Mobile Medien</MenuItem>
                                <MenuItem value='Online-Medien-Management'>Online-Medien-Management</MenuItem>
                                <MenuItem value='Print Media Technologies'>Print Media Technologies</MenuItem>
                                <MenuItem value='Verpackungstechnik'>Verpackungstechnik</MenuItem>
                                <MenuItem value='Werbung & Marktkommunikation'>Werbung & Marktkommunikation</MenuItem>
                                <MenuItem value='Wirtschaftsinformatik und digitale Medien'>Wirtschaftsinformatik und digitale Medien</MenuItem>
                                <MenuItem value='Wirtschaftsingenieurwesen Medien'>Wirtschaftsingenieurwesen Medien</MenuItem>
                            </Select>
                   </FormControl>
                   
                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='alter' label='Alter:' value={alter} 
                    onChange={this.numberValueChange} error={alterValidationFailed} 
                    helperText={alterValidationFailed ? 'The age must contain at least one character' : ' '} />
  
                  <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Geschlecht:</InputLabel>
                             <Select  error={geschlechtValidationFailed} value={geschlecht} onChange={this.handleChangeGeschlecht}>
                                <MenuItem value='weiblich'>Weiblich</MenuItem>
                                <MenuItem value='männlich'>Männlich</MenuItem>
                                <MenuItem value='divers'>Divers</MenuItem>
                            </Select>
                   </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                            <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                             <Select required error={lerngruppeValidationFailed} value={lerngruppe} onChange={this.handleChangeLerngruppe}>
                                <MenuItem value='1'>Ja!</MenuItem>
                                <MenuItem value='0'>Nein!</MenuItem>
                            </Select>
                   </FormControl>

                </form>
                <LoadingProgress show={addingInProgress || updatingInProgress} />
                {

                  <ContextErrorMessage error={updatingError}
                      contextErrorMsg={`Du konntest leider nicht registriert werden :/`}
                      onReload={this.registrieren} />

                }
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                </Button>
                {
                    <Button disabled={nameValidationFailed || vornameValidationFailed || semesterValidationFailed || studiengangValidationFailed || alterValidationFailed || geschlechtValidationFailed || lerngruppeValidationFailed } variant='contained'
                          onClick={this.registrieren} color='primary'>
                          Jetzt registrieren
                    </Button>
                }
              </DialogActions>
            </Dialog>
            : null
        );
      }
    
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

/** PropTypes */
RegistrierungForm.propTypes = {
	/** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
  
	onSignIn: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(RegistrierungForm));