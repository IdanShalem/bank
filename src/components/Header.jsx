import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle} from '@material-ui/icons';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
})

class Header extends Component {

    handleMenu = () => {
        this.props.handleMenu()
    }
    
    render() {

        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Money-Tracker
                        </Typography>
                        <AccountCircle /> 
                        &ensp; Idan Shalem
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Header);