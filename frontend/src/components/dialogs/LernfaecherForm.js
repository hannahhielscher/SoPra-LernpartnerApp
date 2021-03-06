import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { LernpartnerAPI } from '../../api';
import VorschlagListe from '../VorschlagListe';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import Button from '@material-ui/core/Button';

/**
 * Dieses Form zeigt ein Dialog zur Auswahl eines Lernfachs an. Es werden danach die Matches generiert.
 * Dafuer wird auf die API zugegriffen (Backend zugriff)
 *
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 */

class LernfaecherForm extends Component {
  
  constructor(props){
    super(props);

    // initiiere einen leeren state
    this.state = {
        profil: null,
        lernfaecher: [],
        lernfach: null,
        showVorschlagListe: false,
        loadingInProgress: false,
        error: null
    };
  }

  handleChange = (event) => {
    this.setState({lernfach: event.target.value});
    
  }

    // API Anbindung um das Profil ihm Backend zu bekommen
    getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.currentPerson.getprofil())
    .then(profilBO =>
        this.setState({
          profil: profilBO,
          lernfaecher: profilBO.lernfaecher,
          loadingInProgress: false,
          error: null,
        }))
        .catch(e =>
            this.setState({
              profil: null,
              lernfaecher: null,
              loadingInProgress: false,
              error: e,
            }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
  }

    // API Anbindung um die Lernfaecher ihm Backend zu bekommen
    getLernfaecher = () => {
    LernpartnerAPI.getAPI().getLernfaecherByProfil(this.props.currentPerson.getprofil())
    .then(lernfaecherBOs =>
      this.setState({
            lernfaecher: lernfaecherBOs,
            lernfaechernamen: lernfaecherBOs.map(lernfach=> lernfach.bezeichnung),
            loadingInProgress: false,
            error: null
      }))
      .catch(e =>
        this.setState({ // Reset state with error from catch
          lernfaecher: null,
          loadingInProgress: false,
          error: e,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  //Handles the onClick event of the show profil button
  bestaetigenButtonClicked = (event) => {
    this.setState({
      showVorschlagListe: true
    });
  }

    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
    this.getLernfaecher();
  }

  render() {
    const { classes, currentPerson } = this.props;
    const { profil, lernfaecher, lernfach, showVorschlagListe, loadingInProgress, error } = this.state;
    
    console.log(profil)
    console.log(showVorschlagListe)
    return (
      <div className={classes.page}>
        <h2 style={{ marginTop: '40px'}} >W??hle ein Lernfach, f??r das du einen neuen Lern Buddy suchst.</h2>
        <FormControl className={classes.formControl}>
          <Select
            native
            value= {lernfach}
            onChange={this.handleChange}
            className={classes.selectEmpty}
          >
           {lernfaecher.map(lernfach =>
            <option key={lernfach.id} value={lernfach.id}>{lernfach.bezeichnung}</option>
          )};
           
          </Select>
        </FormControl>
        <Button variant="contained" className={classes.button} color="primary" onClick= {this.bestaetigenButtonClicked}>Best??tigen</Button>
        <VorschlagListe show={showVorschlagListe} currentPerson={currentPerson} lernfach={lernfach} />
        <LoadingProgress show={loadingInProgress}></LoadingProgress>
        <ContextErrorMessage error={error} contextErrorMsg = {'Hier ist ein Fehler aufgetreten'} onReload={this.getProfil} />
      </div>
    );
  } 
}

/** Component specific styles */
const styles = theme => ({
  formControl: {
    marginBottom: '10px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  page: {
    marginTop: '17px'
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});


export default withRouter(withStyles(styles)(LernfaecherForm));