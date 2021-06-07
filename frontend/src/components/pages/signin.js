import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Button,
    Grid,
    Typography,
    withStyles,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@material-ui/core';

/**
 * Render eine Seite für nicht eingeloggte Nutzer.
 * Dafür wird eine existierende Google Account Sign in Komponente verwendet.
 * Die Komponente nutzt eine Firebase für einen redirect.
 *
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 *
 */

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameValidationFailed: false,
			nameEdited: false,
			vornameValidationFailed: false,
            vornameEdited: false,
            semesterValidationFailed: false,
            semesterEdited: false,
            alterValidationFailed: false,
			alterEdited: false,
			geschlecht: null,
			geschlechtEdited: false,
			lerngruppe: null,
			lerngruppeEdited: false

        };
    }


    // Handles the click event of the sign in button and calls the prop onSignIn handler
    handleSignInButtonClicked = () => {
        document.cookie = `name= ${document.getElementById('name').value};path=/`
        document.cookie = `vorname= ${document.getElementById('vorname').value};path=/`
		document.cookie = `semester= ${document.getElementById('semester').value};path=/`
		document.cookie = `alter= ${document.getElementById('alter').value};path=/`
		//document.cookie = `geschlecht= ${document.getElementById('geschlecht').value};path=/`
		document.cookie = `geschlecht= ${this.state.geschlecht};path=/`
		//document.cookie = `lerngruppe= ${document.getElementById('lerngruppe').value};path=/`
		document.cookie = `lerngruppe= ${this.state.lerngruppe};path=/`
        
        setTimeout(() => {
            this.props.onSignIn();
        }, 0);
    }

	handleChangeGeschlecht = (geschlecht) => {
        this.setState({
            geschlecht: geschlecht.target.value,
            geschlechtEdited: true
        })
        setTimeout(() => {
            console.log(this.state)
        }, 500);
    };

	handleChangeLerngruppe = (lerngruppe) => {
        this.setState({
            lerngruppe: lerngruppe.target.value,
            lerngruppeEdited: true
        })
        setTimeout(() => {
            console.log(this.state)
        }, 500);
	};
	
    // Validierung der Textfeldaenderungen
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().lenght === 0) {
            error = true;
        }
        this.setState({
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    numberValueChange = (event) => {
        const value = event.target.value;
        const re = /^[0-9]{1,6}$/;

        let error = false;
        if (value.trim().lenght === 0) {
            error = true;
        }
        if (re.test(event.target.value) === false) {
            error = true;
        }
        this.setState({
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    // rendert die  Komponente SignIn Seite
    render() {
        const {
            nameValidationFailed,
			nameEdited,
			vornameValidationFailed,
            vornameEdited,
            semesterValidationFailed,
            semesterEdited,
            alterValidationFailed,
			alterEdited,
			geschlecht,
			geschlechtEdited,
			lerngruppe,
			lerngruppeEdited
        } = this.state;
        const {classes} = this.props;

        return <div>
            <Paper>
                <Card>
                    <Typography className={classes.root} align='center' variant='h6'>Willkommen zur HDM Lernpartner
                        App</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <form className={classes.form} autoComplete="on">
                                <TextField id="name" label="Name" error={nameValidationFailed}
                                           onChange={this.textFieldValueChange}/>
                            </form>
                            <form className={classes.form} autoComplete="on">
                                <TextField id="vorname" label="Vorname" error={vornameValidationFailed}
                                            onChange={this.textFieldValueChange}/>
                            </form>
                            <form className={classes.form} autoComplete="on">
                                <TextField id="semester" label="Semester" error={semesterValidationFailed}
                                        	onChange={this.numberValueChange}/>
                            </form>
							<form className={classes.form} autoComplete="on">
                                <TextField id="alter" label="Alter" error={alterValidationFailed}
                                        	onChange={this.numberValueChange}/>
                            </form>
							<FormControl className={classes.formControl}>
                                <InputLabel>Geschlecht</InputLabel>
                                <Select required onChange={this.handleChangeGeschlecht}>
                                    <MenuItem value='Männlich'>Männlich</MenuItem>
                                    <MenuItem value='Weiblich'>Weiblich</MenuItem>
                                    <MenuItem value='Divers'>Divers</MenuItem>
                                </Select>
                            </FormControl>
							<></>
							<FormControl className={classes.formControl}>
                                <InputLabel>Interesse an einer Lerngruppe?</InputLabel>
                                <Select required onChange={this.handleChangeLerngruppe}>
                                    <MenuItem value='True'>Ja!</MenuItem>
                                    <MenuItem value='False'>Nein!</MenuItem>
                                </Select>
                            </FormControl>
                                
                        </Grid>
                    </Grid>
                    <Typography className={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen
                        Sie sich authentifizieren.</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button style={{marginBottom: "2em"}} variant='contained' color='primary'
                                    onClick={this.handleSignInButtonClicked}
                                    disabled={ nameValidationFailed || !nameEdited || vornameValidationFailed || !vornameEdited || semesterValidationFailed || !semesterEdited || alterValidationFailed || !alterEdited || !geschlechtEdited || !lerngruppeEdited}>
                                Anmelden
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
        </div>
    }
}


/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    formControl: {
        minWidth: 180
    },
    form: {
        marginTop: theme.spacing(1)
    }
});

/** PropTypes */
SignIn.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}


export default withStyles(styles)(SignIn)