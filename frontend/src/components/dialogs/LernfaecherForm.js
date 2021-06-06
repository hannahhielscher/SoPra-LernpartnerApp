import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/** 
export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    
  });
  
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  */

class LernfaecherForm extends component{
  constructor(props){
    super(props);

    // initiiere einen leeren state
    this.state = {
        profil: null,
        lernfaecher: null,
        loadingInProgress: false,
        error: null
    };
  }
  
  getProfil = () => {
    LernpartnerAPI.getAPI().getProfil(this.props.profilid)
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
  
  render() {
    //const { profil, lernfaecher, loadingInProgress, error } = this.state;
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Lernfach auswählen:</InputLabel>
          <Select
            native
            value={state.age}
            //onChange={handleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            {this.state.lernfaecher.map(lernfaecher => (
            <option key={lernfaecher} value={lernfaecher}>
              {lernfaecher}
            </option>
            ))}
          </Select>
        </FormControl>
        <LoadingProgress show={loadingInProgress}></LoadingProgress>
        <ContextErrorMessage error={error} contextErrorMsg = {'Hier ist ein Fehler aufgetreten'} onReload={this.getProfil} />
      </div>
    );
  } 
}

export default withStyles(useStyles)(LernfaecherForm);