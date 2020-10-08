import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const axios = require('axios')

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
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  render() {
      return (
        <Router>
          <Grid container xs={12} className='App'>

            <div className="head">
              <Header handleMenu={this.handleMenu}/>

              <Menu handleMenu={this.handleMenu} open={this.state.open}/>
            </div>

            <Route path='/' 
                  exact render={({ match }) => 
                  <Transactions key='transactions' 
                  match={match} transactions={this.state.transactions} 
                  handleDeleteTransaction={this.handleDeleteTransaction}/>}/>

            <Route path='/operations'  
                exact render={({ match }) => 
                <Operations key='operations' match={match} handleTransaction={this.handleTransaction}/>}/>

            <Footer balance={this.getBalance()} />

          </Grid>
        </Router>
      )
  }
}

export default (App);
