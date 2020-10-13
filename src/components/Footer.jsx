import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    footer: {
      top: 'auto',
      bottom: 0,
    }
  })

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0091ea'
      },
      secondary: {
        main: '#b3e5fc'
      }
    }
  })

class Footer extends Component {

    handleMenu = () => {
        this.props.handleMenu()
    }
    
    render() {

        const { classes, balance } =this.props 

        return (
            <ThemeProvider theme={theme}>
              <AppBar className={classes.footer} position="fixed" color="secondary">
                  <Toolbar>
                      <Typography variant="h6" color="inherit" >
                        Balance: $ {balance}
                      </Typography>
                  </Toolbar>
              </AppBar>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Footer);