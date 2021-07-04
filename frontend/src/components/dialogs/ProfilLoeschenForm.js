import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LernpartnerAPI from '../../api/LernpartnerAPI'

class ProfilLoeschenForm extends Component{
    constructor(props){
        super(props);

        this.state = {
        loeschenInProgress: false,
        loeschenError: null
        };
    }

    /**Person löschen */
    loeschenPerson = () => {
        LernpartnerAPI.getAPI().deletePerson(this.props.currentPerson.getID())
            .then(person => {
                this.setState({
                    loeschenInProgress: false,              // disable loading indicator
                    loeschenError: null                     // no error message
                });
                this.props.onClose(this.props.currentPerson);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                loeschenInProgress: false,              // disable loading indicator
                loeschenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /**Lernfächer löschen */
    loeschenLernfaecher = () => {
        LernpartnerAPI.getAPI().deleteLernfaecherByProfil(this.props.currentPerson.getID())
            .then(lernfaecher => {
                this.setState({
                    loeschenInProgress: false,              // disable loading indicator
                    loeschenError: null                     // no error message
                });
                this.props.onClose(this.props.currentPerson);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                loeschenInProgress: false,              // disable loading indicator
                loeschenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /** Lernfächer einer Person löschen */
    loeschenLernfaecher = () => {
        LernpartnerAPI.getAPI().deleteTeilnahmeGruppe(this.props.teilnahmeGruppe.getID())
            .then(teilnahmeGruppe => {
                this.setState({
                    verlassenInProgress: false,              // disable loading indicator
                    verlassenError: null                     // no error message
                });
                this.props.onClose(this.props.teilnahmeGruppe);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                verlassenInProgress: false,              // disable loading indicator
                verlassenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /** Profil einer Person löschen */
    loeschenProfil = () => {
        LernpartnerAPI.getAPI().deleteTeilnahmeGruppe(this.props.teilnahmeGruppe.getID())
            .then(teilnahmeGruppe => {
                this.setState({
                    verlassenInProgress: false,              // disable loading indicator
                    verlassenError: null                     // no error message
                });
                this.props.onClose(this.props.teilnahmeGruppe);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                verlassenInProgress: false,              // disable loading indicator
                verlassenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }


    /** Lernvorlieben einer Person löschen */
    loeschenLernvorlieben = () => {
        LernpartnerAPI.getAPI().deleteLernvorlieben(this.props.lernvorlieben.getID())
            .then(lernvorlieben => {
                this.setState({
                    loeschenInProgress: false,              // disable loading indicator
                    loeschenError: null                     // no error message
                });
                this.props.onClose(this.props.lernvorlieben);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                loeschenInProgress: false,              // disable loading indicator
                loeschenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /** Gruppe verlassen */
    loeschenTeilnahmeGruppe = () => {
        LernpartnerAPI.getAPI().deleteTeilnahmeGruppe(this.props.currentPerson.getID())
            .then(teilnahmeGruppe => {
                this.setState({
                    verlassenInProgress: false,              // disable loading indicator
                    verlassenError: null                     // no error message
                });
                this.props.onClose(this.props.teilnahmeGruppe);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                verlassenInProgress: false,              // disable loading indicator
                verlassenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /** Gruppe verlassen */
    loeschenTeilnahmeChat = () => {
        LernpartnerAPI.getAPI().deleteTeilnahmeChatByPerson(this.props.currentPerson.getID())
            .then(teilnahmeGruppe => {
                this.setState({
                    verlassenInProgress: false,              // disable loading indicator
                    verlassenError: null                     // no error message
                });
                this.props.onClose(this.props.teilnahmeGruppe);  // call the parent with the deleted customer
            }).catch(e =>
            this.setState({
                verlassenInProgress: false,              // disable loading indicator
                verlassenError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            verlassenInProgress: true,                 // show loading indicator
            verlassenError: null                       // disable error message
        });
    }

    /** Handles the close / cancel button click event */
    handleClose = () => {
        // console.log(event);
        this.props.onClose(null);
    }



    /** Renders the component */
    render() {
        const { classes, show, currentPerson, currentProfil, lernvorlieben, teilnahmeGruppe } = this.props;
        const { loeschenInProgress, loeschenError } = this.state;
        console.log(teilnahmeGruppe)
        return (
            show ?
                <Dialog open={show} onClose={this.handleClose}>
                    <DialogTitle id='delete-dialog-title'>Profil löschen
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p>Möchtest du wirklich dein Profil löschen?</p>
                            <p style={{color: "red", fontSize: 14}}>!!!Achtung: Wenn du dein Profil löscht, dann werden alle deine Daten gelöscht!!!</p>
                        </DialogContentText>
                        <LoadingProgress show={loeschenInProgress} />
                        <ContextErrorMessage error={loeschenError} contextErrorMsg={`Dein Profil konnte nicht gelöscht werden.`}
                                             onReload={ () => {this.loeschenTeilnahmeGruppe(); this.loeschenPerson(); this.loeschenProfil(); this.loeschenLernvorlieben();}} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => {this.handleClose()}} color='secondary'>
                            Abbrechen
                        </Button>
                        <Button variant='contained' onClick={ () => {this.loeschenTeilnahmeGruppe(); this.loeschenTeilnahmeChat();}} color='primary'>
                            Profil löschen
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
ProfilLoeschenForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */

    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfilLoeschenForm);


