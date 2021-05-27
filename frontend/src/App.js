import React, { Component } from 'react';
import Header from './components/layout/header';
//import Header from './header/header.js';
//import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
//import { Link as RouterLink } from 'react-router-dom';
//import ProfileDropDown from '../dialogs/ProfileDropDown';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';

function App() {
  return (
    <div>
        <p>
          Hallo
        </p>
    </div>
  );
}

export default App;
