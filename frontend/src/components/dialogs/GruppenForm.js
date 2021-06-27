import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
    } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, GroupBO } from '../../api';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LerngruppeBO from '../../api/LerngruppeBO';
import LernvorliebenBO from '../../api/LernvorliebenBO';
import TeilnahmeGruppeBO from '../../api/TeilnahmeGruppeBO';
import ProfilBO from '../../api/ProfilBO';
import LernpartnerAPI from '../../api/LernpartnerAPI';
import GruppenListeEintrag from '../GruppenListeEintrag';


class GruppenForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lernvorlieben: null,
            profil: null,
            lerngruppe: null,

            gruppenName: null,
            gruppenNameValidationFailed: null,
            gruppenNameEdited: null,

            gruppe: 1,

            lernfaecher: null,
            lernfachListe: [],
            lernfaecherValidationFailed: null,
            lernfaecherNameEdited: null,

            tageszeiten: null,
            tageszeitenValidationFailed: null,
            tageszeitenEdited: null,

            tage: null,
            tageValidationFailed: false,
            tageEdited: null,

            frequenz: null,
            frequenzValidationFailed: null,
            frequenzEdited: null,

            gruppengroesse: 4,

            lernart: null,
            lernartValidationFailed: null,
            lernartEdited: null,

            lernort: null,
            lernortValidationFailed: null,
            lernortEdited: null,

            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null

        };

        // save this state for canceling
        this.baseState = this.state;
        this.lernfaecherSelectionChange = this.lernfaecherSelectionChange.bind(this);
        this.tageszeitenSelectionChange = this.tageszeitenSelectionChange.bind(this);
        this.tageSelectionChange = this.tageSelectionChange.bind(this);
        this.frequenzSelectionChange = this.frequenzSelectionChange.bind(this);
        this.lernartSelectionChange = this.lernartSelectionChange.bind(this);
        this.lernortSelectionChange = this.lernortSelectionChange.bind(this);
    }

  /** Add Lerngruppe */
  addLernvorlieben = () => {
    let newLernvorlieben = new LernvorliebenBO(this.state.tageszeiten, 'null', this.state.tage, 'null', this.state.frequenz, 'null', this.state.lernart, 'null', this.state.gruppengroesse, 'null', this.state.lernort, 'null');
    LernpartnerAPI.getAPI().addLernvorlieben(newLernvorlieben)
    .then(lernvorliebenBO =>
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
        this.setState({
            lernvorlieben: lernvorliebenBO,
            lernfachListe: [this.state.lernfaecher]
        })).then(() => {
            this.addProfil();

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

  /** Add Lerngruppe */
  addProfil = () => {
    let newProfil = new ProfilBO(this.state.gruppe, this.state.lernfachListe, this.state.lernvorlieben.id)
    console.log(this.state.gruppe)
    console.log(this.state.lernfachListe)
    console.log(this.state.lernvorlieben.id)
    console.log(typeof(this.state.gruppe))
    console.log(typeof(this.state.lernfachListe))
    console.log(typeof(this.state.lernvorlieben.id))
    LernpartnerAPI.getAPI().addProfil(newProfil)
    .then(profilBO =>
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState({
        profil: profilBO
      })).then(() => {
            this.addLerngruppe();
            //console.log(this.state.profil.id)
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

  /** Add Lerngruppe */
  addLerngruppe = () => {
    let newLerngruppe = new LerngruppeBO();
    newLerngruppe.setID(0)
    newLerngruppe.setname(this.state.gruppenName)
    newLerngruppe.setprofil(this.state.profil.id)
    LernpartnerAPI.getAPI().addLerngruppe(newLerngruppe)
    .then(lerngruppeBO =>
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState({
        lerngruppe: lerngruppeBO
      })).then(() => {
            this.addTeilnahmeGruppe();
            //console.log(this.state.profil.id)
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


  /** Add Teilnahme an Lerngruppe */
  addTeilnahmeGruppe = () => {
    let newTeilnahmeGruppe = new TeilnahmeGruppeBO(this.props.currentPerson.id, this.state.lerngruppe.id);
    LernpartnerAPI.getAPI().addTeilnahmeGruppe(newTeilnahmeGruppe)
    .then(teilnahmeGruppeBO => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(teilnahmeGruppeBO); // call the parent with the lerngruppe object from backend
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

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {

    }

  /** Handles value changes of the customer select textfield */
  lernfaecherSelectionChange = (event) => {
      this.setState({lernfaecher: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  tageszeitenSelectionChange = (event) => {
      this.setState({tageszeiten: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  tageSelectionChange = (event) => {
      this.setState({tage: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  frequenzSelectionChange = (event) => {
      this.setState({frequenz: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  lernartSelectionChange = (event) => {
      this.setState({lernart: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  lernortSelectionChange = (event) => {
      this.setState({lernort: event.target.value});
  }


  /** Renders the component */
  render() {
    const { classes, show } = this.props;
    const { lernvorlieben, profil, lerngruppe, gruppenName, gruppenNameValidationFailed, gruppenNameEdited, lernfaecher, lernfachListe, lernfaecherValidationFailed, lernfaecherNameEdited, tageszeiten, tageszeitenValidationFailed, tageszeitenEdited, tage, tageValidationFailed, tageEdited,
    frequenz, frequenzValidationFailed, frequenzEdited, lernart, lernartValidationFailed, lernartEdited, lernort, lernortValidationFailed, lernortEdited, addingInProgress, addingError,
    updatingInProgress, updatingError } = this.state;
    //console.log(lernfaecher)
    //console.log(typeof(lernfaecher))
    //parseInt(lernfaecher, 10)
    //console.log(parseInt("lernfaecher", 10))
    //console.log(typeof(lernfaecher))
    //console.log(profil)
    //console.log(lernvorlieben.getID())
    console.log(lernfachListe)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle>Neue Lerngruppe anlegen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenName' label='Gruppenname:' value={gruppenName}
                onChange={this.textFieldValueChange} error={gruppenNameValidationFailed}
                helperText={gruppenNameValidationFailed ? 'Der Gruppenname muss mindestens ein Zeichen enthalten' : ' '} />

              Bitte fülle für deine neue Lerngruppe folgende Profilinformationen vollständig aus:
              <br/>
              <FormControl required className={classes.formControl}>
                <InputLabel>Lernfach:</InputLabel>
                <Select error={lernfaecherValidationFailed} value={lernfaecher} onChange={this.lernfaecherSelectionChange}>
                <MenuItem value={1}>Software Entwicklung</MenuItem>
                <MenuItem value={2}>Data Science</MenuItem>
                <MenuItem value={3}>Führungsorientiertes Rechnungswesen</MenuItem>
                <MenuItem value={4}>Medienrecht</MenuItem>
                <MenuItem value={5}>Crossmedia-Konzeption</MenuItem>
                <MenuItem value={6}>Web-Technologie</MenuItem>
                <MenuItem value={7}>Datenbanken</MenuItem>
                <MenuItem value={8}>IT-Security</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl required className={classes.formControl}>
                <InputLabel>Tageszeiten:</InputLabel>
                <Select error={tageszeitenValidationFailed} value={tageszeiten} onChange={this.tageszeitenSelectionChange}>
                <MenuItem value={1}>Morgens</MenuItem>
                <MenuItem value={2}>Mittags</MenuItem>
                <MenuItem value={3}>Abends</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl required className={classes.formControl}>
                <InputLabel>Tage:</InputLabel>
                <Select error={tageValidationFailed} value={tage} onChange={this.tageSelectionChange}>
                <MenuItem value={1}>Unter der Woche</MenuItem>
                <MenuItem value={2}>Am Wochenende</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl required className={classes.formControl}>
                <InputLabel>Frequenz:</InputLabel>
                <Select error={frequenzValidationFailed} value={frequenz} onChange={this.frequenzSelectionChange}>
                <MenuItem value={1}>Wöchentlich</MenuItem>
                <MenuItem value={2}>Mehrmals die Woche</MenuItem>
                <MenuItem value={3}>Alle zwei Wochen</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl required className={classes.formControl}>
                <InputLabel>Lernart:</InputLabel>
                <Select error={lernartValidationFailed} value={lernart} onChange={this.lernartSelectionChange}>
                <MenuItem value={1}>Visuell</MenuItem>
                <MenuItem value={2}>Auditiv</MenuItem>
                <MenuItem value={3}>Motorisch</MenuItem>
                <MenuItem value={4}>Kommunikativ</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl required className={classes.formControl}>
                <InputLabel >Lernort:</InputLabel>
                <Select error={lernortValidationFailed} value={lernort} onChange={this.lernortSelectionChange}>
                <MenuItem value={1}>Remote</MenuItem>
                <MenuItem value={2}>Hochschule</MenuItem>
                <MenuItem value={3}>Bibliothek</MenuItem>
                <MenuItem value={4}>Cafe</MenuItem>
                </Select>
              </FormControl>
            </form>
            <LoadingProgress show={addingInProgress} />

                <ContextErrorMessage error={addingError} contextErrorMsg={`Die Gruppe konnte nicht angelegt werden.`} onReload={this.addLerngruppe} />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>

                <Button disabled={gruppenNameValidationFailed || !gruppenNameEdited || !lernfaecher || !tageszeiten || !tage || !frequenz || !lernart || !lernort} variant='contained' onClick={this.addLernvorlieben} color='primary'>
                  Gruppe erstellen
             </Button>

          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  content: {
    margin: theme.spacing(1),
    }
});

/** PropTypes */
GruppenForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  /**lerngruppe: PropTypes.object,*/
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(GruppenForm);