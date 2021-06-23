import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import LernpartnerAPI from '../../api/LernpartnerAPI'


class GruppeVerlassenDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      teilnahmeGruppe: props.teilnahmeGruppe,
      verlassenInProgress: false,
      verlassenError: null
    };
  }

  /** Gruppe verlassen */
  verlasseGruppe = () => {
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

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, teilnahmeGruppe, show } = this.props;
    const { verlassenInProgress, verlassenError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Gruppe verlassen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Möchtest du wirklich die Gruppe verlassen?</p>
              <p style={{color: "red", fontSize: 14}}>!!!Achtung: Wenn du die Gruppe verlässt, verlässt du auch automatisch den Chat!!!</p>
            </DialogContentText>
            <LoadingProgress show={verlassenInProgress} />
            <ContextErrorMessage error={verlassenError} contextErrorMsg={`Die Gruppe konnte nicht verlassen werden.`}
              onReload={this.verlasseGruppe} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.verlasseGruppe} color='primary'>
              Verlassen
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
GruppeVerlassenDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be deleted */
  customer: PropTypes.object.isRequired,
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

export default withStyles(styles)(GruppeVerlassenDialog);
