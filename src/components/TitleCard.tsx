import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';

const useTitleStyles = makeStyles({
    card: {
        overflow: 'visible',
    },
});
interface TitleCardProps {
    title: string,
    action?: JSX.Element,
    children: any,
}
export default function TitleCard(props: TitleCardProps) {
    const classes = useTitleStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" gutterBottom>{props.title}</Typography>
                {props.children}
            </CardContent>
            {props.action &&
            <CardActions>
                {props.action}
            </CardActions>}
        </Card>
    );
}