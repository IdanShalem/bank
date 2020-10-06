import React, { Component } from 'react';

class ComponentName extends Component {

    constructor() {
        super()
        this.state={
            amount: '',
            vendor: '',
            category: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTransaction = (e) => {
        if(this.state.amount && this.state.vendor && this.state.category) {
            let amount = parseInt(this.state.amount)
            if(e.target.name === 'withdraw') {
                amount *= -1
            } 
            this.props.handleTransaction(amount, this.state.vendor, this.state.category)
        } else {
            alert('Some of the areas are blank!')
        }
    }

    render() {
        return (
            <div className="operations-inputs">
                <input id="amount-input" type="number" 
                    name="amount" value={this.state.amount} onChange={this.handleChange} placeholder='Amount...'/>
                <input id="vendor-input" type="text" 
                    name="vendor" value={this.state.vendor} onChange={this.handleChange} placeholder='Vendor...'/>
                <input id="category-input" type="text" 
                    name="category" value={this.state.category} onChange={this.handleChange} placeholder='Category...'/>
                <button id="deposit-button" name="deposit" onClick={this.handleTransaction}>Deposit</button>
                <button id="withdraw-button" name="withdraw" onClick={this.handleTransaction}>Withdraw</button>
            </div>
            
        );
    }
}

export default ComponentName;