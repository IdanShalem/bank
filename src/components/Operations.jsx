import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
      paddingTop: '1vh',
      margin: 'auto',
      marginTop: '10vh',
      width: '25vw',
      height: '55vh',
      boxShadow: '1px 1px 3px rgb(97, 96, 96)'
    },
    input: {
      width: '100%'
    },
    cardElem: {
      marginTop: '5px',
    },
    cardActions: {
      marginTop: '25px'
    },
    buttons: {
      width: '100%'
    }
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
      if(this.state.amount && this.state.vendor && this.state.category) {
        this.setState({ open: true , action: e.target.innerHTML})
      } else {
        alert('Some of the areas are blank!')
      }
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
      let amount = parseInt(this.state.amount)
      if(this.state.action === 'Withdraw') {
          amount *= -1
      } 
      const   vendor      = this.captilizeString(this.state.vendor),
              category    = this.captilizeString(this.state.category)
      this.props.handleTransaction(amount, vendor, category)
      this.setState({ done: true })
    }

    render() {
        const { classes } = this.props;

        return (
          <Fragment>
              <Card id="operations-card" className={classes.card}>
                <Grid item xs={12} container justify='center' alignItems='center' direction='column'>
                  <CardHeader 
                    className={classes.cardElem} 
                    color="inherit" 
                    title="Operation"
                    subheader='Please fill your operation details here'
                  />
                  <CardContent className={classes.cardElem}>
                      <TextField 
                        className={classes.input} 
                        type="number"  
                        name="amount" 
                        value={this.state.amount} 
                        onChange={this.handleChange} 
                        placeholder='Amount...'
                      />
                  </CardContent>
                  <CardContent className={classes.cardElem}>
                      <TextField 
                        className={classes.input} 
                        type="text" 
                        name="vendor" 
                        value={this.state.vendor} 
                        onChange={this.handleChange} 
                        placeholder='Vendor...'
                      />
                  </CardContent>
                  <CardContent className={classes.cardElem}>
                      <TextField 
                      className={classes.input} 
                      type="text" 
                      name="category" 
                      value={this.state.category} 
                      onChange={this.handleChange} 
                      placeholder='Category...'
                    />
                  </CardContent>
                  <CardActions id="operations-buttons" className={classes.cardActions}>
                      <Button className={classes.buttons} variant="contained" color="primary" onClick={this.handleClickOpen}>
                          Deposit
                      </Button>
                      <Button id="withdraw-button" className={classes.buttons} variant="contained" onClick={this.handleClickOpen}>
                          Withdraw
                      </Button>
                  </CardActions>
                </Grid>
              </Card>
              
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