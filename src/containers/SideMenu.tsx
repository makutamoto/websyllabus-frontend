import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, LinearProgress, Collapse, Drawer, Hidden, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StateType } from '../reducers';
import { DispatchType } from '../index';
import { setMenu, setPhone, fetchCourses } from '../actions';
import { Center } from '../components/Center';

const useCourseStyles = makeStyles({
    root: {
        background: '#EDEDED',
    },
});
export interface CourseProps {
    name: string,
    link: string,
}
function Course(props: CourseProps) {
    const classes = useCourseStyles();

    return (
        <List className={classes.root} disablePadding>
            <ListItem button component={Link} to={props.link}>
                <ListItemText primary={props.name} />
            </ListItem>
        </List>
    );
}

const useGradeStyles = makeStyles({
    root: {
        background: '#F7F7F7',
    },
});
export interface GradeProps {
    name: string,
    courses: CourseProps[];
}
function Grade(props: GradeProps) {
    const classes = useGradeStyles();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListItem className={classes.root} button onClick={handleClick}>
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {props.courses.map((course, i) =>
                <Course key={course.link} {...course} />
                )}
            </Collapse>
        </React.Fragment>
    );
}

export interface DepartmentProps {
    name: string,
    grades: GradeProps[],
}
interface DepartmentState {
    open: boolean,
}
class Department extends React.Component<DepartmentProps, DepartmentState> {
    constructor(props: any) {
        super(props);
        this.state = { open: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open });
    }
    render() {
        return (
            <React.Fragment>
                <ListItem button onClick={this.handleClick}>
                    <ListItemText primary={this.props.name} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {this.props.grades.map((grade, i) =>
                        <Grade key={grade.name} {...grade} />
                        )}
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }
}

const useKosenStyles = makeStyles({
    root: {
        position: 'relative' as any,
        height: '100%' as any,
        overflow: 'auto',
        padding: 0,
    },
});
interface KosenProps {
    departments: DepartmentProps[] | null,
}
function Kosen(props: KosenProps) {
    const classes = useKosenStyles();
    let list: JSX.Element;
    if(props.departments === null) {
        list = <LinearProgress />;
    } else if(props.departments.length === 0) {
        list = (
            <Center>
                <Typography variant="h5">NOT AVAILABLE</Typography>
            </Center>
        );
    } else {
        list = (
            <React.Fragment>
                {props.departments.map((department) =>
                <Department key={department.name} {...department} />
                )}
            </React.Fragment>
        );
    }
    return (
        <List className={classes.root} component="nav">
            {list}
        </List>
    );
}

interface MobileDrawerDidAppearProps {
    onAppear: () => void,
    setPhone: (value: boolean) => void,
}
class MobileDrawerDidAppearRaw extends React.Component<MobileDrawerDidAppearProps, {}> {
    componentDidMount() {
        this.props.onAppear();
        this.props.setPhone(true);
    }
    componentWillUnmount() {
        this.props.setPhone(false);
    }
    render() {
        return null;
    }
}
const mapMobileDrawerDidAppearDispatchToProps = (dispatch: DispatchType) => ({
    setPhone: (value: boolean) => dispatch(setPhone(value)),
});

const MobileDrawerDidAppear = connect((state: StateType) => ({}), mapMobileDrawerDidAppearDispatchToProps)(MobileDrawerDidAppearRaw);

const drawerWidth = 256;
const SideMenuStyles = (theme: Theme) => ({
    root: {
        width: drawerWidth,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    rootHide: {
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerIndex: {
        zIndex: (theme.zIndex.appBar - 1 + ' !important') as any,
    },
});
interface SideMenuProps extends KosenProps {
    menu: boolean,
    departments: DepartmentProps[] | null,
    onClose: () => void,
    onOpen: () => void,
    onMount: () => void,
    classes: any,
}
class SideMenu extends React.Component<SideMenuProps> {
    componentDidMount() {
        this.props.onMount();
    }
    render() {
        const iOS = (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        return (
            <nav>
                <Hidden smUp>
                    <SwipeableDrawer classes={{ root: this.props.classes.drawerIndex, paper: this.props.classes.drawerPaper }} variant="temporary" open={this.props.menu} onOpen={this.props.onOpen} onClose={this.props.onClose} ModalProps={{ keepMounted: true }} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
                        <MobileDrawerDidAppear onAppear={this.props.onClose} />
                        <Toolbar />
                        <Kosen departments={this.props.departments} />
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown>
                    <Box className={clsx(this.props.classes.root, !this.props.menu && this.props.classes.rootHide)}>
                        <Drawer classes={{ paper: clsx(this.props.classes.drawerPaper, this.props.classes.drawerIndex) }} variant="persistent" open={this.props.menu}>
                            <Toolbar />
                            <Kosen departments={this.props.departments} />
                        </Drawer>
                    </Box>
                </Hidden>
            </nav>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    menu: state.menu,
    departments: state.courses,
});

const mapDispatchToProps = (dispatch: DispatchType) => ({
    onClose: () => dispatch(setMenu(false)),
    onOpen: () => dispatch(setMenu(true)),
    onMount: () => dispatch(fetchCourses() as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SideMenuStyles)(SideMenu));