import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class Signin extends Component {


	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user object is null */
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.page}>
				<Typography className={classes.root} align='center' variant='h6'>Willkommen bei der HdM Lernpartner-App</Typography>
				<Typography className={classes.root} align='center'>Du bist scheinbar nicht angemeldet.</Typography>
				<Typography className={classes.root} align='center'>Um deinen passenden Lernpartner zu finden: </Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Anmelden mit Google
      			</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2),
	},
	page: {
	    marginTop:'40px'
	}
});

/** PropTypes */
Signin.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Signin)