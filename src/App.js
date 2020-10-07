import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const axios = require('axios')

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
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
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  }
});

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      open: false
    }
  }
  handleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  getAllTransactions() { return axios.get('http://localhost:3001/transactions') }

  componentDidMount= async () => {
    const transactions = await this.getAllTransactions()
    this.setState({transactions: transactions.data})
  }

  getBalance = () => {
    let sum = 0
    this.state.transactions.forEach(t => sum += t.amount)
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  handleTransaction = async (amount, vendor, category) => {
    const newTrans = {amount, vendor, category}
    await axios.post(`http://localhost:3001/transaction`, newTrans)
    const transactions = await this.getAllTransactions()
    this.setState({transactions: transactions.data})
  }

  handleDeleteTransaction = async (transactionId) => {
    await axios.delete(`http://localhost:3001/transaction/${transactionId}`)
    const transactions = await this.getAllTransactions()
    this.setState({transactions: transactions.data})
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state

      return (
        <Router>
          <div className='App'>
          <ThemeProvider theme={theme}>
            <div className={classes.root} id="header">
              <AppBar position="fixed" color="primary">
                <Toolbar>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  
                  <Typography variant="h6" color="inherit" className={classes.grow}>
                    Money-Tracker
                  </Typography>
                    <div>
                      <AccountCircle /> Idan Shalem
                    </div>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleMenu}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />} 
                  </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/operations">
                      <ListItem button key={'Operations'} onClick={this.handleMenu}>
                        <ListItemIcon>
                          <ImportExportIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Operations'} />
                      </ListItem>
                    </Link>  
                    <ListItem button key={'Breakdown'} onClick={this.handleMenu}>
                      <ListItemIcon>
                        <PieChartIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Breakdown'} />
                    </ListItem>
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
            </div>
            <div position="inherit">
              <Route path='/' 
                exact render={({ match }) => 
                  <Transactions key='transactions' 
                    match={match} transactions={this.state.transactions} 
                    handleDeleteTransaction={this.handleDeleteTransaction}/>}/>

              <Route path='/operations'  
                exact render={({ match }) => 
                  <Operations key='operations' match={match} handleTransaction={this.handleTransaction}/>}/>
            </div>
              <AppBar position="fixed" color="secondary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" >
                      Balance: {this.getBalance()}$
                    </Typography>
                </Toolbar>
              </AppBar>
            </ThemeProvider>
          </div>
        </Router>
      )
  }
}

export default withStyles(styles)(App);
