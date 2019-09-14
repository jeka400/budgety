import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    incomeSource: {
        color: 'green',
        fontSize: '15px'
    }
};

const IncomeSource = ({ record = {}, source, classes }) => {
    return (
        <p className={classes.incomeSource}>
            {record[source]}
        </p>
    );
};

export default withStyles(styles)(IncomeSource);