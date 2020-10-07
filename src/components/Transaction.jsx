import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
      marginTop: theme.spacing.unit * 2
    },
  })

class ComponentName extends Component {

    handleDeleteTransaction = (e) => {
        this.props.handleDeleteTransaction(this.props.transaction._id)
    }

    render() {
        const { classes } = this.props
        const t = this.props.transaction

        return (
            <Card 
                className={`${classes.root} transaction-card`} 
                style={t.amount > 0 
                    ? {backgroundColor: "#b9f6ca"} 
                    : {backgroundColor: '#ffcdd2'}}>
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                        <DeleteIcon onClick={this.handleDeleteTransaction}></DeleteIcon>
                    </IconButton>
                </Tooltip>  
                <Typography variant="span" component="span">
                    {t.category} 
                </Typography>
                <Typography variant="span" component="span">
                    {t.vendor} 
                </Typography>
                <Typography variant="span" 
                    component="span" 
                    style={t.amount > 0 
                        ? {color: "#1b5e20"} 
                        : {color: '#d50000'}}>
                    {t.amount.toString().replace('-','')} $ 
                </Typography>
            </Card>
        );
    }
}

export default  withStyles(styles)(ComponentName);