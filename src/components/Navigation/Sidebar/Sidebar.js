import React from 'react';
import classes from './Sidebar.module.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidebar = props => {
    let attachedClasses = [classes.Sidebar, classes.Close];
    if (props.open) attachedClasses =  [classes.Sidebar, classes.Open];

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </>
    );
};

export default sidebar;