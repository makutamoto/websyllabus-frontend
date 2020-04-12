import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useCenterStyles = makeStyles({
    root: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
interface CenterProps {
    children: JSX.Element | JSX.Element[],
}
export function Center(props: CenterProps) {
    const classes = useCenterStyles();

    return (
        <Box className={classes.root} display="flex">
            {props.children}
        </Box>
    );
}
