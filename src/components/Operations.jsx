import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class ComponentName extends Component {

    constructor() {
        super()
        this.state={
            amount: '',
            vendor: '',
            category: '',
            open: false,
            action: '',
            done: false
        }
    }

    handleClickOpen = (e) => {
        this.setState({ open: true , action: e.target.innerHTML});
    }

    handleClose = () => {
        this.setState({ open: false });
      }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    captilizeString = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

    handleTransaction = () => {
        if(this.state.amount && this.state.vendor && this.state.category) {
            let amount = parseInt(this.state.amount)
            if(this.state.action === 'Withdraw') {
                amount *= -1
            } 
            const   vendor      = this.captilizeString(this.state.vendor),
                    category    = this.captilizeString(this.state.category)
            this.props.handleTransaction(amount, vendor, category)
            this.setState({ done: true })
        } else {
            alert('Some of the areas are blank!')
        }
    }

    render() {
        const { classes } = this.props;

        return (
          <Fragment>
            <Grid>
              <Card id="operations-card" className={classes.card}>
                  <Typography variant="h6" color="inherit">
                      Operation
                  </Typography>
                  <Typography variant="body2" color="inherit">
                      Please fill your operation details here
                  </Typography>
                  <CardContent>
                      <TextField id="amount-input" type="number"  
                          name="amount" value={this.state.amount} onChange={this.handleChange} placeholder='Amount...'/>
                  </CardContent>
                  <CardContent>
                      <TextField id="vendor-input" type="text" 
                          name="vendor" value={this.state.vendor} onChange={this.handleChange} placeholder='Vendor...'/>
                  </CardContent>
                  <CardContent>
                      <TextField id="category-input" type="text" 
                          name="category" value={this.state.category} onChange={this.handleChange} placeholder='Category...'/>
                  </CardContent>
                  <CardActions id="operations-buttons">
                      <Button size="small" color="primary" onClick={this.handleClickOpen}>
                          Deposit
                      </Button>
                      <Button id="withdraw-button" size="small" onClick={this.handleClickOpen}>
                          Withdraw
                      </Button>
                  </CardActions>
              </Card>
              </Grid>
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{this.state.action}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure about all the details?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.handleTransaction} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {this.state.done && <Redirect to="/" />}
          </Fragment>
        );
    }
}

export default withStyles(styles)(ComponentName);