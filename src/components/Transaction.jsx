import React, { Component } from 'react';

class ComponentName extends Component {

    handleDeleteTransaction = (e) => {
        this.props.handleDeleteTransaction(this.props.transaction.id)
    }

    render() {
        const t = this.props.transaction
        return (
            <div className="transaction-card">
                <button onClick={this.handleDeleteTransaction}>DELETE</button>
                <span>{t.category} </span>
                <span>{t.vendor} </span>
                <span>{t.amount} </span>
            </div>
        );
    }
}

export default ComponentName;