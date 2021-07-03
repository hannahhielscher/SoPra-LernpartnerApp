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

            gruppe: 0,
            profil: null,
            personLernvorliebenID: null,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false,
            
            
        };
        // save this state for canceling
        this.baseState = this.state;

        //Binding der handleChange Methoden an die Komponente
        this.handleChangeStudiengang = this.handleChangeStudiengang.bind(this);
        this.handleChangeLerngruppe = this.handleChangeLerngruppe.bind(this);
        this.handleChangeGeschlecht = this.handleChangeGeschlecht.bind(this);
        this.handleChangeTageszeiten = this.handleChangeTageszeiten.bind(this);
        this.handleChangeTage = this.handleChangeTage.bind(this);
        this.handleChangeFrequenz = this.handleChangeFrequenz.bind(this);
        this.handleChangeLernart = this.handleChangeLernart.bind(this);
        this.handleChangeGruppengroesse = this.handleChangeGruppengroesse.bind(this);
        this.handleChangeLernort = this.handleChangeLernort.bind(this);
        this.onChangeLernfaecher = this.onChangeLernfaecher.bind(this);
        }
    

    /** Updaten der Person. Über Security Decorator wurde bereits ein Person, Profil und
     * Lernvorlieben Objekt erstellt, weswegen die "Registrierung" hier ein Update ist
     */
    updatenPerson = () => {
        let person = this.props.currentPerson;
        LernpartnerAPI.getAPI().updatePerson(person.id, this.state.name, this.state.vorname, this.state.semester, this.state.studiengang, this.state.alter, this.state.geschlecht,
          this.state.lerngruppe).then(person => {
            // Backend call erfolgreich
            // Initialisiert State neu
            this.setState(this.baseState);
            this.props.onClose(person); // Ruft parent Komponente auf mit neuem Person-Objekt aus Backend
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

    // API Anbindung um das Profil der Person vom Backend zu bekommen, um dieses dann zu updaten
   getProfil = () => {
		LernpartnerAPI.getAPI().getProfil(this.props.currentPerson.getprofil())
			.then(profilBO =>
				this.setState({
            profil: profilBO,
            personLernvorliebenID: profilBO.lernvorlieben_id,
            error: null,
            loadingInProgress: false,
          })).catch(e =>
            this.setState({
              profil: null,
              personLernvorliebenID: null,
              error: e,
              loadingInProgress: false,
            }));
      // set loading to true
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
    }

  /** Updaten des Profils mit den ausgewählten Daten */
  updatenProfil = () => {
    LernpartnerAPI.getAPI().updateProfil(this.state.profil.id, this.state.gruppe, this.state.lernfaecher, this.state.personLernvorliebenID
    ).then(profil => {
        // Backend call erfolgreich
        // Initialisiert State neu für nächste Registrierung
        this.setState(this.baseState);
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

  /** Updaten der zugehörigen Lervorlieben über ID aus Profil */
    updatenLernvorlieben = () => {
        LernpartnerAPI.getAPI().updateLernvorlieben(this.state.personLernvorliebenID, this.state.tageszeiten, this.state.tage, this.state.frequenz, this.state.lernart, this.state.gruppengroesse, this.state.lernort)
        .then(lernvorlieben => {
            // Backend call erfolgreich
            // Initialisiert State neu für nächste Registrierung
            this.setState(this.baseState);
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

    //Handle Change des Studiengang-Dropdowns
    handleChangeStudiengang(event) {
      this.setState({studiengang: event.target.value});
    }

    //Handle Change des Lerngruppen-Dropdowns
    handleChangeLerngruppe(event) {
      this.setState({lerngruppe: event.target.value});
    }

    //Handle Change des Geschlecht-Dropdowns
    handleChangeGeschlecht(event) {
      this.setState({geschlecht: event.target.value});
    }

    //Handle Change des Tageszeiten-Dropdowns
    handleChangeTageszeiten(event) {
      this.setState({tageszeiten: event.target.value});
    }

    //Handle Change des Tage-Dropdowns
    handleChangeTage(event) {
      this.setState({tage: event.target.value});
    }

    //Handle Change des Frequenz-Dropdowns
    handleChangeFrequenz(event) {
      this.setState({frequenz: event.target.value});
    }

    //Handle Change des Lernart-Dropdowns
    handleChangeLernart(event) {
      this.setState({lernart: event.target.value});
    }

    //Handle Change des Gruppengroesse-Dropdowns
    handleChangeGruppengroesse(event) {
      this.setState({gruppengroesse: event.target.value});
    }

    //Handle Change des Lernort-Dropdowns
    handleChangeLernort(event) {
      this.setState({lernort: event.target.value});
    }

    //Handle Change des Lernfaecher-Dropdowns
    onChangeLernfaecher(newLernfaecher) {
      console.log(newLernfaecher)
      this.setState({
        lernfaecher: newLernfaecher
      
    })
  }

  
	/** Rendert den Dialog, wenn CurrentPerson Vorname gleich null, sprich die Person neu im System ist */
	/** Renders the component */
    render() {
        const { classes, show, currentPerson, } = this.props;
        const { 
          profil, 
          personLernvorliebenID, 
          name, 
          nameValidationFailed, 
          vorname, 
          vornameValidationFailed, 
          semester, 
          semesterValidationFailed, 
          studiengang, 
          studiengangValidationFailed,
          alter, 
          alterValidationFailed, 
          geschlecht, 
          geschlechtValidationFailed, 
          lerngruppe, 
          lerngruppeValidationFailed, 
          tageszeiten,
          tageszeitenValidationFailed, 
          tage, 
          tageValidationFailed, 
          frequenz, 
          frequenzValidationFailed, 
          lernart, 
          lernartValidationFailed, 
          gruppengroesse, 
          gruppengroesseValidationFailed,
          lernort, 
          lernortValidationFailed,
          lernfach, 
          lernfaecherValidationFailed, 
          addingInProgress,
          updatingInProgress, 
          updatingError} = this.state;
    
        console.log(profil)
        console.log(personLernvorliebenID)
        let title = 'Registriere dich zuerst, bevor du die App nutzen kannst!';
        let header = 'Bitte gib deine Daten ein:';
    
        return (
            show ?
            <Dialog open={show} onEnter={this.getProfil}>
              <DialogTitle id='form-dialog-title'>{title}
                  
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

                  <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                             <Select required error={lerngruppeValidationFailed} value={lerngruppe} onChange={this.handleChangeLerngruppe}>
                                <MenuItem value='1'>Ja!</MenuItem>
                                <MenuItem value='0'>Nein!</MenuItem>
                            </Select>
                   </FormControl>
                  <br/><br/>
                  <b>Deine Lernvorlieben:</b><br/>
                  <FormControl required fullWidth margin='normal'className={classes.formControl}>
                            <InputLabel >Welche Tageszeit präferierst du? </InputLabel>
                             <Select error={tageszeitenValidationFailed} value={tageszeiten}
                             onChange={this.handleChangeTageszeiten}>
                                <MenuItem value='1'>Morgens</MenuItem>
                                <MenuItem value='2'>Mittags</MenuItem>
                                <MenuItem value='3'>Abends</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Tage präferierst du?</InputLabel>
                             <Select error={tageValidationFailed} value={tage} onChange={this.handleChangeTage}>
                                <MenuItem value='1'>Unter der Woche</MenuItem>
                                <MenuItem value='2'>Am Wochenende</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Frequenz präferierst du?</InputLabel>
                             <Select error={frequenzValidationFailed} value={frequenz} onChange={this.handleChangeFrequenz}>
                                <MenuItem value='1'>Wöchentlich</MenuItem>
                                <MenuItem value='2'>Mehrmals die Woche</MenuItem>
                                <MenuItem value='3'>Alle zwei Wochen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/> 
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Lernart präferierst du?</InputLabel>
                             <Select error={lernartValidationFailed} value={lernart} onChange={this.handleChangeLernart}>
                                <MenuItem value='1'>Visuell</MenuItem>
                                <MenuItem value='2'>Auditiv</MenuItem>
                                <MenuItem value='3'>Motorisch</MenuItem>
                                <MenuItem value='4'>Kommunikativ</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welche Gruppengroesse präferierst du?</InputLabel>
                             <Select error={gruppengroesseValidationFailed} value={gruppengroesse} onChange={this.handleChangeGruppengroesse}>
                                <MenuItem value='1'>Bis zu 3 Personen</MenuItem>
                                <MenuItem value='2'>3-5 Personen</MenuItem>
                                <MenuItem value='3'>Über 5 Personen</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                            <InputLabel>Welchen Lernort präferierst du?</InputLabel>
                             <Select error={lernortValidationFailed} value={lernort} onChange={this.handleChangeLernort}>
                                <MenuItem value='1'>Remote</MenuItem>
                                <MenuItem value='2'>Hochschule</MenuItem>
                                <MenuItem value='3'>Bibliothek</MenuItem>
                                <MenuItem value='4'>Cafe</MenuItem>
                            </Select>
                   </FormControl>
                   <br/>
                   <FormControl required fullWidth margin='normal' className={classes.formControl}>
                        <MultiSelectLernfaecher lernfaecher = {lernfach} onChangeLernfaecher = {this.onChangeLernfaecher}/>
                    </FormControl>
                </form>
                <LoadingProgress show={addingInProgress || updatingInProgress} />
                {

                  <ContextErrorMessage error={updatingError}
                      contextErrorMsg={`Du konntest leider nicht registriert werden :/`}
                      onReload={() => {this.updatenPerson(); this.updatenProfil(); this.updatenLernvorlieben();}} />

                }
              </DialogContent>
              <DialogActions>
                {
                    <Button disabled={nameValidationFailed || vornameValidationFailed || semesterValidationFailed || studiengangValidationFailed || alterValidationFailed || geschlechtValidationFailed || lerngruppeValidationFailed } variant='contained'
                          onClick={() => {this.updatenPerson(); this.updatenProfil(); this.updatenLernvorlieben();}} color='primary'>
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