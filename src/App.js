import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import './App.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Breakdown from './components/Breakdown';

const axios = require('axios')

const styles = theme => ({
  head: {
      marginBottom: '70px'
  },
  body: {
    marginBottom: '90px'
  }
})

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      open: false
    }
  }
  
  getAllTransactions() { return axios.get('http://localhost:3001/transactions') }
  
  componentDidMount= async () => {
    const transactions = await this.getAllTransactions()
    this.setState({transactions: transactions.data})
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

  handleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  getBalance = () => {
    let sum = 0
    this.state.transactions.forEach(t => sum += t.amount)
    return sum
  }

  render() {

    const { classes } = this.props

      return (
        <Router>
          <Grid container className='App'>

            <Grid item xs={12} className={classes.head} container>
              <Header handleMenu={this.handleMenu}/>

              <Menu handleMenu={this.handleMenu} open={this.state.open}/>
            </Grid>

            <Grid item xs={12} className={classes.body} direction='column' alignItems='center' container>
              <Route path='/' 
                    exact render={({ }) => 
                    <Transactions key='transactions' 
                      transactions={this.state.transactions} 
                      handleDeleteTransaction={this.handleDeleteTransaction}/>}/>

              <Route path='/operations'  
                  exact render={({ }) => 
                  <Operations key='operations' handleTransaction={this.handleTransaction}/>}/>
              
              <Route path='/breakdown'  
                  exact render={({ }) => 
                  <Breakdown key='operations' transactions={this.state.transactions} />}/>
            </Grid>
            <Footer balance={this.getBalance()} />

          </Grid>
        </Router>
      )
  }
}

export default withStyles(styles)(App);
