import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {

    render() {
        const transactions = this.props.transactions
        return (
            <div id="transactions-container">
                {transactions
                    .map(t => 
                        <Transaction 
                        key={t.id} transaction={t} 
                        handleDeleteTransaction={this.props.handleDeleteTransaction}/>)}
            </div>
        );
    }
}

export default Transactions;