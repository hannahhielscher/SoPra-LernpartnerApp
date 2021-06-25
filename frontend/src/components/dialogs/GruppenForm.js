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

//import {LernpartnerAPI} from '../../api';

import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
//import ProfilBO from '../../api/ProfilBO';
import LerngruppeBO from '../../api/LerngruppeBO';
import LernvorliebenBO from '../../api/LernvorliebenBO';
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

            gruppe: true,

            lernfaecher: null,
            lernfaecherValidationFailed: false,
            gruppenNameEdited: null,

            tageszeiten: null,
            tageszeitenValidationFailed: false,
            tageszeitenEdited: null,

            tage: null,
            tageValidationFailed: false,
            tageEdited: null,

            frequenzen: null,
            frequenzenalidationFailed: false,
            frequenzenEdited: null,

            gruppengroesse: 4,

            lernarten: null,
            lernartenValidationFailed: false,
            lernartenEdited: null,

            lernorte: null,
            lernorteValidationFailed: false,
            lernorteEdited: null,

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
        this.frequenzenSelectionChange = this.frequenzenSelectionChange.bind(this);
        this.lernartenSelectionChange = this.lernartenSelectionChange.bind(this);
        this.lernorteSelectionChange = this.lernorteSelectionChange.bind(this);
    }

  /** Add Lerngruppe */
  addLernvorlieben = () => {
    let newLernvorlieben = new LernvorliebenBO(this.state.tageszeiten, this.state.tage, this.state.frequenzen, this.state.gruppengroesse, this.state.lernarten, this.state.lernorte);
    LernpartnerAPI.getAPI().addLernvorlieben(newLernvorlieben)
    .then(lernvorliebenBO => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
        this.setState({
            lernvorlieben: lernvorliebenBO
        });
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
    LernpartnerAPI.getAPI().addProfil(this.state.gruppe, this.state.lernfaecher, this.state.lernvorlieben.getID())
    .then(profilBO => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState({
        profil: profilBO
      });
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
    let newLerngruppe = new LerngruppeBO(this.state.gruppenName, this.state.profil.getID());
    LernpartnerAPI.getAPI().addLerngruppe(this.state.gruppenName, this.state.profil.getID())
    .then(lerngruppe => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(lerngruppe); // call the parent with the lerngruppe object from backend
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
  frequenzenSelectionChange = (event) => {
      this.setState({frequenzen: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  lernartenSelectionChange = (event) => {
      this.setState({lernarten: event.target.value});
  }

    /** Handles value changes of the customer select textfield */
  lernorteSelectionChange = (event) => {
      this.setState({lernorte: event.target.value});
  }

  getAll = () => {
    this.addLernvorlieben();
    this.addProfil();
    this.addLerngruppe();
  }


  /** Renders the component */
  render() {
    const { classes, show } = this.props;
    const { lernvorlieben, profil, lerngruppe, gruppenName, gruppenNameValidationFailed, gruppenNameEdited, lernfaecher, lernfaecherValidationFailed, tageszeiten, tageszeitenValidationFailed, tage, tageValidationFailed,
    frequenzen, frequenzenalidationFailed, lernarten, lernartenValidationFailed, lernorte, lernorteValidationFailed, addingInProgress, addingError,
    updatingInProgress, updatingError } = this.state;
    console.log(lernvorlieben)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <Typography> Neue Lerngruppe anlegen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <DialogContent>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenName' label='Gruppenname:' value={gruppenName}
                onChange={this.textFieldValueChange} error={gruppenNameValidationFailed}
                helperText={gruppenNameValidationFailed ? 'Der Gruppenname muss mindestens ein Zeichen enthalten' : ' '} />

              <FormControl className={classes.formControl}>
                <InputLabel>Lernfach:</InputLabel>
                <Select required error={lernfaecherValidationFailed} value={lernfaecher} onChange={this.lernfaecherSelectionChange}>
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
              <br/>

              <FormControl className={classes.formControl}>
                <InputLabel>Tageszeiten:</InputLabel>
                <Select required error={tageszeitenValidationFailed} value={tageszeiten} onChange={this.tageszeitenSelectionChange}>
                <MenuItem value='1'>Morgens</MenuItem>
                <MenuItem value='2'>Mittags</MenuItem>
                <MenuItem value='3'>Abends</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl className={classes.formControl}>
                <InputLabel>Tage:</InputLabel>
                <Select required error={tageValidationFailed} value={tage} onChange={this.tageSelectionChange}>
                <MenuItem value='1'>Unter der Woche</MenuItem>
                <MenuItem value='2'>Am Wochenende</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl className={classes.formControl}>
                <InputLabel>Frequenzen:</InputLabel>
                <Select required error={frequenzenalidationFailed} value={frequenzen} onChange={this.frequenzenSelectionChange}>
                <MenuItem value='1'>Wöchentlich</MenuItem>
                <MenuItem value='2'>Mehrmals die Woche</MenuItem>
                <MenuItem value='3'>Alle zwei Wochen</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl className={classes.formControl}>
                <InputLabel>Lernarten:</InputLabel>
                <Select required error={lernartenValidationFailed} value={lernarten} onChange={this.lernartenSelectionChange}>
                <MenuItem value='1'>Visuell</MenuItem>
                <MenuItem value='2'>Auditiv</MenuItem>
                <MenuItem value='3'>Motorisch</MenuItem>
                <MenuItem value='4'>Kommunikativ</MenuItem>
                </Select>
              </FormControl>
              <br/>

              <FormControl className={classes.formControl}>
                <InputLabel>Lernorte:</InputLabel>
                <Select required error={lernorteValidationFailed} value={lernorte} onChange={this.lernorteSelectionChange}>
                <MenuItem value='1'>Remote</MenuItem>
                <MenuItem value='2'>Hochschule</MenuItem>
                <MenuItem value='3'>Bibliothek</MenuItem>
                <MenuItem value='3'>Cafe</MenuItem>
                </Select>
              </FormControl>
            </form>
            <LoadingProgress show={addingInProgress} />

              // Show error message in dependency of customer prop

                <ContextErrorMessage error={addingError} contextErrorMsg={`Die Gruppe konnte nicht angelegt werden.`} onReload={this.addLerngruppe} />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>

                <Button disabled={gruppenNameValidationFailed || !gruppenNameEdited} variant='contained' onClick={this.getAll} color='primary'>
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