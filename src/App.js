import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'

import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [
        { id: "1Elevation", amount: 3200, vendor: "Elevation", category: "Salary" },
        { id: "2Runescape", amount: -7, vendor: "Runescape", category: "Entertainment" },
        { id: "3Subway", amount: -20, vendor: "Subway", category: "Food" },
        { id: "4Subway", amount: -98, vendor: "Subway", category: "Food" }
      ]
    }
  }

  getBalance = () => {
    let sum = 0
    this.state.transactions.forEach(t => sum += t.amount)
    return sum
  }

  handleTransaction = (amount, vendor, category) => {
    const newTrans = {amount, vendor, category}
    newTrans.id = this.state.transactions.length + 1 + vendor
    const transactions = [...this.state.transactions]
    transactions.push(newTrans)
    this.setState({
      transactions
    })
  }

  handleDeleteTransaction = (transactionId) => {
    const transactions = [...this.state.transactions]
    const transactionIndex = transactions.findIndex( t => t.id === transactionId)
    transactions.splice(transactionIndex, 1)
    this.setState({
      transactions
    })
  }

  render() {
      return (
        <Router>
          <div className='App'>
            <Route path='/transactions' 
              exact render={({ match }) => 
                <Transactions key='transactions' 
                  match={match} transactions={this.state.transactions} 
                  handleDeleteTransaction={this.handleDeleteTransaction}/>}/>

            <Route path='/operations'  
              exact render={({ match }) => 
                <Operations key='operations' match={match} handleTransaction={this.handleTransaction}/>}/>
            <div>
              <p id="user-balance">Balance: {this.getBalance()}</p>
            </div>
          </div>
        </Router>
      );
  }
}

export default App;
