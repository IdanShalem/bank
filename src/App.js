import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Breakdown from './components/Breakdown'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import './App.css'
import axios from 'axios'

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
      years: this.genreateYearsArr(),
      year: '',
      month: '',
      open: false
    }
  }
  
  genreateYearsArr = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for(let i = 1; i <= 5; i++)  {
      years.push(currentYear + i)
      years.push(currentYear - i)
    }
    years.sort((a, b) => a - b)
    return years
  }

  getAllTransactions = () => axios.get('http://localhost:3001/transaction/allTransactions') 
  
  
  componentDidMount= async () => {
    const transactions = await this.getAllTransactions()
    this.setState({transactions: transactions.data})
  }
  
  handleTransaction = async (amount, vendor, category, date) => {
    const newTrans = {amount, vendor, category, date}
    const transactions = await axios.post(`http://localhost:3001/transaction/expense`, newTrans)
    this.setState({transactions: transactions.data})
  }
  
  handleDeleteTransaction = async (transactionId) => {
    const transactions = await axios.delete(`http://localhost:3001/transaction/${transactionId}`)
    this.setState({transactions: transactions.data})
  }  

  handleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  getBalance = () => {
    const { transactions } = this.state
    return transactions.reduce((a, b) => a + b.amount, 0)
  }

  render() {

    const { classes } = this.props

      return (
        <Router>
          <Grid container className='App' >

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
