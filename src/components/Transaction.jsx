import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    cardContainer: {
      marginTop: theme.spacing.unit * 2
    },
    card:{
        width: '100%',
        padding: '5px',
        '&:hover': {
            boxShadow: '0px 0px 8px black'
        }
    },
    positive: {
        backgroundColor: '#b9f6ca',
        color: "#1b5e20",
    },
    negative: {
        backgroundColor: '#ffcdd2',
        color: '#d50000'
    }
  })

class Transaction extends Component {

    handleDeleteTransaction = (e) => {
        this.props.handleDeleteTransaction(this.props.transaction._id)
    }

    dateFormat = (date) => {
        const d = new Date(date)
        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = ("0" + d.getDate()).slice(-2);
        return `${day}-${month}-${year}`
    }

    render() {

        const { classes } = this.props
        const t = this.props.transaction

        return (
            <Grid 
                item 
                xs={11} md={7} 
                className={classes.cardContainer}
                container
            >
                <Card className={`${classes.card} ${t.amount > 0 ? classes.positive : classes.negative}`} >
                    <Grid 
                        item 
                        xs={12} 
                        alignItems='center'
                        container
                    >
                        <Grid item xs={1} >
                            <IconButton aria-label="Delete" onClick={this.handleDeleteTransaction}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="subtitle1" color="textSecondary" >
                                {t.category} 
                            </Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="subtitle1" color="textSecondary" >
                                {t.vendor} 
                            </Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="subtitle1" color="textSecondary" >
                                {this.dateFormat(t.date)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1">
                                $ {t.amount.toString().replace('-','')} 
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        );
    }
}

export default  withStyles(styles)(Transaction);