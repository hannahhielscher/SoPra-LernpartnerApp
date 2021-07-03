import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LernpartnerAPI from '../../api/LernpartnerAPI'

class ProfilDialog extends Component {

    constructor(props) {
      super(props);
  
      // Init the state
      this.state = {
            person: null,
            profil: null,
            
            lernvorlieben: null,
            
            tageszeiten: null,
            tage: null,
            frequenz: null,
            lernart: null,
            gruppengroesse: null,
            lernort: null,
            gruppe: null,
            personVorname: null,
            personName: null,
            personAlter: null,
            personGeschlecht: null,
            personSemester: 0,
            personStudiengang: null,
            lerngruppe: false,
            lerngruppeName: null,
            personProfilID: null,
            lernfaecher: null,
            personLernvorliebenID: null,
            profilError: null,
            loadingInProgress: false,
            loadingError: null,
      };
    }
  
    getProfil = () => {
        console.log('Test')
        LernpartnerAPI.getAPI().getProfil(this.props.chatPartner.profil)
        .then(profilBO =>
          this.setState({
                gruppe: profilBO.gruppe,
                lernfaecher: profilBO.lernfaecher,
                loadingInProgress: false,
                error: null
          })).then(() => {
            this.getPartner();
            //console.log(this.state.profil.id)
        }).catch(e =>
            this.setState({ // Reset state with error from catch
              gruppeProfil: null,
              loadingInProgress: false,
              error: e,
            })
          );
        }

    getLernvorlieben = () => {
        LernpartnerAPI.getAPI().getLernvorlieben(this.props.currentProfil.lernvorlieben_id)
        .then(lernvorliebenBO =>
          this.setState({
                lernvorlieben: lernvorliebenBO,
                tageszeiten: lernvorliebenBO.tageszeiten_bez,
                tage: lernvorliebenBO.tage_bez,
                frequenz: lernvorliebenBO.frequenz_bez,
                lernart: lernvorliebenBO.lernart_bez,
                gruppengroesse: lernvorliebenBO.gruppengroesse_bez,
                lernort: lernvorliebenBO.lernort_bez,
                loadingInProgress: false,
                error: null
          })).catch(e =>
            this.setState({ // Reset state with error from catch
              lernvorlieben: null,
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

      // API Anbindung um Person vom Backend zu bekommen
    getPerson = () => {
        console.log('testPerson')
        LernpartnerAPI.getAPI().getPersonByProfil(this.props.chatPartner.profil)
        .then(personBO =>
            this.setState({
              person: personBO,
              personName: personBO.name,
              personVorname: personBO.vorname,
              personAlter: personBO.alter,
              personGeschlecht: personBO.geschlecht,
              personStudiengang: personBO.studiengang,
              personSemester: personBO.semester,
              loadingInProgress: false,
              error: null,
        })).then(() => {
            this.getLernvorlieben();
        }).catch(e =>
                this.setState({
                  person: null,
                  personName: null,
                  personVorname: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }
  
      // API Anbindung um Lerngruppe vom Backend zu bekommen
      getLerngruppe = () => {
        LernpartnerAPI.getAPI().getLerngruppeByProfil(this.state.chatPartner.profil)
        .then(lerngruppeBO =>
            this.setState({
              lerngruppe: lerngruppeBO,
              lerngruppeName: lerngruppeBO.name,
              loadingInProgress: false,
              error: null,
        })).then(() => {
            this.getLernvorlieben();
        }).catch(e =>
                this.setState({
                  lerngruppe: null,
                  lerngruppeName: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

    getPartner = () => {
        if (this.state.gruppe === true){
            console.log('test1')
            this.getLerngruppe();
        } else {
            console.log('test2')
            this.getPerson();
        }
    }
    componentDidMount() {
        // load initial balance
        this.getProfil();
        
      }
    
    /** Handles the close / cancel button click event */
    handleClose = () => {
        // Reset the state
        this.setState(this.baseState);
        this.props.onClose(null);
    }
    
  
    /** Renders the component */
    render() {
      const { classes, teilnahmeGruppe, chatPartner, currentProfil, show } = this.props;
      const { personName, personVorname, personAlter, personGeschlecht, personStudiengang, personSemester, lernfaecher, gruppe, lerngruppeName, profil, tageszeiten, lernort, lernart, frequenz, gruppengroesse, tage, verlassenInProgress, profilError } = this.state;
      //console.log(verlassenInProgress)
      console.log(teilnahmeGruppe)
      console.log(chatPartner)
      console.log(currentProfil)
      console.log(gruppe)
      console.log(personVorname)
      //console.log(teilnahmeGruppe.id)
  
      return (
        show ?
          <Dialog open={show} onClose={this.handleClose}>
            <DialogTitle id='profil-dialog-title'>Profil anzeigen
              <IconButton className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                  
            {
            gruppe ?
                <>
                    
                    <b> Gruppenname: </b>{chatPartner.name}<br /><br />

                    <b>Lernvorlieben:</b><br/>
                    Tageszeiten: {tageszeiten}<br />
                    Tage: {tage}<br />
                    Frequenz: {frequenz}<br />
                    Lernart: {lernart}<br />
                    Lernort: {lernort}
                </>

                :
                <>
                    <p>Profil von {chatPartner.vorname} {chatPartner.name} </p>
                    
                    <b>Alter: </b> {personAlter}<br/>
                    <b>Semester: </b> {personSemester}<br/>
                    <b>Studiengang: </b>{personStudiengang}<br/>
                    <b>Geschlecht: </b> {personGeschlecht}<br/>
                    <b>Lernfächer: </b> {lernfaecher} <br/><br/>
                    <b>Lernvorlieben:</b><br/>
                    Tageszeiten: {tageszeiten}<br />
                    Tage: {tage}<br />
                    Frequenz: {frequenz}<br />
                    Lernart: {lernart}<br />
                    Gruppengröße: {gruppengroesse}<br/>
                    Lernort: {lernort}
                   
                </>
           }    
              </DialogContentText>
              <LoadingProgress show={verlassenInProgress} />
              <ContextErrorMessage error={profilError} contextErrorMsg={`Die Gruppe konnte nicht verlassen werden.`}
                 />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='secondary'>
                Abbrechen
              </Button>
              
            </DialogActions>
          </Dialog>
          : null
      );
    }
  }
  
  
  /** Component specific styles */
  const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
  ProfilDialog.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The CustomerBO to be deleted */
    currentProfil: PropTypes.object.isRequired,
    /** If true, the dialog is rendered */
    show: PropTypes.bool.isRequired,
    /**
     * Handler function which is called, when the dialog is closed.
     * Sends the deleted CustomerBO as parameter or null, if cancel was pressed.
     *
     * Signature: onClose(CustomerBO customer);
     */
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ProfilDialog);