import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import KonversationListe from './components/KonversationListe';
//import VorschlagListe from './components/VorschlagListe';
import LernpartnerAPI from './api/LernpartnerAPI';
import About from './components/pages/About';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import RegistrierungForm from './components/dialogs/RegistrierungForm';
import MeinProfil from './components/MeinProfil';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import LernfaecherForm from './components/dialogs/LernfaecherForm';
//import Profil from './components/Profil';

class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			personName: null,
			personneu: false,
			appError: null,
			authError: null,
			authLoading: false,
			Userneu: null,
			currentPerson: null,
			
		};
	}

	/** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				
				})}).then(() => {
				this.getPersonByGoogleID()
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

  /** 
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	//aktuell eingeloggten Student vom Backend abfragen
	
	getPersonByGoogleID = () => {
		LernpartnerAPI.getAPI().getPersonByGoogleID(this.state.currentUser.uid)
			.then(personBO =>
				this.setState({
					currentPerson: personBO,
					personName: personBO.getvorname(),
					error: null,
					loadingInProgress: false,
				}))
				.catch(e =>
					this.setState({
						currentPerson: null,
						error: e,
						loadingInProgress: false,
					}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
		
		setTimeout(()=>{
		  console.log(this.state);
		},1000);
		}
	
	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	
	}

	/** Renders the whole app */
	render() {
		const { currentUser, currentPerson, personneu, personName, appError, authError, authLoading} = this.state;
		console.log(personName)
		console.log(personneu)
		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
					
						<Header user={currentUser} person={currentPerson}/>
						{
							// Is a user signed in?
							currentUser ?
								<>
									<Redirect from='/' to='/about'/>
									
									<Route path='/meinprofil' component={MeinProfil}>
										<MeinProfil currentPerson={currentPerson}/>
									</Route>

									<Route path='/meinelerngruppen'>
                                    	
									</Route>
										
									<Route path='/meinevorschlaege'>
									</Route>

									<Route path='/meinechats'>
									</Route>
									
									<Route path='/about' component={About} />
									
								</>
								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}
						
								
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
					</Container>
				
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
