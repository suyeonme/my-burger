import React from 'react';
import classes from './NavItems.module.css';

import NavItem from '../NavItem/NavItem';

const navItems = props => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        <NavItem link="/orders" >Orders</NavItem>
        <NavItem link="/auth" >Authentication</NavItem>
    </ul>
);

export default navItems;