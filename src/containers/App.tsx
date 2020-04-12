import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Root from './Root';

interface AppState {
    menuOpen: boolean,
}
export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { menuOpen: true };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }
    handleMenuClick() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }
    handleMenuClose() {
        this.setState({ menuOpen: false });
    }
    handleMenuOpen() {
        this.setState({ menuOpen: true });
    }
    render() {
        return (
            <Router>
                <CssBaseline />
                <Route path="/:college?/:department?/:course?" component={Root} />
            </Router>
        );
    }
}
