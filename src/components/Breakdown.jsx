import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary  from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, withStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiAccordion:{
            root: {
                position: 'inherit'
            }
        },
        MuiAccordionSummary: {
        content: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      },
    },
  })

const styles = theme => ({
    container: {
        marginTop: '20px'
    },
    accordion: {
        width: '30vw',
        margin: '10px',
        padding: '2px',
        borderRadius: '10px'
    },
    summary: {
        backgroundColor: '#bbdefb',
        borderRadius: '10px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
        justifySelf: 'start'
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      details: {
          backgroundColor: 'white'
      }
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

        const { classes, transactions } = this.props
        const allTransactions = this.sumTransactions()

        return (
            <ThemeProvider theme={theme}>
                <Grid item xs={8} className={classes.container}>
                    {Object.keys(allTransactions).map(c => 
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.summary}
                            >
                                <Typography className={classes.heading}>{c}</Typography>
                                <Typography className={classes.secondaryHeading}>$ {allTransactions[c]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <Grid item xs={12} container direction='column'>
                                    {transactions
                                        .filter(t => t.category === c)
                                        .map(t => 
                                            <Grid item xs={12} container align='start'>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" component='span' color="textSecondary">
                                                        {t.vendor} 
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" component='span' color="textSecondary">
                                                        $ {t.amount} 
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>)
                    }
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Breakdown);