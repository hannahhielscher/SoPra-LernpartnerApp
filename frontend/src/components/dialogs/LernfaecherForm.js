import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { LernpartnerAPI } from '../../api';
//import VorschlagListe from '../VorschlagListe';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

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
        lernfaecher: null,
        lernfach: null,
        loadingInProgress: false,
        error: null
    };
  }

  handleChange = (event) => {
    const lernfach = event.target.lernfach;
    this.setState({
      [lernfach]: event.target.value,
    });
  }

  getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.currentPerson.getpersonenprofil())
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

  componentDidMount() {
    this.getProfil();
  }

  render() {
    const { classes, currentPerson } = this.props;
    const { profil, lernfaecher, lernfach, loadingInProgress, error } = this.state;
    
    console.log(profil)
    console.log(lernfaecher)
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Lernfach auswählen:</InputLabel>
          <Select
            native
            value= {lernfach}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
           {lernfaecher.map(lernfach =>
            <option key={lernfach.key} value={lernfach.key}>{lernfach.value}</option>
          )};
           
          </Select>
        </FormControl>
        
        <LoadingProgress show={loadingInProgress}></LoadingProgress>
        <ContextErrorMessage error={error} contextErrorMsg = {'Hier ist ein Fehler aufgetreten'} onReload={this.getProfil} />
      </div>
    );
  } 
}

export default withRouter(withStyles(useStyles)(LernfaecherForm));