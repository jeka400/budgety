import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

export default () => (
    <Card>
        <Title title="NotFound" />
        <CardContent>
            <h1><i>404: Page not found, sorry :( </i></h1>
        </CardContent>
    </Card>
);