import React from 'react';
import { AppBar, Box, CircularProgress, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';

import { DispatchType } from '../index';
import { KosenData } from '../server';
import { StateType } from '../reducers';
import { fetchColleges, fetchCourses, toggleMenu } from '../actions';
import SideMenu from './SideMenu';
import Syllabus from './Syllabus';

const useKosenSelectorStyle = makeStyles((theme: Theme) => ({
    noSpaceY: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    arrowIcon: {
        marginLeft: theme.spacing(1),
    },
}));
interface KosenSelectorProps {
    college: string,
    kosens: KosenData[],
}
function KosenSelector(props: KosenSelectorProps): JSX.Element {
    const classes = useKosenSelectorStyle();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onClick = (e: any) => setAnchorEl(e.currentTarget);
    const onClose = (e: any) => setAnchorEl(null);
    const onChange = (college: string) => {
        history.push('/' + college);
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <List className={classes.noSpaceY} component="nav" aria-label="Device settings">
                <ListItem className={classes.noSpaceY} button onClick={onClick}>
                    <ListItemText className={classes.noSpaceY} primary="Syllabus" secondary={props.college} secondaryTypographyProps={{style: { color: "#FFFFFF" }}} />
                    <KeyboardArrowDownIcon className={classes.arrowIcon} />
                </ListItem>
            </List>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={onClose}>
                {props.kosens.map(kosen => (
                <MenuItem key={kosen.college} selected={kosen.college === props.college} onClick={(e) => onChange(kosen.college)}>
                    {kosen.college}
                </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}

const RootStyles = (theme: Theme) => ({
    appBar: {
        background: '#01A299',
    },
});
interface RootProps {
    onClick: () => void,
    onMount: () => void,
    onUpdate: () => void,
    kosens: KosenData[] | null,
    match: { params: { college?: string, department?: string, course?: string } },
    classes: any,
}
class Root extends React.Component<RootProps> {
    componentDidMount() {
        this.props.onMount();
    }
    componentDidUpdate(prevProps: RootProps) {
        if(prevProps.match.params.college !== this.props.match.params.college) {
            this.props.onUpdate();
        }
    }
    render() {
        let kosens: JSX.Element;
        if(this.props.kosens === null) {
            kosens = <CircularProgress />;
        } else {
            kosens = <KosenSelector college={this.props.match.params.college!} kosens={this.props.kosens} />;
        }
        let content = (
            <Box flexGrow={1}>
                <Box className="fullHeight" display="flex">
                    <Box>
                        <SideMenu />
                    </Box>
                    <Box className="fullHeight" flexGrow={1}>
                        <Route path="/:college/:department?/:course?" component={Syllabus} />
                    </Box>
                </Box>
            </Box>
        );
    
        return (
            <Box className="flexColumn" display="flex">
                <Box>
                    <AppBar className={this.props.classes.appBar}>
                        <Toolbar>
                            <IconButton className={this.props.classes.menuButton} color="inherit" edge="start" onClick={this.props.onClick}>
                                <MenuIcon />
                            </IconButton>
                            { kosens }
                        </Toolbar>
                    </AppBar>
                    <Toolbar />
                </Box>
                {this.props.match.params.college && content}
            </Box>
        );
    }
}

const mapStateToProps = (state: StateType) => ({
    kosens: state.colleges,
});

const mapDispatchToProps = (dispatch: DispatchType) => ({
    onClick: () => dispatch(toggleMenu()),
    onMount: () => dispatch(fetchColleges() as any),
    onUpdate: () => dispatch(fetchCourses() as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(RootStyles)(Root));
