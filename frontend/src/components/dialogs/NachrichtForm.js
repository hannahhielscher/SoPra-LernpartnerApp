import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from '@material-ui/core';

import { LernpartnerAPI, NachrichtBO } from '../../api';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

class NachrichtForm extends Component {
    constructor(props) {
        super(props);

     // Init the state
     this.state = {
         nachricht: '',
         empfaenger: null,
         konversation: null,
         sender: null,

      };

      // save this state for canceling
      this.baseState = this.state;
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    /** Nachricht hinzufügen */
    addNachricht = () => {
        let newNachricht= new NachrichtBO(this.state.nachricht);
        LernpartnerAPI.getAPI().addNachricht(newNachricht).then(person => {
            // Backend call sucessfull
            this.setState(this.baseState);
            this.props.onClose(nachricht); 
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

    handleChange(e) {
        this.setState({
            nachricht: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.nachricht(this.state.nachricht)
        this.setState({
            nachricht: ''
        });
    }
    
    
    render() { 
        const { classes, show } = this.props;
        const { nachricht } = this.state;
    
        //let title = 'Verfasse eine Nachricht';
    
    return (
    <form className="NachrichtForm" onSubmit={this.handleSubmit}>
        <input
        placeholder= "schreibe eine Nachricht"
        type="text"
        onChange={this.handleChange}
        value={nachricht}
        disabled={this.props.disabled} />
    </form>
    );
    
  }

}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

/** PropTypes */
NachrichtForm.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	
	onSignIn: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(NachrichtForm));