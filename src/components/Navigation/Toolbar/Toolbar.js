import React from 'react';
import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SideToggle from '../Sidebar/SideToggle/SideToggle';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <SideToggle clicked={props.sideToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.Desktop}>
            <NavItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;