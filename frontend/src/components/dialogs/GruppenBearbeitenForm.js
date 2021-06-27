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

class GruppenBearbeitenForm extends Component {

    constructor(props) {
        super(props);

        //initiiere den state
        this.state = {
            name: null,
            nameValidationFailed: false,
            nameEdited: false,


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


        };
        // State speichern falls cancel
        this.baseState = this.state;
        this.handleChangeTageszeiten = this.handleChangeTageszeiten.bind(this);
        this.handleChangeTage = this.handleChangeTage.bind(this);
        this.handleChangeFrequenz = this.handleChangeFrequenz.bind(this);
        this.handleChangeLernart = this.handleChangeLernart.bind(this);
        this.handleChangeGruppengroesse = this.handleChangeGruppengroesse.bind(this);
        this.handleChangeLernort = this.handleChangeLernort.bind(this);
        this.handleChangeLernfaecher = this.handleChangeLernfaecher.bind(this);

    }



    /** Updates the person */
    updatenGruppe = () => {
        let gruppe = this.props.user;
        gruppe.name = this.state.name
        LernpartnerAPI.getAPI().updatePerson(gruppe.id, this.state.name, ).then(gruppe => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
            this.setState(this.baseState);
            this.props.onClose(gruppe); // call the parent with the customer object from backend
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
        const { classes, show, currentPerson, lernvorlieben } = this.props;
        const { name, nameValidationFailed, tageszeiten, tageszeitenValidationFailed, tage, tageValidationFailed, frequenz, frequenzValidationFailed, lernart, lernartValidationFailed, gruppengroesse, gruppengroesseValidationFailed,
          lernort, lernortValidationFailed, lernfaecher, lernfaecherValidationFailed, addingInProgress, updatingInProgress, updatingError} = this.state;


        let title = 'Registriere dich zuerst, bevor du die App nutzen kannst!';
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

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Tageszeit präferierst du?</InputLabel>
                             <Select required error={tageszeitenValidationFailed} value={tageszeiten} onChange={this.handleChangeTageszeiten}>
                                <MenuItem value='1'>Morgens</MenuItem>
                                <MenuItem value='2'>Mittags</MenuItem>
                                <MenuItem value='3'>Abends</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Tage präferierst du?</InputLabel>
                             <Select required error={tageValidationFailed} value={tage} onChange={this.handleChangeTage}>
                                <MenuItem value='1'>Unter der Woche</MenuItem>
                                <MenuItem value='2'>Am Wochenende</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Frequenz präferierst du?</InputLabel>
                             <Select required error={frequenzValidationFailed} value={frequenz} onChange={this.handleChangeFrequenz}>
                                <MenuItem value='1'>Wöchentlich</MenuItem>
                                <MenuItem value='2'>Mehrmals die Woche</MenuItem>
                                <MenuItem value='3'>Alle zwei Wochen</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Lernart präferierst du?</InputLabel>
                             <Select required error={lernartValidationFailed} value={lernart} onChange={this.handleChangeLernart}>
                                <MenuItem value='1'>Visuell</MenuItem>
                                <MenuItem value='2'>Auditiv</MenuItem>
                                <MenuItem value='3'>Motorisch</MenuItem>
                                <MenuItem value='4'>Kommunikativ</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Gruppengroesse präferierst du?</InputLabel>
                             <Select required error={gruppengroesseValidationFailed} value={gruppengroesse} onChange={this.handleChangeGruppengroesse}>
                                <MenuItem value='1'>Bis zu 3 Personen</MenuItem>
                                <MenuItem value='2'>3-5 Personen</MenuItem>
                                <MenuItem value='3'>Über 5 Personen</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welchen Lernort präferierst du?</InputLabel>
                             <Select required error={lernortValidationFailed} value={lernort} onChange={this.handleChangeLernort}>
                                <MenuItem value='1'>Remote</MenuItem>
                                <MenuItem value='2'>Hochschule</MenuItem>
                                <MenuItem value='3'>Bibliothek</MenuItem>
                                <MenuItem value='4'>Cafe</MenuItem>
                            </Select>
                   </FormControl>

                   <FormControl className={classes.formControl}>
                            <InputLabel>Welche Lernfaecher präferierst du?</InputLabel>
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
                          onClick={this.updatenGruppe} color='primary'>
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

export default withStyles(styles)(GruppenBearbeitenForm);