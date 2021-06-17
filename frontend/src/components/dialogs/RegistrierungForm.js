import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
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

            firstName: null,
            firstNameValidationFailed: false,
            firstNameEdited: false,

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
        }
    

    /** Adds the customer */
    registrieren = () => {
        let person = this.props.person;
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

    //Setzen des Status, bei schließen des Dialogs
    handleClose = () => {
      this.setState(this.baseState);
      this.props.onClose(null);
  }

  handleChange(change, event) {
    var toChange = this.state.form;
    toChange[change] = event.target.value;
    this.setState({form: toChange});
  }

	/** Renders the sign in page, if user objext is null */
	/** Renders the component */
    render() {
        const { classes, show, person } = this.props;
        const { name, nameValidationFailed, firstName, firstNameValidationFailed, semester, semesterValidationFailed, studiengang, studiengangValidationFailed,
          alter, alterValidationFailed, geschlecht, geschlechtValidationFailed, lerngruppe, lerngruppeValidationFailed, addingInProgress,
          updatingInProgress, updatingError} = this.state;
    
        let title = 'Registriere dich jetzt!';
        let header = 'Bitte gib deine Daten ein:';
    
        return (
            <Dialog>
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

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='firstName' label='Vorname:' value={firstName} 
                    onChange={this.textFieldValueChange} error={firstNameValidationFailed} 
                    helperText={firstNameValidationFailed ? 'The first name must contain at least one character' : ' '} />
                  
                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} 
                    onChange={this.textFieldValueChange} error={semesterValidationFailed} 
                    helperText={geschlechtValidationFailed ? 'The semester must contain at least one character' : ' '} /> 
                    
                  <FormControl className={classes.formControl} value = {studiengang}>
                            <InputLabel>Studiengang</InputLabel>
                             <Select required onChange={this.handleChange} error={studiengangValidationFailed}>
                                <MenuItem value='WI'>Wirtschaftsinformatik</MenuItem>
                                <MenuItem value='MW'>Medienwirtschaft</MenuItem>
                            </Select>
                   </FormControl>
                   
                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='alter' label='Alter:' value={alter} 
                    onChange={this.textFieldValueChange} error={alterValidationFailed} 
                    helperText={alterValidationFailed ? 'The age must contain at least one character' : ' '} />

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='geschlecht' label='Geschlecht:' value={geschlecht} 
                    onChange={this.textFieldValueChange} error={geschlechtValidationFailed} 
                    helperText={geschlechtValidationFailed ? 'The gender must contain at least one character' : ' '} /> 
                  
                  <FormControl className={classes.formControl} value = {lerngruppe}>
                            <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                             <Select required onChange={this.handleChange} error={lerngruppeValidationFailed}>
                                <MenuItem value='1'>Ja!</MenuItem>
                                <MenuItem value='0'>Nein!</MenuItem>
                            </Select>
                   </FormControl>

                </form>
                <LoadingProgress show={addingInProgress || updatingInProgress} />
                {

                  <ContextErrorMessage error={updatingError}
                      contextErrorMsg={`DU konntest leider nicht registriert werden :/`}
                      onReload={this.registrieren} />

                }
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                </Button>
                {
                    <Button disabled={nameValidationFailed || mat_nrValidationFailed} variant='contained'
                          onClick={this.registrieren} color='primary'>
                          Jetzt registrieren
                    </Button>
                }
              </DialogActions>
            </Dialog>
        
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
  onClose: PropTypes.func.isRequired,
	onSignIn: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(RegistrierungForm));