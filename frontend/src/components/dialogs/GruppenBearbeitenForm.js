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
import MultiSelectLernfaecher from './MultiSelectLernfaecher';
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

            lerngruppe: this.props.lerngruppe,
            lernvorlieben: this.props.lernvorlieben,
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

            lernfaecher: [],
            lernfaecherValidationFailed: false,
            lernfaecherEdited: false,

            gruppe: 1,

            updatingError: null,
            updatingInProgress: false,


        };
        // State speichern falls cancel
        this.baseState = this.state;
        this.handleChangeTageszeiten = this.handleChangeTageszeiten.bind(this);
        this.handleChangeTage = this.handleChangeTage.bind(this);
        this.handleChangeFrequenz = this.handleChangeFrequenz.bind(this);
        this.handleChangeLernart = this.handleChangeLernart.bind(this);
        this.handleChangeGruppengroesse = this.handleChangeGruppengroesse.bind(this);
        this.handleChangeLernort = this.handleChangeLernort.bind(this);
        this.onChangeLernfaecher = this.onChangeLernfaecher.bind(this);

    }



    // API Anbindung um die Lerngruppe des Students ihm Backend zu aktualisieren
    updatenGruppe = () => {
        let lerngruppe = this.props.lerngruppe;
        lerngruppe.id = this.state.lerngruppe.id
        lerngruppe.name = this.state.name
        lerngruppe.profil = this.state.lerngruppe.profil

        LernpartnerAPI.getAPI().updateLerngruppe(this.state.lerngruppe.id, this.state.name, this.state.lerngruppe.profil).then(lerngruppe => {
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
            this.setState(this.baseState);
            this.props.onClose(lerngruppe); // call the parent with the customer object from backend
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

    // API Anbindung um das Profil ihm Backend zu aktualisieren
    updatenProfil = () => {
      let profil = this.props.currentProfil;
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


    // API Anbindung um die Lernvorlieben der Lerngruppe ihm Backend zu aktualisieren
    updatenLernvorlieben = () => {
        let lernvorlieben = this.props.lernvorlieben;
        lernvorlieben.tageszeiten_id = this.state.tageszeiten
        lernvorlieben.tage_id = this.state.tage
        lernvorlieben.frequenz_id = this.state.frequenz
        lernvorlieben.lernart_id = this.state.lernart
        lernvorlieben.gruppengroesse_id = this.state.gruppengroesse
        lernvorlieben.lernort_id = this.state.lernort

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

    //Setzen des Status, bei schlie??en des Dialogs
      handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
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

    onChangeLernfaecher(newLernfaecher) {
      console.log(newLernfaecher)
      this.setState({
        lernfaecher: newLernfaecher
      
    })
  }



	/** Renders the sign in page, if user objext is null */
	/** Renders the component */
    render() {
        const { classes, show, currentProfil, currentPerson, lerngruppe, lernvorlieben } = this.props;
        console.log(currentProfil)
        const { name, nameValidationFailed, tageszeiten, tageszeitenValidationFailed, tage, tageValidationFailed, frequenz, frequenzValidationFailed, lernart, lernartValidationFailed, gruppengroesse, gruppengroesseValidationFailed,
          lernort, lernortValidationFailed, lernfaecher, lernfaecherValidationFailed, addingInProgress, updatingInProgress, updatingError} = this.state;


        let title = 'Gruppenprofil bearbeiten';
        let header = 'Bitte gib die neuen Daten ein:';

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

                  <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='normal' id='name' label='Gruppenname:' value={name}
                    onChange={this.textFieldValueChange} error={nameValidationFailed}
                    helperText={nameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                  <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Tageszeit pr??ferierst du?</InputLabel>
                             <Select required error={tageszeitenValidationFailed} value={tageszeiten} onChange={this.handleChangeTageszeiten}>
                                <MenuItem value='1'>Morgens</MenuItem>
                                <MenuItem value='2'>Mittags</MenuItem>
                                <MenuItem value='3'>Abends</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Tage pr??ferierst du?</InputLabel>
                             <Select required error={tageValidationFailed} value={tage} onChange={this.handleChangeTage}>
                                <MenuItem value='1'>Unter der Woche</MenuItem>
                                <MenuItem value='2'>Am Wochenende</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Frequenz pr??ferierst du?</InputLabel>
                             <Select required error={frequenzValidationFailed} value={frequenz} onChange={this.handleChangeFrequenz}>
                                <MenuItem value='1'>W??chentlich</MenuItem>
                                <MenuItem value='2'>Mehrmals die Woche</MenuItem>
                                <MenuItem value='3'>Alle zwei Wochen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Lernart pr??ferierst du?</InputLabel>
                             <Select required error={lernartValidationFailed} value={lernart} onChange={this.handleChangeLernart}>
                                <MenuItem value='1'>Visuell</MenuItem>
                                <MenuItem value='2'>Auditiv</MenuItem>
                                <MenuItem value='3'>Motorisch</MenuItem>
                                <MenuItem value='4'>Kommunikativ</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Gruppengroesse pr??ferierst du?</InputLabel>
                             <Select required error={gruppengroesseValidationFailed} value={gruppengroesse} onChange={this.handleChangeGruppengroesse}>
                                <MenuItem value='1'>Bis zu 3 Personen</MenuItem>
                                <MenuItem value='2'>3-5 Personen</MenuItem>
                                <MenuItem value='3'>??ber 5 Personen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welchen Lernort pr??ferierst du?</InputLabel>
                             <Select required error={lernortValidationFailed} value={lernort} onChange={this.handleChangeLernort}>
                                <MenuItem value='1'>Remote</MenuItem>
                                <MenuItem value='2'>Hochschule</MenuItem>
                                <MenuItem value='3'>Bibliothek</MenuItem>
                                <MenuItem value='4'>Cafe</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>

                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                        <MultiSelectLernfaecher onChangeLernfaecher = {this.onChangeLernfaecher}/>
                    
                    </FormControl>
                   <br/>



                </form>
                <LoadingProgress show={addingInProgress || updatingInProgress} />
                {

                  <ContextErrorMessage error={updatingError}
                      contextErrorMsg={`Dein Profil konnte nicht bearbeitet werden :/`}
                      onReload={this.updatenGruppe} />

                }
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                </Button>
                {
                    <Button disabled={nameValidationFailed || tageszeitenValidationFailed || tageValidationFailed || frequenzValidationFailed || lernartValidationFailed || gruppengroesseValidationFailed || lernortValidationFailed || lernfaecherValidationFailed } variant='contained'
                          onClick={ () => {this.updatenGruppe(); this.updatenProfil(); this.updatenLernvorlieben();}} color='primary'>
                          ??nderungen abschlie??en
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
	},
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
});

/** PropTypes */
GruppenBearbeitenForm.propTypes = {
	/** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
	/**
	 * Handler function, which is called if the user wants to sign in.
	 */

	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(GruppenBearbeitenForm);