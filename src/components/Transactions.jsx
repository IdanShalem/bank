import React, { Component } from 'react';
import Transaction from './Transaction'
import Grid from '@material-ui/core/Grid';

class Transactions extends Component {

    render() {
        const transactions = this.props.transactions
        return (
            <Grid item xs={12} id="transactions-container" direction="column" justify="center" align="center">
                {transactions
                    .map(t => 
                        <Transaction 
                        key={t.id} transaction={t} 
                        handleDeleteTransaction={this.props.handleDeleteTransaction}/>)}
            </Grid>
        );
    }
}

export default Transactions;