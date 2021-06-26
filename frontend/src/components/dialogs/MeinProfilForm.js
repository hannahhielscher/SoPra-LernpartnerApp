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
 * Dieses Form zeigt ein Dialog zum erstellen/updaten von ProjektBO's. Falls ein Projekt bereits besteht wird das Formular als edit konfiguriert.
 * Falls das Projekt Objekt null ist wird das Formular zum erstellen eines PojektBO's konfiguriert.
 * Dafuer wird auf die API zugegriffen (Backend zugriff)
 *
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 */

class MeinProfilForm extends Component {

    constructor(props) {
        super(props);

        //initiiere den state
        this.state = {
            name: null,
            nameValidationFailed: false,
            nameEdited: false,

            vorname: null,
            vornameValidationFailed: false,
            vornameEdited: false,

            semester: null,
            semesterValidationFailed: false,
            semesterEdited: false,

            studiengang: null,
            studiengangValidationFailed: false,
            studiengangEdited: false,

            lerngruppe: null,
            lerngruppeValidationFailed: false,
            lerngruppeEdited: false,

            alter: null,
            alterValidationFailed: false,
            alterEdited: false,

            geschlecht: null,
            geschlechtValidationFailed: false,
            geschlechtEdited: false,

            tageszeiten: null,
            tageszeitenValidationFailed: false,
            tageszeitenEdited: false,

            tage: null,
            tageValidationFailed: false,
            tageEdited: false,

            frequenz: null,
            frequenzValidationFailed: false,
            frequenzEdited: false,

            lernart: null,
            lernartValidationFailed: false,
            lernartEdited: false,

            gruppengroesse: null,
            gruppengroesseValidationFailed: false,
            gruppengroesseEdited: false,

            lernort: null,
            lernortValidationFailed: false,
            lernortEdited: false,

            lernfaecher: null,
            lernfaecherValidationFailed: false,
            lernfaecherEdited: false,

            updatingError: null,
            updatingInProgress: false,

            profil: this.props.currentProfil,
            gruppe: 0,

        };
        // State speichern falls cancel
        this.baseState = this.state;
        this.handleChangeStudiengang = this.handleChangeStudiengang.bind(this);
        this.handleChangeLerngruppe = this.handleChangeLerngruppe.bind(this);
        this.handleChangeTageszeiten = this.handleChangeTageszeiten.bind(this);
        this.handleChangeTage = this.handleChangeTage.bind(this);
        this.handleChangeFrequenz = this.handleChangeFrequenz.bind(this);
        this.handleChangeLernart = this.handleChangeLernart.bind(this);
        this.handleChangeGruppengroesse = this.handleChangeGruppengroesse.bind(this);
        this.handleChangeLernort = this.handleChangeLernort.bind(this);
        this.handleChangeLernfaecher = this.handleChangeLernfaecher.bind(this);

    }



    /** Updates the person */
    updatenPerson = () => {
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

  /** Updates the person */
  updatenProfil = () => {
    let profil = this.state.profil;
    LernpartnerAPI.getAPI().updateProfil(profil.id, this.state.gruppe, this.state.lernfaecher, profil.lernvorlieben_id
    ).then(profil => {
        // Backend call sucessfull
        // reinit the dialogs state for a new empty customer
        this.setState(this.baseState);
        this.props.onClose(profil); // call the parent with the customer object from backend
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

  /** Updates the person */
    updatenLernvorlieben = () => {
        let lernvorlieben = this.props.lernvorlieben;
        lernvorlieben.tageszeiten = this.state.tageszeiten
        lernvorlieben.tage = this.state.tage
        lernvorlieben.frequenz = this.state.frequenz
        lernvorlieben.lernart = this.state.lernart
        lernvorlieben.gruppengroesse = this.state.gruppengroesse
        lernvorlieben.lernort = this.state.lernort

        LernpartnerAPI.getAPI().updateLernvorlieben(lernvorlieben.id, this.state.tageszeiten, this.state.tage, this.state.frequenz, this.state.lernart, this.state.gruppengroesse, this.state.lernort)
        .then(lernvorlieben => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
            this.setState(this.baseState);
            this.props.onClose(lernvorlieben); // call the parent with the customer object from backend
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
        this.props.onClose();
    }

    handleChangeStudiengang(event) {
      this.setState({studiengang: event.target.value});
    }

    handleChangeLerngruppe(event) {
      this.setState({lerngruppe: event.target.value});
    }

    handleChangeTageszeiten(event) {
      this.setState({tageszeiten: event.target.value});
    }

    handleChangeTage(event) {
      this.setState({tage: event.target.value});
    }

    handleChangeFrequenz(event) {
      this.setState({frequenz: event.target.value});
    }

    handleChangeLernart(event) {
      this.setState({lernart: event.target.value});
    }

    handleChangeGruppengroesse(event) {
      this.setState({gruppengroesse: event.target.value});
    }

    handleChangeLernort(event) {
      this.setState({lernort: event.target.value});
    }

    handleChangeLernfaecher(event) {
      this.setState({lernfaecher: event.target.value});
    }



	/** Renders the sign in page, if user objext is null */
	/** Renders the component */
    render() {
        const { classes, show, currentPerson, lernvorlieben} = this.props;
        const { profil, name, nameValidationFailed, vorname, vornameValidationFailed, semester, semesterValidationFailed, studiengang, studiengangValidationFailed,
          alter, alterValidationFailed, geschlecht, geschlechtValidationFailed, lerngruppe, lerngruppeValidationFailed, tageszeiten,
          tageszeitenValidationFailed, tage, tageValidationFailed, frequenz, frequenzValidationFailed, lernart, lernartValidationFailed, gruppengroesse, gruppengroesseValidationFailed,
          lernort, lernortValidationFailed, lernfaecher, lernfaecherValidationFailed, addingInProgress, updatingInProgress, updatingError} = this.state;


        let title = 'Profil bearbeiten';
        let header = 'Bitte gib deine neuen Daten ein:';

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

                  <FormControl className={classes.formControl}>
                            <InputLabel>Studiengang</InputLabel>
                             <Select required error={studiengangValidationFailed} value={studiengang} onChange={this.handleChangeStudiengang}>
                                <MenuItem value='WI'>Wirtschaftsinformatik</MenuItem>
                                <MenuItem value='MW'>Medienwirtschaft</MenuItem>
                            </Select>
                   </FormControl>

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='alter' label='Alter:' value={alter}
                    onChange={this.numberValueChange} error={alterValidationFailed}
                    helperText={alterValidationFailed ? 'The age must contain at least one character' : ' '} />

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='geschlecht' label='Geschlecht:' value={geschlecht}
                    onChange={this.textFieldValueChange} error={geschlechtValidationFailed}
                    helperText={geschlechtValidationFailed ? 'The gender must contain at least one character' : ' '} />

                  <FormControl className={classes.formControl}>
                            <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                             <Select required error={lerngruppeValidationFailed} value={lerngruppe} onChange={this.handleChangeLerngruppe}>
                                <MenuItem value='1'>Ja!</MenuItem>
                                <MenuItem value='0'>Nein!</MenuItem>
                            </Select>
                   </FormControl>
                  <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel >Welche Tageszeit präferierst du? </InputLabel>
                             <Select required error={tageszeitenValidationFailed} value={tageszeiten}
                             onChange={this.handleChangeTageszeiten}>
                                <MenuItem value='1'>Morgens</MenuItem>
                                <MenuItem value='2'>Mittags</MenuItem>
                                <MenuItem value='3'>Abends</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Tage präferierst du?</InputLabel>
                             <Select required error={tageValidationFailed} value={tage} onChange={this.handleChangeTage}>
                                <MenuItem value='1'>Unter der Woche</MenuItem>
                                <MenuItem value='2'>Am Wochenende</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Frequenz präferierst du?</InputLabel>
                             <Select required error={frequenzValidationFailed} value={frequenz} onChange={this.handleChangeFrequenz}>
                                <MenuItem value='1'>Wöchentlich</MenuItem>
                                <MenuItem value='2'>Mehrmals die Woche</MenuItem>
                                <MenuItem value='3'>Alle zwei Wochen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/> 
                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Lernart präferierst du?</InputLabel>
                             <Select required error={lernartValidationFailed} value={lernart} onChange={this.handleChangeLernart}>
                                <MenuItem value='1'>Visuell</MenuItem>
                                <MenuItem value='2'>Auditiv</MenuItem>
                                <MenuItem value='3'>Motorisch</MenuItem>
                                <MenuItem value='4'>Kommunikativ</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Gruppengroesse präferierst du?</InputLabel>
                             <Select required error={gruppengroesseValidationFailed} value={gruppengroesse} onChange={this.handleChangeGruppengroesse}>
                                <MenuItem value='1'>Bis zu 3 Personen</MenuItem>
                                <MenuItem value='2'>3-5 Personen</MenuItem>
                                <MenuItem value='3'>Über 5 Personen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel>Welchen Lernort präferierst du?</InputLabel>
                             <Select required error={lernortValidationFailed} value={lernort} onChange={this.handleChangeLernort}>
                                <MenuItem value='1'>Remote</MenuItem>
                                <MenuItem value='2'>Hochschule</MenuItem>
                                <MenuItem value='3'>Bibliothek</MenuItem>
                                <MenuItem value='4'>Cafe</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl className={classes.formControl}>
                            <InputLabel>Was willst du lernen?</InputLabel>
                             <Select required error={lernfaecherValidationFailed} value={lernfaecher} onChange={this.handleChangeLernfaecher}>
                                <MenuItem value='1'>Software Entwicklung</MenuItem>
                                <MenuItem value='2'>Data Science</MenuItem>
                                <MenuItem value='3'>Führungsorientiertes Rechnungswesen</MenuItem>
                                <MenuItem value='4'>Medienrecht</MenuItem>
                                <MenuItem value='5'>Crossmedia-Konzeption</MenuItem>
                                <MenuItem value='6'>Web-Technologie</MenuItem>
                                <MenuItem value='7'>Datenbanken</MenuItem>
                                <MenuItem value='8'>IT-Security</MenuItem>
                            </Select>
                   </FormControl>



                </form>
                <LoadingProgress show={addingInProgress || updatingInProgress} />
                {

                  <ContextErrorMessage error={updatingError}
                      contextErrorMsg={`Dein Profil konnte nicht bearbeitet werden :/`}
                      onReload={this.updatenPerson} />

                }
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                </Button>
                {
                    <Button disabled={nameValidationFailed || vornameValidationFailed || semesterValidationFailed || studiengangValidationFailed || alterValidationFailed || geschlechtValidationFailed || lerngruppeValidationFailed } variant='contained'
                          onClick={ () => {this.updatenPerson(); this.updatenLernvorlieben();}} color='primary'>
                          Änderungen abschließen
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
MeinProfilForm.propTypes = {
	/** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
	/**
	 * Handler function, which is called if the user wants to sign in.
	 */

	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(MeinProfilForm);