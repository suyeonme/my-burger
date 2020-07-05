import React from 'react';
import classes from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
    <>
    <Toolbar />
    <main className={classes.content}>
        {props.children}
    </main>
    </>
); 

export default layout;