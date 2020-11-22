import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, withStyles, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
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
          gridTemplateColumns: '50% 50%'
        }
      },
    },
  })

const styles = theme => ({
    container: {
        marginTop: '20px',
        width: '100%'
    },
    accordion: {
        padding: '2px',
    },
    summary: {
        backgroundColor: '#caf0f8',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
        justifySelf: 'start'
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        justifySelf: 'start'
      },
      details: {
          backgroundColor: 'white'
      }
})

class Breakdown extends Component {

    dateFormat = (date) => {
        const d = new Date(date)
        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = ("0" + d.getDate()).slice(-2);
        return `${day}-${month}-${year}`
    }

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
                <Grid item xs={10} md={4} className={classes.container}>
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
                                                <Grid item xs={5}>
                                                    <Typography variant="body2" component='span' color="textSecondary">
                                                        {t.vendor} 
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography variant="body2" component='span' color="textSecondary">
                                                        {this.dateFormat(t.date)} 
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
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