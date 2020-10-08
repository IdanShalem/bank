import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

class Breakdown extends Component {

    sumTransactions = () => {
        const allTransactions = {}
        this.props.transactions.forEach(t => {
            if(allTransactions[t.category]) {
                allTransactions[t.category] += t.amount
            } else {
                allTransactions[t.category] = t.amount
            }
        })

        return allTransactions
    }

    render() {
        const allTransactions = this.sumTransactions()
        return (
            <div>
                {Object.keys(allTransactions).map(c => <Card>{c}: {allTransactions[c]}</Card>)}
            </div>
        );
    }
}

export default Breakdown;