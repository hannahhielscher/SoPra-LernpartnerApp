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
import KonversationBO from '../../api/KonversationBO';
import TeilnahmeChatBO from '../../api/TeilnahmeChatBO';
import ProfilBO from '../../api/ProfilBO';
import PersonBO from '../../api/PersonBO';
import LernpartnerAPI from '../../api/LernpartnerAPI';
import VorschlagListeEintrag from '../VorschlagListeEintrag';


class AnfrageEintragForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatPartner: null,
            chatPartnerProfil: null,
            gruppeProfil: null,

            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null

        };

        // save this state for canceling
        this.baseState = this.state;
    }

 /** Renders the component */
  render() {
    const { classes, show } = this.props;
    const { chatPartner, name, vorname, gruppeProfil, konversation, konversationID, teilnahmeChat, teilnahmeChatPartner, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;
    console.log(chatPartner)
    console.log(name)
    console.log(gruppeProfil)
    console.log(konversationID)
    console.log(konversation)

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle> Deine Anfragen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
/*
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`lerngruppe${lerngruppe.getID()}accountpanel-header`}>
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Typography variant='body1'>
                        Name
                    </Typography>
                  </Grid>
                    <Button style={{ width : 250, color: "red"}} color='secondary' onClick={this.verlasseLerngruppeButtonClicked}>
                        Ablehnen
                    </Button>
                    <Button color="primary" onClick= {this.bearbeitenButtonClicked}>Gruppenprofil bearbeiten</Button>
                    <Button style={{ width : 250, color: "blue"}} color='secondary' onClick={this.gruppeFormButtonClicked}>
                        Annehmen
                    </Button>
                  </AccordionSummary>
                 <AccordionDetails>
                  <Profil user={lerngruppe}/>
                </AccordionDetails>
              </Accordion>*/

              <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Name"
                  />
                  <ListItemSecondaryAction>
                    <Button style={{ width : 250, color: "red"}} color='secondary' onClick={this.verlasseLerngruppeButtonClicked}>
                        Ablehnen
                    </Button>
                    <Button color="primary" onClick= {this.bearbeitenButtonClicked}>Gruppenprofil bearbeiten</Button>
                    <Button style={{ width : 250, color: "blue"}} color='secondary' onClick={this.gruppeFormButtonClicked}>
                        Annehmen
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>

            <LoadingProgress show={addingInProgress} />
                <ContextErrorMessage error={addingError} contextErrorMsg={`Die Anfrage konnte nicht gesendet werden.`} onReload={this.getChatPartnerStatus} />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
                <Button variant='contained' onClick={this.getChatPartnerStatus} color='primary'>
                  Anfrage senden
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
AnfrageEintragForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(AnfrageEintragForm);