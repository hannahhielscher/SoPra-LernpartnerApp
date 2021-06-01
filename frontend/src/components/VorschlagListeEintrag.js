import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LernpartnerAPI from '../api/LernpartnerAPI'
//import { withStyles } from '@material-ui/core';
//import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import TableCell from '@material-ui/core/TableCell';
//import TableRow from '@material-ui/core/TableRow';

//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import ContextErrorMessage from './dialogs/ContextErrorMessage';
//import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Es wird ein einzelner Vorschlag für einen passenden Lernpartner oder /-gruppe mit allen not wendigen Informationen dargestellt
 * 
 * Hierfür werden Profilname, Alter, Geschlecht, Semester, Lernfach und der Prozentsatz des Matches angezeigt
 * 
 */

//Css Style Klassen für die Tabellen Zellen
/**const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Css Style Klassen für die Tabellen Zeilen
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/

class VorschlagListeEintrag extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            vorschlag: null,
            profil: null,
            profilID: null,
            personName: null,
            personAlter: null,
            personGeschlecht: null,
            personSemester: null,
            personLernfach: null,
            match: null,
            loadingInProgress: false,
            error: null
        };
    }

    /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.customer);
    }
    
    //Handles the onClick event of the show profil button
    showProfilButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showCustomerForm: true
      });
    }

    // API Anbindung um Vorschlag vom Backend zu bekommen 
    getVorschlag = () => {
      LernpartnerAPI.getAPI().getVorschlag(this.props.vorschlag)
      .then(vorschlagBO =>
          this.setState({
            vorschlag: vorschlagBO,
            profilID: vorschlagBO.person,
            match: vorschlagBO.match,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
            this.getProfil()
          })
          .catch(e =>
              this.setState({
                vorschlag: null,
                profilID: null,
                match: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    // API Anbindung um Person vom Backend zu bekommen 
    getPerson = () => {
      LernpartnerAPI.getAPI().getVorschlag(this.props.vorschlag)
      .then(personBO =>
          this.setState({
            person: personBO,
            profilID: vorschlagBO.person,
            personName: personBO.name,
            personAlter: personBO.alter,
            personGeschlecht: personBO.geschlecht,
            personSemester: personBO.semester,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                person: null,
                profilID: null,
                personName: null,
                personAlter: null,
                personGeschlecht: null,
                personSemester: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    // API Anbindung um Profil vom Backend zu bekommen 
    getProfil = () => {
      LernpartnerAPI.getAPI().getProfil(this.props.profil)
      .then(profilBO =>
          this.setState({
            profil: profilBO,
            personLernfach: profilBO.lernfach,
            loadingInProgress: false,
            error: null,
          }))
          .catch(e =>
              this.setState({
                profil: null,
                personLernfach: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }


    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
      this.getVorschlag();
    }

    // Wenn die Componente geupdatet wird
    componentDidUpdate(prevProps){
      if((this.props.show) && (this.props.show !== prevProps.show)) {
        this.getVorschlag();
      }
    }

    render(){

          const {vorschlag, profil, profilID, personName, personAlter, personGeschlecht,personSemester, personLernfach, match, loadingInProgress, error } = this.state;

          return(
            <>
              <StyledTableRow key={profilID}>
                  <StyledTableCell align="left">{personName}</StyledTableCell>
                  <StyledTableCell align="center">{personAlter}</StyledTableCell>
                  <StyledTableCell align="center">{personSemester}</StyledTableCell>
                  <StyledTableCell align="center">{personGeschlecht}</StyledTableCell> 
                  <StyledTableCell align="center">{personLernfach}</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell> 
                  <StyledTableCell align="right" className={classes.breite}>               
                                  { module ?
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>Modul</InputLabel> 
                                        <Select value = {teilnahme.anrechnung} onChange={this.handleChange}>
                                          {
                                          module.map(modul =>
                                          <MenuItem value={modul.getID()}><em>{modul.getname()}</em></MenuItem>
                                          )
                                          }
                                        </Select>                                                                
                                    </FormControl>                                  
                                    :
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>Modul</InputLabel>
                                        <Select value="">
                                          <MenuItem value=""><em></em></MenuItem>
                                        </Select>
                                    </FormControl>
                                  }
                  </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow> 
                    <StyledTableCell colspan="10" className={classes.laden}>
                      <LoadingProgress show={loadingInProgress}></LoadingProgress>
                      <ContextErrorMessage error={error} contextErrorMsg = {'Dieser Vorschlag konnte nicht geladen werden'} onReload={this.getVorschlag} />
                    </StyledTableCell>
                  </StyledTableRow>



            </>
          );
    }
}


const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
  },
  content: {
      margin: theme.spacing(1),
    },
  table: {
      minWidth: 700,
    },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      textAlign: "left"
  },
  button: {
      margin: theme.spacing(1),
      },
  laden: {
    padding: 0
  },
  breite: {
    width: 220
  }
  });

/** PropTypes */
VorschlagListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  vorschlag: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(VorschlagListeEintrag);