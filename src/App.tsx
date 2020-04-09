import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';

import SyllabusController from './SyllabusController';
import SideMenu from './SideMenu';

export default function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Box display="flex">
                <Box>
                    <SideMenu />
                </Box>
                <Box flexGrow={1}>
                    <SyllabusController />
                </Box>
            </Box>
        </React.Fragment>
    );
}
