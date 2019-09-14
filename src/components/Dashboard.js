import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export default () => (
    <Card>
        <CardHeader title="Welcome to budgety app!" />
        <CardContent>
            Here you can add incomes and expences in your budgety list.
        </CardContent>
    </Card>
);