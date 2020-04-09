import React from 'react';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 304;

const useSideMenuStyles = makeStyles({
    root: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#01A299',
    },
});
export default function SideMenu() {
    const classes = useSideMenuStyles();
    return (
        <nav className={classes.root}>
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
            </Drawer>
        </nav>
    );
}