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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
  
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

  componentDidMount() {
    this.getLernfaecher();
  }

  render() {
    const { classes, currentPerson } = this.props;
    const { profil, lernfaecher, lernfach, showVorschlagListe, loadingInProgress, error } = this.state;
    
    console.log(profil)
    console.log(showVorschlagListe)
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Lernfach auswählen:</InputLabel>
          <Select
            native
            value= {lernfach}
            onChange={this.handleChange}
          >
           {lernfaecher.map(lernfach =>
            <option key={lernfach.id} value={lernfach.id}>{lernfach.bezeichnung}</option>
          )};
           
          </Select>
        </FormControl>
        <Button color="primary" onClick= {this.bestaetigenButtonClicked}>Bestätigen</Button>
        <VorschlagListe show={showVorschlagListe} currentPerson={currentPerson} lernfach={lernfach} />
        <LoadingProgress show={loadingInProgress}></LoadingProgress>
        <ContextErrorMessage error={error} contextErrorMsg = {'Hier ist ein Fehler aufgetreten'} onReload={this.getProfil} />
      </div>
    );
  } 
}

export default withRouter(withStyles(useStyles)(LernfaecherForm));