import React, { Component, Fragment } from 'react';
import Transaction from './Transaction'
import Grid from '@material-ui/core/Grid';

class Transactions extends Component {

    render() {
        const transactions = this.props.transactions
        return (
            <Fragment>
                {transactions
                    .map(t => 
                        <Transaction 
                        key={t.id} transaction={t} 
                        handleDeleteTransaction={this.props.handleDeleteTransaction}/>)}
            </Fragment>
        );
    }
}

export default Transactions;