import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from '@material-ui/core';

import { LernpartnerAPI, PersonBO } from '../../api';
import { withRouter } from 'react-router-dom';
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
    
        let fn = '', ln = '', alter = '', geschlecht = '', semester = '';
        // Init the state
        this.state = {
            Name: ln,
            NameValidationFailed: false,
            NameEdited: false,
            firstName: fn,
            firstNameValidationFailed: false,
            firstNameEdited: false,
            alter: alter,
            alterValidationFailed: false,
            alterEdited: false,
            geschlecht: geschlecht,
            geschlechtValidationFailed: false,
            geschlechtEdited: false,
            semester: semester,
            semesterValidationFailed: false,
            semesterEdited: false,
            studiengang: '',
            studiengangValidationFailed: false,
            studiengangEdited: false,
            lerngruppe: '',
            lerngruppeValidationFailed: false,
            lerngruppeEdited: false,
            addingInProgress: false,
            addingError: null,
            
        };
        // save this state for canceling
        this.baseState = this.state;
        }
    

    /** Adds the customer */
    addPerson = () => {
        let newPerson = new PersonBO(this.state.Name, this.state.firstName, this.state.alter, this.state.geschlecht);
        LernpartnerAPI.getAPI().addPerson(newPerson).then(person => {
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
	/** Renders the sign in page, if user objext is null */
	/** Renders the component */
    render() {
        const { classes, show } = this.props;
        const { Name, NameValidationFailed, NameEdited, firstName, firstNameValidationFailed, firstNameEdited, alter, alterValidationFailed, alterEdited, geschlecht, geschlechtValidationFailed, geschlechtEdited, semester, semesterValidationFailed, studiengang, lerngruppe, addingInProgress,
          addingError} = this.state;
    
        let title = 'Registriere dich jetzt!';
        let header = 'Bitte gib deine Daten ein:';
    
        return (
            <Dialog>
              <DialogTitle id='form-dialog-title'>{title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {header}
                </DialogContentText>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField type='text' required fullWidth margin='normal' id='Name' label='Nachname:' value={Name}
                    onChange={this.textFieldValueChange} error={NameValidationFailed}
                    helperText={NameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                  <TextField autoFocus type='text' required fullWidth margin='normal' id='firstName' label='Vorname:' value={firstName} 
                    onChange={this.textFieldValueChange} error={firstNameValidationFailed} 
                    helperText={firstNameValidationFailed ? 'The first name must contain at least one character' : ' '} />
                  <TextField autoFocus type='text' required fullWidth margin='normal' id='alter' label='Alter:' value={alter} 
                    onChange={this.textFieldValueChange} error={alterValidationFailed} 
                    helperText={alterValidationFailed ? 'The age must contain at least one character' : ' '} />
                  <TextField autoFocus type='text' required fullWidth margin='normal' id='geschlecht' label='Geschlecht:' value={geschlecht} 
                    onChange={this.textFieldValueChange} error={geschlechtValidationFailed} 
                    helperText={geschlechtValidationFailed ? 'The gender must contain at least one character' : ' '} /> 
                  <TextField autoFocus type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} 
                    onChange={this.textFieldValueChange} error={semesterValidationFailed} 
                    helperText={geschlechtValidationFailed ? 'The gender must contain at least one character' : ' '} /> 
                  <FormControl className={classes.formControl} value = {studiengang}>
                            <InputLabel>Studiengang</InputLabel>
                             <Select required onChange={this.handleChange}>
                                <MenuItem value='WI'>Wirtschaftsinformatik</MenuItem>
                                <MenuItem value='MW'>Medienwirtschaft</MenuItem>
                            </Select>
                   </FormControl>
                  <FormControl className={classes.formControl} value = {lerngruppe}>
                            <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                             <Select required onChange={this.handleChange}>
                                <MenuItem value='True'>Ja!</MenuItem>
                                <MenuItem value='False'>Nein!</MenuItem>
                            </Select>
                   </FormControl>
                </form>
                <LoadingProgress show={addingInProgress} />
                <ContextErrorMessage error={addingError} contextErrorMsg={`The customer could not be added.`} onReload={this.addPerson} />
              </DialogContent>
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
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(RegistrierungForm));