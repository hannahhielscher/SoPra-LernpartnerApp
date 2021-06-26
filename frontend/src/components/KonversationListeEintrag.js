import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
//import Nachricht from './Nachricht';
//import KonversationListe from './KonversationListe';


/** 
 * 
 * Es wird ein einzelne Konversationen von einer Person dargestellt
 * 
 * Hierfür wird der Name der Konversation angezeigt
 * 
 */

class KonversationListeEintrag extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            konversation: null,
            showKonversation: false,
            //showProfil: false,
        };
    }


    
// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
componentDidMount() {
  this.getKonversation();
}

//Handles the onClick event of the show Konversation button
showKonversationButtonClicked = (event) => {
  event.stopPropagation();
  this.setState({
    showKonversation: true
  });
}

render() {
  const { classes } = this.props;
  const { konversation } = this.state;

  return(
    <div>
      <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <Typography variant='body1' className={classes.heading}>{konversation.getname()}
                </Typography>
            </Grid>  
            <Grid item>
              <ButtonGroup variant='text' size='small'>
                <Button color='primary' onClick={this.showKonversationButtonClicked}>
                    Konversation ansehen
                </Button>
              </ButtonGroup>
            </Grid>
      </Grid>
      
    </div>
    //<Nachricht show={showKonversation} konversationid = {konversation.getid()}/> 
  )

}
  
    
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  customerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
KonversationListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}



export default withStyles(styles)(KonversationListeEintrag);