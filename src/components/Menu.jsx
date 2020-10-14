import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, 
    ChevronRight as ChevronRightIcon,
    ImportExport as ImportExportIcon,
    PieChart as PieChartIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon,
    Home as HomeIcon} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  });

class Menu extends Component {

    handleMenu = () => {
        this.props.handleMenu()
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.props.open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleMenu}>
                  {this.props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />} 
                </IconButton>
              </div>
              <Divider />
                <List>
                <Link to="/">
                    <ListItem button key={'Home'} onClick={this.handleMenu}>
                      <ListItemIcon>
                        <HomeIcon/>
                      </ListItemIcon>
                      <ListItemText primary={'Home'} />
                    </ListItem>
                  </Link>
                  <Link to="/operations">
                    <ListItem button key={'Operations'} onClick={this.handleMenu}>
                      <ListItemIcon>
                        <ImportExportIcon/>
                      </ListItemIcon>
                      <ListItemText primary={'Operations'} />
                    </ListItem>
                  </Link>  
                  <Link to="/breakdown">
                    <ListItem button key={'Breakdown'} onClick={this.handleMenu}>
                      <ListItemIcon>
                        <PieChartIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Breakdown'} />
                    </ListItem>
                  </Link>
                </List>
              <Divider />
              <List>
                  <ListItem button key={'Settings'} onClick={this.handleMenu}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Settings'} />
                  </ListItem>
                  <ListItem button key={'Log Out'} onClick={this.handleMenu}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log Out'} />
                </ListItem>
              </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Menu);