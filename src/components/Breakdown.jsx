import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
    container: {
        marginTop: '20px'
    },
    acordion: {
        width: '300px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
})

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

        const { classes } = this.props
        const allTransactions = this.sumTransactions()

        return (
            <Grid item xs={8} className={classes.container}>
                {Object.keys(allTransactions).map(c => 
                    <Accordion className={classes.acordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>{c}</Typography>
                            <Typography className={classes.secondaryHeading} align='right'>{allTransactions[c]}</Typography>
                        </AccordionSummary>
                        {c}: {allTransactions[c]}
                    </Accordion>)
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(Breakdown);